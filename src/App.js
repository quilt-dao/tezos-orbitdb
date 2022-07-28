import React from "react";
import { Pane } from "evergreen-ui";
import { Route, Switch } from "react-router-dom";
import Chat from "./components/Chat";
import { actions, loadingState, StateProvider } from "./state";

import Systems from "./components/Systems";
import Navbar from "./components/Navbar";

import DatabaseView from "./views/Database";
import DatabasesView from "./views/Databases";
import SearchResultsView from "./views/SearchResults";

function App() {
  const initialState = {
    db: null,
    entries: [],
    orbitdbStatus: "Starting",
    ipfsStatus: "Starting",
    loading: {
      programs: false,
    },
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case actions.SYSTEMS.SET_ORBITDB:
        return {
          ...state,
          orbitdbStatus: action.orbitdbStatus,
        };
      case actions.SYSTEMS.SET_IPFS:
        return {
          ...state,
          ipfsStatus: action.ipfsStatus,
        };

      default:
        return state;
    }
  };

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Pane background="tint1" height="100%">
        <Navbar />
        <Systems />
      </Pane>
      <Chat />
    </StateProvider>
  );
}

export default App;
