import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/navbar.component";
import ClassesList from "./components/classes-list.component";
import EditClass from "./components/edit-class.component";
import CreateClass from "./components/create-class.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={ClassesList} />
        <Route path="/edit/:id" component={EditClass} />
        <Route path="/create" component={CreateClass} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
