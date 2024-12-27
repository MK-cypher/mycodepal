import {getSingleSnippet} from "@/app/actions/snippets";
import React from "react";
import SnippetHeader from "../_components/SnippetHeader";
import SnippetCode from "../_components/SnippetCode";
import Comments from "../_components/Comments";

export default async function page({params}: {params: {id: string}}) {
  const {id} = await params;
  console.log(id);
  const snippet = await getSingleSnippet(id);
  return (
    <div className="container">
      {snippet ? (
        <>
          <SnippetHeader snippet={snippet} />
          <SnippetCode snippet={snippet} />
          <Comments snippet={snippet} />
        </>
      ) : (
        <>404</>
      )}
    </div>
  );
}
