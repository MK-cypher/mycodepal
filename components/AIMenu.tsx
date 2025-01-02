"use client";
import {AiMessageType} from "@/lib/type";
import {ArrowRight, GripVertical, RotateCcw, WandSparkles, X} from "lucide-react";
import {useEffect, useRef, useState} from "react";
import ReactMarkdown from "react-markdown";
import AIResponseFormatter from "./AIResponseFormatter";
import {useToast} from "@/hooks/use-toast";

export default function AIMenu() {
  const {toast} = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<[] | AiMessageType[]>([]);
  const [query, setQuery] = useState("");
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [width, setWidth] = useState(0);
  const [grab, setGrab] = useState(false);
  const [tarnsitionClass, setTarnsitionClass] = useState("");
  // const [accMsg, setAccMsg] = useState('')

  const submit = async () => {
    if (query.length > 2) {
      console.log(messages);
      setLoading(true);
      try {
        const history = messages.length > 20 ? [...messages].slice(0, 20).reverse() : [...messages].reverse();
        setMessages((prev) => [{role: "user", content: query}, ...prev]);
        setQuery("");
        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/ai`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({query, history}),
        });
        if (!res.ok) {
          toast({title: "Something went wrong!", variant: "destructive"});
          setQuery(query);
          setMessages((prev) => prev.slice(1));
          setLoading(false);
          return;
        }
        setMessages((prev) => [
          {
            role: "assistant",
            content: "",
          },
          ...prev,
        ]);

        const reader = res.body?.getReader();
        const decoder = new TextDecoder();

        try {
          while (reader) {
            const {value, done} = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);

            // Update the latest message with new content
            setMessages((prev) => [{...prev[0], content: prev[0].content + chunk}, ...prev.slice(1)]);
          }
        } catch (error) {
          console.error("Error reading stream:", error);
          toast({title: "Something went wrong!", variant: "destructive"});
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        toast({title: "Something went wrong!", variant: "destructive"});
        setLoading(false);
      }
    }
  };

  const handleResize = (e: PointerEvent) => {
    const x = e.clientX;
    let w = 100 - (x * 100) / window.innerWidth;
    if (w > 100) {
      w = 100;
    }
    if (w == 0) {
      setOpen(false);
    }
    setWidth(w);
  };
  const handleMouseUp = () => {
    setGrab(false);
  };
  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    if (grab) {
      window.addEventListener("pointermove", handleResize);
    }
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("pointermove", handleResize);
    };
  }, [grab]);

  useEffect(() => {
    setTarnsitionClass("transition-all duration-300");
    if (open) {
      setWidth(window.innerWidth > 600 ? 50 : 100);
    } else {
      setWidth(0);
    }
    const timeout = setTimeout(() => {
      setTarnsitionClass("");
    }, 300);
    return () => clearTimeout(timeout);
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`cursor-pointer flex items-center gap-1 text-nowrap max-sm:w-full transition-all duration-300 shadow-inner text-amber-400 hover:text-amber-300 border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-orange-500/10 hover:from-amber-500/30 hover:to-orange-500/30 border text-center py-1.5 px-2.5 rounded-lg`}
      >
        <WandSparkles size={16} />
        AI
      </button>
      <div
        className={` fixed top-0 right-0 w-full h-svh flex flex-col z-20 bg-background ${tarnsitionClass}`}
        style={{width: `${width}%`}}
      >
        <div
          onMouseDown={() => {
            setGrab(true);
          }}
          className="h-svh w-0.5 px-1 cursor-col-resize z-30 absolute -left-2 top-0"
        >
          <div className="absolute top-1/2 left-0 -translate-y-1/2">
            <GripVertical size={16} />
          </div>
        </div>
        <div className="p-3 flex items-center justify-between">
          <button onClick={() => setOpen(false)} className="p-1">
            <X />
          </button>
          <button
            onClick={() => {
              setMessages([]);
            }}
            className="border flex items-center gap-1 border-primary bg-gradient-to-r px-2 py-1 rounded-sm from-purple-500/30 to-blue-500/30 hover:from-purple-500/50 hover:to-blue-500/50"
          >
            <RotateCcw size={16} /> Refresh
          </button>
        </div>
        <div className="grow overflow-y-auto">
          <div className="mt-5 p-3 gap-3 flex flex-col-reverse">
            {messages.map((item, i) => (
              <div
                className={`${
                  item.role == "user" ? "ml-auto bg-primary/20" : "bg-secondary/30"
                } rounded-lg p-2 max-w-[80%] w-fit`}
                key={i}
              >
                <AIResponseFormatter content={item.content} />
              </div>
            ))}
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className="p-3 flex items-start gap-1"
        >
          <textarea
            ref={textRef}
            placeholder="How can I help you today?"
            className="w-full resize-none"
            readOnly={false}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key == "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit();
              }
            }}
          />
          <button
            onClick={submit}
            className={`${
              loading ? "loading" : ""
            } border border-primary bg-gradient-to-r px-2 py-1 rounded-sm from-purple-500/30 to-blue-500/30 hover:from-purple-500/50 hover:to-blue-500/50 transition-all duration-300`}
          >
            <span></span>
            <ArrowRight />
          </button>
        </form>
      </div>
    </>
  );
}
