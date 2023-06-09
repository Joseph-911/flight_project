import React from "react";
import { Routes, Route } from "react-router-dom";

import PrivateViewsLayout from "views/private/PrivateViewsLayout";
import PublicViewsLayout from "views/public/PublicViewsLayout";

const Main = () => {
    return (
        <main role="main">
            <div className="main-content">
                <div className="container">
                    <Routes>
                        <Route
                            path="/*"
                            element={<PublicViewsLayout />}
                        ></Route>
                        <Route
                            path="/profile/*"
                            exact
                            element={<PrivateViewsLayout />}
                        ></Route>
                    </Routes>
                </div>
            </div>
        </main>
    );
};

export default Main;
