import React, { useContext } from "react";

import AuthContext from "context/AuthContext";

const Avatar = () => {
    const { userDetails } = useContext(AuthContext);

    console.log(userDetails);
    return (
        <div className="avatar-wrapper">
            <div className="avatar-image">
                <img src={userDetails.thumbnail} alt="User Profile" />
            </div>
            <div className="avatar-info">
                <p className="bold">{userDetails.username}</p>
                <p>Last login: {userDetails.last_login}</p>
                <p>Member since: {userDetails.created}</p>
            </div>
        </div>
    );
};
// const Avatar = (props) => {
//     const userInfo = props.userInfo;
//     return (
//         <>
//             {userInfo && (
//                 <>
//                     <div className="avatar-wrapper">
//                         <div className="avatar-image">
//                             <img src={userInfo.thumbnail} alt="User Profile" />
//                         </div>
//                     </div>
//                     <div className=""></div>
//                 </>
//             )}
//         </>
//     );
// };

export default Avatar;
