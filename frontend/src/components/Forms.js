import React, { useRef, useState } from "react";
import user_default from "../assets/images/users/user_default.png";

export const FormBlock = (props) => {
    return (
        <div className="form-block">
            <label htmlFor={props.id}>{props.label}</label>
            <input
                type={props.type}
                name={props.name}
                maxLength={props.maxLength}
                autoFocus={props.autoFocus}
                className="form-control"
                required={props.required}
                id={props.id}
                autoComplete={props.autoComplete}
                value={props.value}
                onChange={props.onChange}
            />
            {props.children}
            <FieldError error={props.error} field={props.name} />
        </div>
    );
};

export const FieldError = (props) => {
    return (
        <div className="field-errors">
            {props.error &&
                props.error[props.field] &&
                props.error[props.field].map((err, idx) => {
                    return <p key={`${props.field}-error-${idx}`}>{err}</p>;
                })}
        </div>
    );
};

export const SearchForm = (props) => {
    return (
        <div className="form-wrapper">
            <form
                id="searchForm"
                method="GET"
                className="form"
                onSubmit={props.handleSearch}
            >
                <div className="form-block">
                    <input
                        type="search"
                        placeholder="Type here"
                        name="search_query"
                        value={props.searchQuery}
                        onChange={(e) => {
                            props.setSearchQuery(e.target.value);
                        }}
                    />
                </div>
                <input
                    className="btn btn-xl btn-primary"
                    type="submit"
                    value="Search"
                />
            </form>
        </div>
    );
};

export const RegisterForm = (props) => {
    // Ref to file input (thumbnail)
    const imgInputRef = useRef();

    // Thumbnail preview
    const [imgPreview, setImagePreview] = useState(user_default);
    const [removeBtnActive, setRemoveBtnActive] = useState(false);

    // Handle thumbnail change preview
    const handleThumbnailChange = (e) => {
        const [file] = e.target.files;
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
        props.formInputs.thumbnail = "";
        imgInputRef.current.value = null;
    };

    return (
        <>
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
                        props.handleImageInputChange(e, props.setFormInputs);
                    }}
                    ref={imgInputRef}
                />
                <FieldError error={props.error} field="thumbnail" />
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
                value={props.formInputs.username || ""}
                onChange={(e) =>
                    props.handleInputChange(e, props.setFormInputs)
                }
                error={props.error}
            />

            <FormBlock
                label="Email"
                name="email"
                type="email"
                maxLength="254"
                required
                id="email"
                value={props.formInputs.email || ""}
                onChange={(e) =>
                    props.handleInputChange(e, props.setFormInputs)
                }
                error={props.error}
            />

            <FormBlock
                label="Password"
                name="password1"
                type="password"
                required
                id="password1"
                autoComplete="new-password"
                value={props.formInputs.password1 || ""}
                onChange={(e) =>
                    props.handleInputChange(e, props.setFormInputs)
                }
                error={props.error}
            />

            <FormBlock
                label="Password confirmation"
                name="password2"
                type="password"
                required
                id="password2"
                autoComplete="new-password"
                value={props.formInputs.password2 || ""}
                onChange={(e) =>
                    props.handleInputChange(e, props.setFormInputs)
                }
                error={props.error}
            />
        </>
    );
};
