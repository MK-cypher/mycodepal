"use server";

import {createSupabaseServerClient} from "@/lib/db/server";
import {getUser} from "./users";

export const getSnippets = async ({language, query}: {language: string[]; query: string}) => {
  const supabase = await createSupabaseServerClient();

  let supaQuery = supabase.from("snippets").select("*, created_by!inner(id,avatar)").eq("public", true);

  if (language.length) {
    supaQuery = supaQuery.in("language", language);
  }

  if (query) {
    supaQuery = supaQuery.or(`title.ilike.%${query}%,language.ilike.%${query}%,username.ilike.%${query}%`);
  }

  const {data, error} = await supaQuery;
  if (error || !data) {
    console.log(error);
    return JSON.stringify([]);
  }
  // console.log(data);
  return JSON.stringify(data);
};

export const getSingleSnippet = async (id: string) => {
  const supabase = await createSupabaseServerClient();

  const {data, error} = await supabase
    .from("snippets")
    .select("*, created_by!inner(id,username,avatar),comments!left(*,created_by!inner(id,username,avatar))")
    .eq("id", id);
  if (error || !data) {
    console.log(error);
    return null;
  }
  return data[0];
};

export const saveSnippet = async (title: string, code: string, language: string, publicSnippet: boolean) => {
  const supabase = await createSupabaseServerClient();
  const user = await getUser();
  if (!user.isSub && !publicSnippet) {
    publicSnippet = true;
  }
  const {error} = await supabase
    .from("snippets")
    .insert({title, code, language, username: user.username, public: publicSnippet});
  if (error) {
    console.log(error);
    return JSON.stringify({error: true});
  }

  return JSON.stringify({error: false});
};

export const updateSnippet = async (title: string, id: string, code: string) => {
  const supabase = await createSupabaseServerClient();
  const {error} = await supabase.from("snippets").update({title, code}).eq("id", id);
  if (error) {
    console.log(error);
    return JSON.stringify({error: true});
  }

  return JSON.stringify({error: false});
};

export const deleteSnippet = async (id: string) => {
  const supabase = await createSupabaseServerClient();
  const userId = (await supabase.auth.getUser()).data.user?.id;
  if (!userId) return JSON.stringify({error: true});
  const {error} = await supabase.from("snippets").delete().eq("id", id);
  if (error) {
    console.log(error);
    return JSON.stringify({error: true});
  }

  return JSON.stringify({error: false});
};
