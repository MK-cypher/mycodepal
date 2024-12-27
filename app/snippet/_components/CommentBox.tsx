"use client";

import {delteComment, updateComment} from "@/app/actions/comments";
import {useUser} from "@/components/context/UserContext";
import {Button} from "@/components/ui/button";
import {useToast} from "@/hooks/use-toast";
import {CommentType} from "@/lib/type";
import {mmddyyyy} from "@/lib/utils";
import {Pen, Trash, User} from "lucide-react";
import {useRef, useState} from "react";

export default function CommentBox({item, snippet_id}: {item: CommentType; snippet_id: string}) {
  const {toast} = useToast();
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState("");
  const [edit, setEdit] = useState(false);
  const [newComment, setNewComment] = useState("");
  const textRef = useRef<HTMLTextAreaElement>(null);
  const {user} = useUser();

  const handleDelete = async () => {
    setDeleting("delete-animation");
    const {error} = JSON.parse(await delteComment(item.id, snippet_id));
    if (error) {
      toast({title: "Something went wrong", variant: "destructive"});
      setDeleting("");
    }
    setTimeout(() => {
      setDeleting("deleted");
    }, 500);
  };
  const handleUpdate = async () => {
    setLoading(true);
    if (newComment) {
      const {error} = JSON.parse(await updateComment(newComment, item.id, snippet_id));
      if (error) {
        toast({title: "Something went wrong", variant: "destructive"});
      }
      setEdit(false);
    }
    setLoading(false);
  };

  return (
    <div key={item.id} className={`rounded-lg bg-secondary/40 p-3 transition-all duration-300 ${deleting}`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-background rounded-full">
            {item.created_by.avatar ? (
              <div className="w-10 h-10 rounded-full shrink-0">
                <img
                  src={item.created_by.avatar}
                  alt="user"
                  className="w-full h-full rounded-full object-coverrounded-full"
                />
              </div>
            ) : (
              <div className="p-1">
                <User size={18} />
              </div>
            )}
          </div>
          <div>
            <div>{item.created_by.username}</div>
            <div className="mt-1 text-muted-foreground text-sm flex items-center gap-2">
              <div>{mmddyyyy(item.created_at)}</div>
              {item.edited ? <div>(Edited)</div> : <></>}
            </div>
          </div>
        </div>
        {item.created_by.id == user?.id ? (
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setEdit(true);
                if (textRef.current) {
                  textRef.current.value = item.text;
                }
              }}
              className="bg-background/20 px-2 py-2 rounded-lg flex justify-center items-center hover:bg-blue-500"
            >
              <Pen size={16} />
            </button>
            <button
              onClick={handleDelete}
              className="bg-background/20 px-2 py-2 rounded-lg flex justify-center items-center hover:bg-red-500"
            >
              <Trash size={16} />
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
      {edit ? (
        <>
          <textarea
            ref={textRef}
            onChange={(e) => {
              setNewComment(e.target.value);
            }}
            defaultValue={item.text}
            name="edit-text"
            id="edit-text"
            className="w-full"
          ></textarea>
          <div className="flex justify-end gap-2">
            <Button
              variant={"secondary"}
              onClick={() => {
                setEdit(false);
              }}
            >
              Cancel
            </Button>
            <Button className={`${loading ? "loading" : ""}`} onClick={handleUpdate}>
              <span></span>
              Save
            </Button>
          </div>
        </>
      ) : (
        <div className="mt-3 rounded-lg p-2 bg-background/30">
          <pre>{item.text}</pre>
        </div>
      )}
    </div>
  );
}
