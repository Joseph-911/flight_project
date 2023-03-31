import PageTitle from "components/PageTitle";
import React from "react";
import { Link } from "react-router-dom";

const Page404View = () => {
    return (
        <>
            <PageTitle title="404 Page Not Found" />
            <p>
                Looks like you're lost! <Link to="/">Go home</Link>
            </p>
        </>
    );
};

export default Page404View;
