import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";

import AuthContext from "context/AuthContext";
import user_default from "../../../assets/images/users/user_default.png";
import { FormBlock } from "components/Forms";

const RegisterView = () => {
    const { api, userLogin } = useContext(AuthContext);

    const imgInputRef = useRef();

    // Thumbnail preview
    const [thumbnailSrc, setThumbnailSrc] = useState(user_default);
    const [removeBtnActive, setRemoveBtnActive] = useState(false);

    // Form states
    // const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    // Form fields
    const [thumbnail, setThumbnail] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    // Handle thumbnail change preview
    const handleThumbnailChange = (e) => {
        let [file] = e.target.files;
        if (file) {
            setThumbnailSrc(URL.createObjectURL(file));
            setRemoveBtnActive(true);
        } else {
            setThumbnailSrc(user_default);
            setRemoveBtnActive(false);
        }
    };

    // Handle thumbnail remove
    const handleRemoveThumbnail = () => {
        setThumbnailSrc(user_default);
        setRemoveBtnActive(false);
        setTimeout(() => {
            imgInputRef.current.value = "";
            setThumbnail("");
        }, 100);
    };

    // Handle form submit
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.post(
                "register/",
                {
                    thumbnail: thumbnail,
                    username: username,
                    email: email,
                    password1: password1,
                    password2: password2,
                },
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (data) {
                await userLogin(username, password1);
            }

            setError(null);
        } catch (error) {
            setError(error.response.data.errors);
        }
    };

    return (
        <div className="form-wrapper">
            <form
                method="POST"
                encType="multipart/form-data"
                className="form"
                onSubmit={handleFormSubmit}
            >
                <h2 className="form-title">Join Us!</h2>

                <div className="form-block">
                    <label htmlFor="thumbnail">
                        <span>Profile Image</span>
                        <img
                            src={thumbnailSrc}
                            alt="Default profile thumbnail"
                            className="form-thumbnail"
                        />
                    </label>
                    {removeBtnActive && (
                        <button
                            id="remove-thumbnail"
                            onClick={handleRemoveThumbnail}
                            className="btn btn-md btn-danger-outline"
                        >
                            Remove image
                        </button>
                    )}
                    <input
                        type="file"
                        name="thumbnail"
                        accept="image/*"
                        className="form-control"
                        id="thumbnail"
                        value={thumbnail}
                        onChange={(e) => {
                            handleThumbnailChange(e);
                            setThumbnail(e.target.value);
                        }}
                        ref={imgInputRef}
                    />
                </div>
                <FormBlock
                    label="Username"
                    name="username"
                    type="text"
                    maxLength="15"
                    autoFocus
                    required
                    id="username"
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    error={error}
                />

                <FormBlock
                    label="Email"
                    name="email"
                    type="email"
                    maxLength="254"
                    required
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={error}
                />

                <FormBlock
                    label="Password"
                    name="password1"
                    type="password"
                    required
                    id="password1"
                    autoComplete="new-password"
                    value={password1}
                    onChange={(e) => setPassword1(e.target.value)}
                    error={error}
                />

                <FormBlock
                    label="Password confirmation"
                    name="password2"
                    type="password"
                    required
                    id="password2"
                    autoComplete="new-password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    error={error}
                />

                <div className="form-footer">
                    <p>
                        Do you have an account? <Link to="/login">Login</Link>
                    </p>
                </div>

                <input
                    type="submit"
                    value="Sign up"
                    className="btn btn-xl btn-primary"
                />
            </form>
        </div>
    );
};

export default RegisterView;
