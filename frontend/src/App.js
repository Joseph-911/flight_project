import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { AuthProvider } from "context/AuthContext";
import Header from "layout/header/Header";
import Main from "layout/main/Main";

const App = () => {
    return (
        <Router>
            <div className="App">
                <AuthProvider>
                    <Header />
                    <Main />
                </AuthProvider>
            </div>
        </Router>
    );
};

export default App;
