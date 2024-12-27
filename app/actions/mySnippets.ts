"use server";

import {createSupabaseServerClient} from "@/lib/db/server";
import {getStars} from "./stars";

export const getPublicSnippets = async () => {
  const supabase = await createSupabaseServerClient();
  const userId = (await supabase.auth.getUser()).data.user?.id;
  const {data, error} = await supabase
    .from("snippets")
    .select("*, created_by!inner(id,avatar)")
    .eq("public", true)
    .eq("created_by", userId);

  if (error || !data) {
    console.log(error);
    return [];
  }
  return data;
};

export const getPrivateSnippets = async () => {
  const supabase = await createSupabaseServerClient();
  const userId = (await supabase.auth.getUser()).data.user?.id;
  const {data, error} = await supabase
    .from("snippets")
    .select("*, created_by!inner(id,avatar)")
    .eq("public", false)
    .eq("created_by", userId);

  if (error || !data) {
    console.log(error);
    return [];
  }
  return data;
};

export const getStarredSnippets = async () => {
  const supabase = await createSupabaseServerClient();
  const stars = JSON.parse(await getStars());
  const {data, error} = await supabase.from("snippets").select("*, created_by!inner(id,avatar)").in("id", stars);

  if (error || !data) {
    console.log(error);
    return [];
  }
  console.log(data);
  return data;
};
