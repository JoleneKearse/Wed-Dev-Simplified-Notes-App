import { Routes, Route, Navigate } from "react-router-dom";

import { NewNote } from "./components/NewNote";

function App() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Routes>
        <Route path="/" element={<h1 className="text-3xl">Home</h1>}></Route>
        <Route path="/new" element={<NewNote />}></Route>
        <Route path="/:id">
          <Route index element={<h1 className="text-3xl">Show</h1>} />
          <Route path="edit" element={<h1 className="text-3xl">Edit</h1>} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />}></Route>
      </Routes>
    </div>
  );
}

export default App;

