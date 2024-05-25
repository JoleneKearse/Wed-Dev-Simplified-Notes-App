import CreatableReactSelect from "react-select/creatable";
import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useRef, useState } from "react";
import { v4 as uuidV4 } from "uuid";

import { NoteData, Tag } from "../App";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

export function NoteForm({ onSubmit, onAddTag, availableTags }: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    });
    // move to previous page
    navigate("..");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col flex-wrap w-5/6 gap-4"
      >
        <div className="flex flex-col w-full gap-4">
          <div className="flex items-center gap-4">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              ref={titleRef}
              className="w-full px-2 py-1 font-bold text-gray-900 rounded-sm outline outline-2 outline-violet-600 bg-zinc-100"
              required
            />
          </div>
          <div className="flex items-center gap-4">
            <label htmlFor="tags">Tags</label>
            <CreatableReactSelect
              options={availableTags.map((tag) => {
                return {
                  value: tag.id,
                  label: tag.label,
                };
              })}
              onCreateOption={(label) => {
                const newTag = { id: uuidV4(), label };
                onAddTag(newTag);
                setSelectedTags((prev) => [...prev, newTag]);
              }}
              isMulti
              className="w-full text-gray-500"
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
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  // backgroundColor: "neutral-10",
                  color: "purple",
                }),
              }}
            />
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <label htmlFor="title">Body</label>
          <textarea
            id="body"
            ref={markdownRef}
            className="w-full h-full px-2 py-1 text-gray-900 rounded-sm outline outline-2 outline-violet-600 bg-zinc-100"
            rows={15}
            required
          ></textarea>
        </div>

        <div className="flex justify-end gap-4 my-4">
          <button
            type="submit"
            className="px-2 py-1 rounded-md bg-violet-500 hover:bg-violet-800 focus:bg-violet-800"
          >
            Save
          </button>
          <Link to="..">
            <button
              type="button"
              className="px-2 py-1 rounded-md bg-violet-500 hover:bg-violet-800 focus:bg-violet-800"
            >
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </>
  );
}
