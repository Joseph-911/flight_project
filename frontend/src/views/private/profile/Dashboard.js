import React, { useContext, useEffect, useState } from "react";

import AuthContext from "context/AuthContext";
import DashboardAdmin from "./admin/DashboardAdmin";

const Dashboard = () => {
    const { userRole } = useContext(AuthContext);
    const [component, setComponent] = useState(null);
    const [dashboard, setDashboard] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const roleData = await userRole();
            if (roleData.role) {
                const role = roleData.role;
                if (role === "admin") {
                    setComponent(<DashboardAdmin />);
                }
            } else {
                setDashboard(false);
            }
        };
        fetchData();
    }, [userRole]);

    return (
        <>{dashboard && <div className="dashboard-wrapper">{component}</div>}</>
    );
};

export default Dashboard;
