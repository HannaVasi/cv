import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import CVEditor from "./components/cv-editor/CVEditor";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<CVEditor />} />
        </Routes>
      </>
    </Suspense>
  );
}

export default App;
