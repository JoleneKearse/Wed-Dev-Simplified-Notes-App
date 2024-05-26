import { useNote } from "./NoteLayout";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

export function Note() {
  const note = useNote();

  return (
    <>
    <section className="flex flex-col gap-4 py-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">{note.title}</h1>
        {note.tags.length > 0 && (
          <div className="flex items-center justify-center gap-2">
            {note.tags.map((tag) => (
              <span
                className="px-2 py-1 text-sm font-semibold text-gray-800 uppercase rounded-md bg-violet-300"
                key={tag.id}
              >
                {tag.label}
              </span>
            ))}
          </div>
        )}
      </div>
      
      <div className="flex justify-end gap-4 my-4">
        <Link to={`/${note.id}/edit`}>
          <button
            type="button"
            className="px-2 py-1 rounded-md bg-violet-500 hover:bg-violet-800 focus:bg-violet-800"
          >
            Edit
          </button>
        </Link>
        <button
          type="button"
          className="px-2 py-1 text-purple-700 bg-gray-300 rounded-md hover:bg-violet-800 focus:bg-violet-800 hover:text-zinc-200 focus:text-zinc-200"
        >
          Delete
        </button>
        <Link to="/">
          <button
            type="button"
            className="px-2 py-1 text-gray-800 bg-gray-300 rounded-md hover:bg-violet-800 focus:bg-violet-800 hover:text-zinc-200 focus:text-zinc-200"
          >
            Back
          </button>
        </Link>
      </div>
    </section>
    <ReactMarkdown
      className="w-5/6 py-4 max-w-prose"
    >
      {note.markdown}
    </ReactMarkdown>
    </>
  );
}
