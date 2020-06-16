import React from "react";
import Login from "./pages/login";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./global.css";
import Register from "./pages/register";
import Landing from "./pages/landing";
import DashBoard from "./pages/dashboard";
import Error from "./pages/error";

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Landing} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/dashboard" component={DashBoard} exact />
        <Route path="/error/:err" component={Error} exact />
      </Switch>
    </BrowserRouter>
  );
};
