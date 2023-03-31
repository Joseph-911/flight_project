import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";

import AuthContext from "context/AuthContext";
import user_default from "../../../assets/images/users/user_default.png";
import { FieldError, FormBlock } from "components/Forms";

const RegisterView = () => {
    const { api, userLogin } = useContext(AuthContext);

    const imgInputRef = useRef();

    // Thumbnail preview
    const [imgPreview, setImagePreview] = useState(user_default);
    const [removeBtnActive, setRemoveBtnActive] = useState(false);

    // Form states
    const [error, setError] = useState(null);

    // Form fields
    const [thumbnail, setThumbnail] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    // Handle thumbnail change preview
    const handleThumbnailChange = (e) => {
        const [file] = e.target.files;
        setThumbnail(file);
        if (file) {
            setImagePreview(URL.createObjectURL(file));
            setRemoveBtnActive(true);
        } else {
            setImagePreview(user_default);
            setRemoveBtnActive(false);
        }
    };

    // Handle thumbnail remove
    const handleRemoveThumbnail = () => {
        setImagePreview(user_default);
        setRemoveBtnActive(false);
        setThumbnail("");
        imgInputRef.current.value = null; // Reset the input value
    };

    // Handle form submit
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("thumbnail", thumbnail);
        formData.append("username", username);
        formData.append("email", email);
        formData.append("password1", password1);
        formData.append("password2", password2);

        try {
            const { data } = await api.post("register/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (data) {
                await userLogin(username, password1);
            }

            setError(null);
        } catch (error) {
            setError(error.response.data);
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
                            src={imgPreview}
                            alt="Default profile thumbnail"
                            className="form-thumbnail"
                        />
                    </label>
                    {removeBtnActive && (
                        <span
                            id="remove-thumbnail"
                            onClick={handleRemoveThumbnail}
                            className="btn btn-md btn-danger-outline"
                            role="button"
                        >
                            Remove image
                        </span>
                    )}
                    <input
                        type="file"
                        name="thumbnail"
                        accept="image/*"
                        className="form-control"
                        id="thumbnail"
                        onChange={(e) => {
                            handleThumbnailChange(e);
                        }}
                        ref={imgInputRef}
                    />
                    <FieldError error={error} field="thumbnail" />
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
