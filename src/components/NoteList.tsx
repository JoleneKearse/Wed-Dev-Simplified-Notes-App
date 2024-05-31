import { useMemo, useState, useRef, FormEvent } from "react";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { v4 as uuidV4 } from "uuid";

import { Tag } from "../App";

type SimplifiedNote = {
  id: string;
  title: string;
  tags: Tag[];
};

type NoteListProps = {
  availableTags: Tag[];
  notes: SimplifiedNote[];
  addTag: (tag: Tag) => void;
  updateTag: (id: string, label: string) => void;
  deleteTag: (id: string) => void;
};

type EditTagsModalProps = {
  isEditTagsModalOpen: boolean;
  availableTags: Tag[];
  handleClose: () => void;
  addTag: (tag: Tag) => void;
  updateTag: (id: string, label: string) => void;
  deleteTag: (id: string) => void;
};

export function NoteList({
  availableTags,
  notes,
  addTag,
  updateTag,
  deleteTag,
}: NoteListProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState<string>("");
  const [isEditTagsModalOpen, setIsEditTagsModalOpen] = useState(false);

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
      <section className="flex flex-col flex-wrap w-5/6 gap-4 my-4 max-w-prose">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold text-transparent bg-gradient-to-br from-violet-600 via-violet-400 to-violet-300 bg-clip-text">
            Notes
          </h1>

          <div className="flex items-center gap-2">
            <Link to="/new">
              <button className="px-2 py-1 rounded-md bg-violet-500 hover:bg-violet-800 focus:bg-violet-800">
                Create
              </button>
            </Link>
            <button
              className="px-2 py-1 bg-gray-500 rounded-md hover:bg-gray-700 focus:bg-gray-700"
              onClick={() => setIsEditTagsModalOpen(true)}
            >
              Edit Tags
            </button>
          </div>
        </div>
      </section>

      

      {notes.length === 0 ? (
        <img 
          src="/note.svg" 
          alt="Note asking you to add notes" 
          className="w-5/6 pt-14z1 md:w-1/2 md:pt-2 lg:w-2/5"
        />
      ) : (
        <form className="flex flex-col flex-wrap w-5/6 gap-4 my-4 max-w-prose md:flex-row md:w-3/4 md:justify-between lg:w-3/5">
        <div className="flex flex-col items-center justify-center gap-2">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-2 py-2 font-bold text-gray-900 rounded-sm outline outline-2 outline-violet-600 bg-zinc-100 md:w-64"
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
            className="w-full text-gray-500 md:w-64"
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
      )}

      <div className="flex flex-wrap w-5/6 gap-3 py-8 max-w-prose md:gap-8">
        {filteredNotes.map((note) => (
          <NoteCard
            id={note.id}
            key={note.id}
            title={note.title}
            tags={note.tags}
          />
        ))}
      </div>

      {/* Edit Tags modals */}
      <EditTagsModal
        isEditTagsModalOpen={isEditTagsModalOpen}
        availableTags={availableTags}
        handleClose={() => setIsEditTagsModalOpen(false)}
        addTag={addTag}
        updateTag={updateTag}
        deleteTag={deleteTag}
      />
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
          {tags.map((tag) => (
            <span className="px-2 py-1 rounded-md bg-violet-500" key={tag.id}>
              {tag.label}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}

function EditTagsModal({
  isEditTagsModalOpen,
  availableTags,
  handleClose,
  addTag,
  updateTag,
  deleteTag,
}: EditTagsModalProps) {
  const newTagRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newTagRef.current) {
      const newTag = { id: uuidV4(), label: newTagRef.current.value };
      addTag(newTag);
      newTagRef.current.value = "";
    }
  };

  if (!isEditTagsModalOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black opacity-80"
        onClick={handleClose}
      ></div>
      <div className="z-10 p-4 rounded-lg shadow-lg bg-violet-900">
        <div className="flex items-start justify-between">
          <h2 className="pb-4 text-2xl font-semibold text-gray-200">
            Edit Tags
          </h2>
          <button
            onClick={handleClose}
            className="text-xl text-gray-200 hover:text-gray-100 hover:scale-110"
          >
            ✘
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {availableTags.length > 0 ? (
              availableTags.map((tag) => (
                <div key={tag.id} className="flex items-center">
                  <input
                    type="text"
                    value={tag.label}
                    className="flex-1 p-2 text-xl font-semibold text-gray-900 border rounded bg-violet-300"
                    onChange={(e) => updateTag(tag.id, e.target.value)}
                  />
                  <button
                    type="button"
                    className="ml-2 text-violet-400 hover:text-red-800"
                    onClick={() => deleteTag(tag.id)}
                  >
                    ✘
                  </button>
                </div>
              ))
            ) : (
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Add a new tag"
                  className="flex-1 p-2 text-xl font-semibold text-gray-900 border rounded bg-violet-300"
                  ref={newTagRef}
                />
                <button
                  type="submit"
                  className="ml-2 text-violet-400 hover:text-red-800"
                >
                  ➕
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
