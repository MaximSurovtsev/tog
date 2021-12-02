import React from "react";
import { Lab3 } from "./Lab3";
import { Lab2 } from "./Lab2";
import { Lab1 } from "./Lab1";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink,
    Redirect
} from "react-router-dom";

export const App = () => {
    return (
        <div>
            <Router>
                <div>
                    <div className="header">
                        <nav className="nav">
                            <NavLink
                                className="link"
                                activeClassName="active"
                                to="/lab1"
                            >
                                Lab 1
                            </NavLink>
                            <NavLink
                                className="link"
                                activeClassName="active"
                                to="/lab2"
                            >
                                Lab 2
                            </NavLink>
                            <NavLink
                                className="link"
                                activeClassName="active"
                                to="/lab3"
                            >
                                Lab 3
                            </NavLink>
                        </nav>
                    </div>
                    <Switch>
                        <Route path="/lab1">
                            <Lab1 />
                        </Route>
                        <Route path="/lab2">
                            <Lab2 />
                        </Route>
                        <Route path="/lab3">
                            <Lab3 />
                        </Route>

                        <Redirect
                            to={{
                                pathname: "/lab1"
                            }}
                        />
                    </Switch>
                </div>
            </Router>
        </div>
    );
};
