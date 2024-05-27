import { useNote } from "./NoteLayout";
import { Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

type NoteProps = {
  onDelete: (id: string) => void;
};

export function Note({ onDelete }: NoteProps) {
  const note = useNote();
  const navigate = useNavigate();

  return (
    <>
      <section className="flex flex-col justify-between w-full gap-4 py-4 max-w-prose md:flex-row">
        <div className="flex flex-col items-center gap-2">
          <h1 className="max-w-xs text-3xl font-bold text-center text-transparent truncate bg-gradient-to-br from-violet-600 via-violet-400 to-violet-300 bg-clip-text min-h-10">{note.title}</h1>
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

        <div className="flex flex-wrap items-center justify-center justify-end gap-4 my-4">
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
            onClick={() => {
              onDelete(note.id)
              navigate("/")
            }}
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
      <ReactMarkdown className="w-5/6 py-4 max-w-prose">
        {note.markdown}
      </ReactMarkdown>
    </>
  );
}
