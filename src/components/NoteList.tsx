import { useState } from "react";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";

import { Tag } from "../App";

type NoteListProps = {
  availableTags: Tag[];
};

export function NoteList({ availableTags }: NoteListProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState<string>("");

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

      <main>
        {/* {filteredNotes.map(note => {
          
        })} */}
      </main>
    </>
  );
}
