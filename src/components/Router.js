import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

const AppRouter = ({ isLoggedIn }) => {
    return (
        <Router>
            <Routes>
                {isLoggedIn ? (
                    <>
                        <Route element={<Home />} exact path="/"></Route>
                    </> 
                ) : (
                    <Route element={<Auth />} exact path="/"></Route>
                )}
            </Routes>
        </Router>
    )
}

export default AppRouter