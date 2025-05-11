// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'; // This is crucial

import Layout from "./layouts/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} />
      </Routes>
    </Router>

  );
}

export default App;
