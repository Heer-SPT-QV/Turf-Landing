import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "../pages/Home";
import ProtectedRoutes from "./protected.routes";
import Login from "../pages/Login";
import AddManager from "../pages/AddManager";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />

        <ProtectedRoutes path="/addManager">
          <AddManager />
        </ProtectedRoutes>
      </Switch>
      <ToastContainer pauseOnHover={false} autoClose={3000} />
    </Router>
  );
};

export default Routes;
