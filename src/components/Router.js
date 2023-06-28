import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";

const AppRouter = ({ isLoggedIn }) => {
    return (
        <Router>
            {isLoggedIn && <Navigation />}
            <Routes>
                {isLoggedIn ? (
                    <>
                        <Route element={<Home />} exact path="/"></Route>
                        <Route element={<Profile />} exact path="/profile"></Route>
                    </> 
                ) : (
                    <>
                        <Route element={<Auth />} path="/*"></Route>
                    </>
                )}
            </Routes>
        </Router>
    )
}

export default AppRouter