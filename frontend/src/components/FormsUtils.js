import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { getUserNoRole } from "api/administratorsActions";
import { getAllCountries } from "api/countriesActions";
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
                    return <p key={`${props.field}-error-${idx}`}>{err}</p>;
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
            <label htmlFor="country_id">Country</label>
            <select
                name="country_id"
                id="country_id"
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
