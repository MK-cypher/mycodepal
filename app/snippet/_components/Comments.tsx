import {CommentType, SingleSnippetType} from "@/lib/type";
import CommentBox from "./CommentBox";
import AddComment from "./AddComment";

export default function Comments({snippet}: {snippet: SingleSnippetType}) {
  return (
    <div className="my-10 overflow-hidden">
      <div className="text-xl mb-5">Comments</div>
      <AddComment snippet={snippet} />
      <div className="space-y-3">
        {snippet.comments.length ? (
          snippet.comments.map((item) => <CommentBox item={item} snippet_id={snippet.id} key={item.id} />)
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
