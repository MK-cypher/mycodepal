"use server";

import {createSupabaseServerClient} from "@/lib/db/server";
import {revalidatePath} from "next/cache";

export const insertComment = async (text: string, snippet_id: string) => {
  const supabase = await createSupabaseServerClient();

  const {error} = await supabase.from("comments").insert({text, snippet_id});
  if (error) {
    console.log(error);
    return JSON.stringify({error: true});
  }
  revalidatePath(`/snippet/${snippet_id}`);
  return JSON.stringify({error: false});
};

export const updateComment = async (text: string, id: string, snippet_id: string) => {
  const supabase = await createSupabaseServerClient();
  const edited = new Date(Date.now()).toISOString();
  const {error} = await supabase.from("comments").update({text, edited}).eq("id", id);
  if (error) {
    console.log(error);
    return JSON.stringify({error: true});
  }
  //
  revalidatePath(`/snippet/${snippet_id}`);
  return JSON.stringify({error: false});
};
export const delteComment = async (id: string, snippet_id: string) => {
  const supabase = await createSupabaseServerClient();

  const {error} = await supabase.from("comments").delete().eq("id", id);
  if (error) {
    console.log(error);
    return JSON.stringify({error: true});
  }
  revalidatePath(`/snippet/${snippet_id}`);
  return JSON.stringify({error: false});
};
