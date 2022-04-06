import React from "react";
import Home from "./routes/home/home"
import ManageTasks from "./routes/manage-tasks/manageTasks"
import Stats from "./routes/stats/stats"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import "./App.css";

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div className="app">
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/manage-tasks" element={<ManageTasks />} />
              <Route path="/stats" element={<Stats />} />
            </Routes>
          </Router>
        </div >
      )}
    </Authenticator>
  );
}

export default App;
