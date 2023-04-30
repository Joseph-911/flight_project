import React from "react";
import { HashRouter as Router } from "react-router-dom";

import { AuthProvider } from "context/AuthContext";
import { MessagesProvider } from "context/MessagesContext";
import Header from "layout/header/Header";
import Main from "layout/main/Main";

const App = () => {
    return (
        <Router>
            <div className="App">
                <MessagesProvider>
                    <AuthProvider>
                        <Header />
                        <Main />
                    </AuthProvider>
                </MessagesProvider>
            </div>
        </Router>
    );
};

export default App;
