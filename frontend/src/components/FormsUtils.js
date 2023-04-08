import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { getUserNoRole } from "api/administratorsActions";
import { getAllCountries } from "api/common/countriesAPI";
import AuthContext from "context/AuthContext";

/* --------------------------------------------- */
/* ----------------- Form Block ---------------- */
/* --------------------------------------------- */
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

/* --------------------------------------------- */
/* ---------------- Field Error ---------------- */
/* --------------------------------------------- */
export const FieldError = (props) => {
    return (
        <div className="field-errors">
            {props.error &&
                props.error[props.field] &&
                props.error[props.field].map((err, idx) => {
                    return (
                        <p
                            key={`${props.field}-error-${idx}`}
                            dangerouslySetInnerHTML={{ __html: err }}
                        ></p>
                    );
                })}
        </div>
    );
};

/* --------------------------------------------- */
/* ---------- Form Block Select Users ---------- */
/* --------------------------------------------- */
export const FormBlockSelectUsers = (props) => {
    const location = useLocation();
    const { target } = location.state;
    const { api } = useContext(AuthContext);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            getUserNoRole(api, setUsers);
        };
        fetchData();
    }, [api, target]);

    return (
        <div className="form-block">
            <label htmlFor="user_id">User</label>
            <select
                name="user_id"
                id="user_id"
                required
                value={props.value}
                onChange={props.onChange}
            >
                <option value="" disabled defaultValue>
                    Select user
                </option>
                {users.map((user, idx) => {
                    return (
                        <option value={user.id} key={`user-no-role-${idx}`}>
                            {user.username}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};

/* --------------------------------------------- */
/* --------- Form Block Select Country --------- */
/* --------------------------------------------- */
export const FormBlockSelectCountry = (props) => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const allCountries = await getAllCountries();
            setCountries(allCountries);
        };
        fetchData();
    }, []);

    return (
        <div className="form-block">
            <label htmlFor={props.id}>{props.label}</label>
            <select
                name={props.name}
                id={props.id}
                required
                value={props.value}
                onChange={props.onChange}
            >
                <option value="" disabled defaultValue>
                    Select Country
                </option>
                {countries.map((country, idx) => {
                    return (
                        <option value={country.id} key={`country-${idx}`}>
                            {country.name}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};

/* --------------------------------------------- */
/* ----------- Form Block Image Field ---------- */
/* --------------------------------------------- */
export const FormBlockImage = (props) => {
    // Image preview
    const [imgPreview, setImagePreview] = useState(props.defaultImage);
    const [removeBtnActive, setRemoveBtnActive] = useState(false);

    // Handle image change preview
    const handleThumbnailChange = (e) => {
        const [file] = e.target.files;
        if (file) {
            setImagePreview(URL.createObjectURL(file));
            setRemoveBtnActive(true);
        } else {
            setImagePreview(props.defaultImage);
            setRemoveBtnActive(false);
        }
    };

    // Handle image remove
    const handleRemoveThumbnail = () => {
        setImagePreview(props.defaultImage);
        setRemoveBtnActive(false);
        props.setFormInputs((formInputs) => ({
            ...formInputs,
            [props.name]: "",
        }));
    };

    return (
        <div className="form-block">
            <label htmlFor={props.id}>
                <span>{props.label}</span>
                <img
                    src={imgPreview}
                    alt="Default"
                    className="form-thumbnail"
                />
            </label>
            {removeBtnActive && (
                <span
                    id="remove-thumbnail"
                    onClick={() => {
                        handleRemoveThumbnail(props.id);
                    }}
                    className="btn btn-md btn-danger-outline"
                    role="button"
                >
                    Remove image
                </span>
            )}
            <input
                type="file"
                name={props.name}
                accept="image/*"
                className="form-control"
                id={props.id}
                onChange={(e) => {
                    handleThumbnailChange(e);
                    props.onChange(e);
                }}
            />
            <FieldError error={props.error} field={props.id} />
        </div>
    );
};
