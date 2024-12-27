"use server";

import {createSupabaseServerClient} from "@/lib/db/server";
import {getSubscription} from "@/lib/payment/stripe";
import {supabaseAdmin} from "@/lib/db/admin";
import configureCloudinary from "@/lib/uploader";
import {revalidatePath} from "next/cache";

export const getUser = async () => {
  const supabase = await createSupabaseServerClient();
  const userId = (await supabase.auth.getUser()).data.user?.id;

  if (!userId) return null;
  let {data, error} = await supabase.from("users").select("*, subscription(*)").eq("id", userId).single();
  if (error) {
    console.log(error);
    return null;
  }
  const {isSub, isActive, currentPlan} = await getSubscription(data);
  data = {...data, isSub, isActive, currentPlan};
  return data;
};

export const profileSave = async (userData: any, avatarData: string | ArrayBuffer | null) => {
  try {
    const cloudinary = await configureCloudinary();
    const dbuserData = await getUser();
    let avatarUrl: string = dbuserData.avatar;
    if (typeof avatarData == "string") {
      const imageId = avatarUrl.split("/").slice(-3).join("/").split(".")[0];
      console.log(imageId);
      if (imageId) {
        const deleteResult = await cloudinary.uploader.destroy(imageId);
        console.log(deleteResult);
      }
      const result = await cloudinary.uploader.upload(avatarData, {
        upload_preset: process.env.CLOUD_PRESET,
        folder: `${userData.id}/avatar`,
      });
      avatarUrl = result.secure_url;
    }
    const username = userData.username;
    const supabase = await supabaseAdmin();
    const {error} = await supabase.from("users").update({username, avatar: avatarUrl}).eq("id", userData.id);
    if (error) {
      console.log(error);
      return JSON.stringify({error: "Something went wrong!"});
    } else {
      revalidatePath(`${process.env.SITE_URL}/dashboard`);
      return JSON.stringify({
        succsess: "Profile changes have been saved succsessfully!",
      });
    }
  } catch (err) {
    console.log(err);
    return JSON.stringify({error: "Something went wrong!"});
  }
};
