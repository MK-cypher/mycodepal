"use server";

import {createSupabaseServerClient} from "@/lib/db/server";
import {revalidatePath} from "next/cache";

export const getStars = async () => {
  const supabase = await createSupabaseServerClient();
  const {error, data} = await supabase.from("stars").select("snippet_id");
  if (error || !data) {
    console.log(error);
  }
  const stars = data?.map((item) => item.snippet_id);
  return JSON.stringify(stars);
};

export const addStar = async (id: string) => {
  const supabase = await createSupabaseServerClient();
  const userId = (await supabase.auth.getUser()).data.user?.id;
  if (!userId) return JSON.stringify({error: true});
  const {data} = await supabase.from("stars").select("*").eq("snippet_id", id).eq("created_by", userId);
  if (data?.length) return JSON.stringify({error: true});
  await supabase.from("stars").insert({snippet_id: id});
  const {error} = await supabase.rpc("increment_stars", {
    snippet_id: id,
  });
  if (error) {
    console.log(error);
    return JSON.stringify({error: true});
  }

  revalidatePath("/my-snippets");
  return JSON.stringify({error: false});
};
export const removeStar = async (id: string) => {
  const supabase = await createSupabaseServerClient();
  const userId = (await supabase.auth.getUser()).data.user?.id;
  if (!userId) return JSON.stringify({error: true});
  const {data} = await supabase.from("stars").select("*").eq("snippet_id", id).eq("created_by", userId);
  if (!data?.length) return JSON.stringify({error: true});

  await supabase.from("stars").delete().eq("snippet_id", id).eq("created_by", userId);
  const {error} = await supabase.rpc("decrement_stars", {
    snippet_id: id,
  });
  if (error) {
    console.log(error);
    return JSON.stringify({error: true});
  }
  revalidatePath("/my-snippets");
  return JSON.stringify({error: false});
};
