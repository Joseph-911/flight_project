import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { AuthProvider } from "context/AuthContext";
import Header from "layout/header/Header";

const App = () => {
    return (
        <Router>
            <div className="App">
                <AuthProvider>
                    <Header />
                </AuthProvider>
            </div>
        </Router>
    );
};

export default App;
