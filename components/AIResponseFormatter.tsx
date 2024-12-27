import React from "react";
import ReactMarkdown from "react-markdown";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {vscDarkPlus} from "react-syntax-highlighter/dist/esm/styles/prism";
import {Copy, CopyCheck} from "lucide-react";

const AIResponseFormatter = ({content}: {content: string}) => {
  const [copiedCode, setCopiedCode] = React.useState("");

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(""), 2000);
  };

  return (
    <div className="max-w-full">
      <ReactMarkdown
        className="prose prose-invert max-w-none"
        components={{
          // Handle code blocks
          code({node, inline, className, children, ...props}) {
            const match = /language-(\w+)/.exec(className || "");
            const code = String(children).replace(/\n$/, "");

            if (!inline && match) {
              return (
                <div className="relative group">
                  <div className="flex items-center justify-between rounded-t-lg bg-gray-800 px-4 py-2">
                    <span className="text-sm text-gray-400">{match[1]}</span>
                    <button
                      onClick={() => copyToClipboard(code)}
                      className="flex items-center gap-1 text-sm text-gray-400 hover:text-white"
                    >
                      {copiedCode === code ? <CopyCheck className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copiedCode === code ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  <SyntaxHighlighter
                    {...props}
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    className="rounded-t-none rounded-b-lg"
                  >
                    {code}
                  </SyntaxHighlighter>
                </div>
              );
            }

            // Inline code
            return (
              <code className="bg-gray-800 px-1.5 py-0.5 rounded text-gray-200" {...props}>
                {children}
              </code>
            );
          },
          // Style blockquotes
          blockquote({children}) {
            return <blockquote className="border-l-4 border-gray-600 pl-4 italic text-gray-400">{children}</blockquote>;
          },
          // Style lists
          ul({children}) {
            return <ul className="list-disc list-inside space-y-1">{children}</ul>;
          },
          ol({children}) {
            return <ol className="list-decimal list-inside space-y-1">{children}</ol>;
          },
          // Style headings
          h1: ({children}) => <h1 className="text-2xl font-bold mt-6 mb-4">{children}</h1>,
          h2: ({children}) => <h2 className="text-xl font-bold mt-5 mb-3">{children}</h2>,
          h3: ({children}) => <h3 className="text-lg font-bold mt-4 mb-2">{children}</h3>,
          // Style paragraphs
          p: ({children}) => <p className="mb-4 leading-relaxed">{children}</p>,
          // Style links
          a: ({children, href}) => (
            <a href={href} className="text-blue-400 hover:text-blue-300 underline">
              {children}
            </a>
          ),
          // Style tables
          table: ({children}) => (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700 my-4">{children}</table>
            </div>
          ),
          th: ({children}) => <th className="px-4 py-2 bg-gray-800 text-left">{children}</th>,
          td: ({children}) => <td className="px-4 py-2 border-t border-gray-700">{children}</td>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default AIResponseFormatter;
