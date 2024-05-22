import CreatableReactSelect from "react-select/creatable";
import { Link } from "react-router-dom";

export function NoteForm() {
  return (
    <>
      <form className="flex flex-col flex-wrap w-5/6 gap-4">
        <div className="flex flex-col w-full gap-4">
          <div className="flex items-center gap-4">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              className="w-full px-2 py-1 font-bold text-gray-900 rounded-sm outline outline-2 outline-violet-600 bg-zinc-100"
              required
            />
          </div>
          <div className="flex items-center gap-4">
            <label htmlFor="tags">Tags</label>
            <CreatableReactSelect
              isMulti
              className="w-full"
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
            className="w-full h-full px-2 py-1 text-gray-900 rounded-sm outline outline-2 outline-violet-600 bg-zinc-100"
            rows={15}
            required
          ></textarea>
        </div>
        <div className="flex justify-between my-4">
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
