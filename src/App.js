import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NewPost from "./components/NewPost"; 
import "./App.css";

function App() {
  return (
<Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/newpost" component={NewPost} />
      </Switch>
  </Router>
  );
}

export default App;
