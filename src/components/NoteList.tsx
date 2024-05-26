import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";

import { Tag } from "../App";

type SimplifiedNote = {
  id: string;
  title: string;
  tags: Tag[];
};

type NoteListProps = {
  availableTags: Tag[];
  notes: SimplifiedNote[];
};

export function NoteList({ availableTags, notes }: NoteListProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState<string>("");

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [title, selectedTags, notes]);

  return (
    <>
      <section className="flex flex-col flex-wrap w-5/6 gap-4 my-4">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold">Notes</h1>
          <div className="flex items-center gap-2">
            <Link to="/new">
              <button className="px-2 py-1 rounded-md bg-violet-500 hover:bg-violet-800 focus:bg-violet-800">
                Create
              </button>
            </Link>
            <button className="px-2 py-1 bg-gray-500 rounded-md hover:bg-gray-700 focus:bg-gray-700">
              Edit Tags
            </button>
          </div>
        </div>
      </section>

      <form className="flex flex-col flex-wrap w-5/6 gap-4 my-4 md:flex-row md:w-3/4 md:justify-between lg:w-3/5">
        <div className="flex flex-col items-center justify-center gap-2">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-2 py-2 font-bold text-gray-900 rounded-sm outline outline-2 outline-violet-600 bg-zinc-100 md:w-80"
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <label htmlFor="tags">Tags</label>
          <ReactSelect
            options={availableTags.map((tag) => {
              return {
                value: tag.id,
                label: tag.label,
              };
            })}
            isMulti
            className="w-full text-gray-500 md:w-80"
            value={selectedTags.map((tag) => {
              return {
                value: tag.id,
                label: tag.label,
              };
            })}
            onChange={(tags) => {
              setSelectedTags(
                tags.map((tag) => {
                  return {
                    id: tag.value,
                    label: tag.label,
                  };
                })
              );
            }}
          />
        </div>
      </form>

      <main className="flex flex-wrap w-5/6 gap-3 py-8 md:gap-8">
        {filteredNotes.map((note) => (
          <NoteCard id={note.id} title={note.title} tags={note.tags} />
        ))}
      </main>
    </>
  );
}

function NoteCard({ id, title, tags }: SimplifiedNote) {
  return (
    <Link 
      to={`/${id}`}
      className="flex flex-col items-center justify-center gap-2 p-4 rounded-md outline outline-dotted hover:scale-105 hover:outline-violet-300 hover:outline-4 focus:scale-105 focus:outline-violet-300 focus:outline-4"
    >
      <h2 className="text-2xl truncate">{title}</h2>
      {tags.length > 0 && (
        <div className="flex items-center justify-center gap-2">
          {tags.map(tag => (
            <span className="px-2 py-1 rounded-md bg-violet-500" key={tag.id}>{tag.label}</span>
          ))}
        </div>
      )}
    </Link>
  );
}
