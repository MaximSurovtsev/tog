import React from "react";
import { Lab3 } from "./Lab3";
import { Lab2 } from "./Lab2";
import { Lab1 } from "./Lab1";
import { Lab4 } from "./Lab4";
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
                                // to="/tog/lab1"
                                to="/lab1"
                            >
                                Lab 1
                            </NavLink>
                            <NavLink
                                className="link"
                                activeClassName="active"
                                to="/lab2"
                                // to="/tog/lab2"
                            >
                                Lab 2
                            </NavLink>
                            <NavLink
                                className="link"
                                activeClassName="active"
                                // to="/tog/lab3"
                                to="/lab3"
                            >
                                Lab 3
                            </NavLink>
                            <NavLink
                                className="link"
                                activeClassName="active"
                                // to="/tog/lab4"
                                to="/lab4"
                            >
                                Lab 4
                            </NavLink>
                        </nav>
                    </div>
                    <Switch>
                        {/* <Route path="/tog/lab1"> */}
                        <Route path="/lab1">
                            <Lab1 />
                        </Route>
                        {/* <Route path="/tog/lab2"> */}
                        <Route path="/lab2">
                            <Lab2 />
                        </Route>
                        {/* <Route path="/tog/lab3"> */}
                        <Route path="/lab3">
                            <Lab3 />
                        </Route>
                        {/* <Route path="/tog/lab4"> */}
                        <Route path="/lab4">
                            <Lab4 />
                        </Route>

                        <Redirect
                            to={{
                                pathname: "/tog/lab1"
                            }}
                        />
                    </Switch>
                </div>
            </Router>
        </div>
    );
};
