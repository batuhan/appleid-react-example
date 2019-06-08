import React from 'react';
import logo from './logo.svg';
import './App.css';

import { useAppleID } from "./lib";

const App: React.FC = () => {
  const { signIn } = useAppleID({
    clientId: "xxx",
    redirectURI: "xxx",
    scope: "xxx",
    state: "xxx",
  });
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Try clicking the button below
        </p>
        <button
          className="App-link"
          onClick={() => signIn()}
        >
          Sign in with Apple
        </button>
      </header>
    </div>
  );
}

export default App;
