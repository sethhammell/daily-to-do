import React from "react";
import Home from "./routes/home/home"
import CreateTasks from "./routes/create-tasks/createTasks"
import Stats from "./routes/stats/stats"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-tasks" element={<CreateTasks />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
