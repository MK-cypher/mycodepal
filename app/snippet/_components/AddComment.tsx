"use client";
import {insertComment} from "@/app/actions/comments";
import {Button} from "@/components/ui/button";
import {useToast} from "@/hooks/use-toast";
import {SingleSnippetType} from "@/lib/type";
import {useState} from "react";

export default function AddComment({snippet}: {snippet: SingleSnippetType}) {
  const {toast} = useToast();
  const [loading, setLoading] = useState(false);
  const [newComment, setNewComment] = useState("");
  const handleAdd = async () => {
    setLoading(true);
    if (newComment) {
      const {error} = JSON.parse(await insertComment(newComment, snippet.id));
      if (error) {
        toast({title: "Something went wrong", variant: "destructive"});
      }
    }
    setLoading(false);
  };
  return (
    <div className="rounded-lg bg-secondary/40 p-3 mb-5">
      <textarea
        onChange={(e) => {
          setNewComment(e.target.value);
        }}
        name="edit-text"
        id="edit-text"
        className="w-full h-20"
        placeholder="Your Comment..."
      ></textarea>
      <div className="flex justify-end mt-2 gap-2">
        <Button onClick={handleAdd} className={`${loading ? "loading" : ""}`}>
          <span></span>
          Add Comment
        </Button>
      </div>
    </div>
  );
}
