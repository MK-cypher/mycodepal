"use server";

import {createSupabaseServerClient} from "@/lib/db/server";

export const getDbCode = async (language: string) => {
  const supabase = await createSupabaseServerClient();
  const {data, error} = await supabase.from("saved_code").select(language);

  if (error || !data.length) {
    console.log("db code select", error);
    return JSON.stringify(null);
  }
  return JSON.stringify(data[0]);
};

export const updateDbCode = async (language: string, code: string) => {
  const supabase = await createSupabaseServerClient();
  const id = (await supabase.auth.getUser()).data.user?.id;
  const {data, error} = await supabase
    .from("saved_code")
    .update({[language]: code})
    .eq("created_by", id);
  if (error) console.log("db code update", error);
  return null;
};
