import { Authenticator } from '@aws-amplify/ui-react';
import { Card } from "@mui/material";
import { useState } from "react";
import MainRouter from './router';
import '@aws-amplify/ui-react/styles.css';
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div>
      {(() => {
        if (!loggedIn) {
          return (
            <div className="header-wrapper">
              <Card className="welcome-header">
                Welcome to Daily Todos
              </Card>
            </div>
          );
        }
      })()}
      <Authenticator>
        {({ signOut, user }) => (
          <div className="app">
            <MainRouter setLoggedIn={setLoggedIn} />
          </div >
        )}
      </Authenticator>
    </div>
  );
}

export default App;
