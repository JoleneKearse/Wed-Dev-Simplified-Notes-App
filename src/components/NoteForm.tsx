export function NoteForm() {
  return (
    <>
      <form className="flex flex-col gap-4 w-4/5">
        <div className="flex gap-4">
          <label htmlFor="title">Title</label>
          <input 
            type="text" 
            id="title" 
            className="w-full outline outline-2 outline-violet-600 rounded-sm"
            required 
          />
        </div>
      </form>
    </>
  );
}
