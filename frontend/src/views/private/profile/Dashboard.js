import React, { useContext, useEffect, useState } from "react";

import AuthContext from "context/AuthContext";
import DashboardAdmin from "./admin/DashboardAdmin";

const Dashboard = () => {
    const { userRole } = useContext(AuthContext);
    const [component, setComponent] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const roleData = await userRole();
            if (roleData.role === "admin") {
                setComponent(<DashboardAdmin />);
            }
        };
        fetchData();
    }, [userRole]);

    return <div className="dashboard-wrapper">{component}</div>;
};

export default Dashboard;
