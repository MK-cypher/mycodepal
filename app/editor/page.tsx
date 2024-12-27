import EditorHeader from "./_components/EditorHeader";
import ResizeEditor from "./_components/ResizeEditor";

export default function page() {
  return (
    <div className="p-2">
      <EditorHeader />
      <div className="mt-2">
        <ResizeEditor />
      </div>
    </div>
  );
}
