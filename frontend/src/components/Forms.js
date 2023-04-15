import React, { useRef, useState } from "react";

import user_default from "../assets/images/users/user_default.png";
import country_default from "../assets/images/countries/country-default.png";

import {
    FormBlock,
    FormBlockSelectCountry,
    FormBlockSelectUsers,
    FieldError,
    FormBlockImage,
} from "./FormsUtils";
import CreditCard from "./CreditCard";

/* --------------------------------------------- */
/* ---------------- Search Form ---------------- */
/* --------------------------------------------- */
export const SearchForm = (props) => {
    return (
        <div className="form-wrapper-oneline">
            <form
                id="searchForm"
                method="GET"
                className="form-inline"
                onSubmit={props.handleSearch}
            >
                <div className="form-block">
                    <input
                        type="search"
                        placeholder={props.placeholder}
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

/* --------------------------------------------- */
/* --------------- Register Form --------------- */
/* --------------------------------------------- */
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

/* --------------------------------------------- */
/* --------------- Customer Form --------------- */
/* --------------------------------------------- */
export const CustomerForm = (props) => {
    return (
        <>
            {props.userSelect && (
                <FormBlockSelectUsers
                    value={props.formInputs.user_id || ""}
                    onChange={(e) => {
                        props.handleInputChange(e, props.setFormInputs);
                    }}
                    error={props.error}
                    target={props.target}
                    sender={props.sender}
                />
            )}
            <FormBlock
                label="First name"
                name="first_name"
                type="text"
                required
                id="first_name"
                value={props.formInputs.first_name || ""}
                onChange={(e) => {
                    props.handleInputChange(e, props.setFormInputs);
                }}
                error={props.error}
            />
            <FormBlock
                label="Last name"
                name="last_name"
                type="text"
                required
                id="last_name"
                value={props.formInputs.last_name || ""}
                onChange={(e) => {
                    props.handleInputChange(e, props.setFormInputs);
                }}
                error={props.error}
            />
            <FormBlock
                label="Address"
                name="address"
                type="text"
                required
                id="address"
                value={props.formInputs.address || ""}
                onChange={(e) => {
                    props.handleInputChange(e, props.setFormInputs);
                }}
                error={props.error}
            />
            <FormBlock
                label="Credit card number"
                name="credit_card_no"
                type="text"
                required
                id="credit_card_no"
                value={props.formInputs.credit_card_no || ""}
                onChange={(e) => {
                    props.handleInputChange(e, props.setFormInputs);
                }}
                error={props.error}
                maxLength="16"
            />
            <FormBlock
                label="Phone number"
                name="phone_no"
                type="text"
                required
                id="phone_no"
                value={props.formInputs.phone_no || ""}
                onChange={(e) => {
                    props.handleInputChange(e, props.setFormInputs);
                }}
                error={props.error}
                maxLength="10"
            />

            <div className="form-block">
                <CreditCard formInputs={props.formInputs} />
            </div>
        </>
    );
};

/* --------------------------------------------- */
/* --------------- Airline Form ---------------- */
/* --------------------------------------------- */
export const AirlineForm = (props) => {
    return (
        <>
            {props.userSelect && (
                <FormBlockSelectUsers
                    value={props.formInputs.user_id || ""}
                    onChange={(e) => {
                        props.handleInputChange(e, props.setFormInputs);
                    }}
                    error={props.error}
                    target={props.target}
                    sender={props.sender}
                />
            )}
            <FormBlock
                label="Company Name"
                name="name"
                type="text"
                required
                id="name"
                value={props.formInputs.name || ""}
                onChange={(e) => {
                    props.handleInputChange(e, props.setFormInputs);
                }}
                error={props.error}
            />
            <FormBlockSelectCountry
                label="Country"
                name="country_id"
                id="country_id"
                value={props.formInputs.country_id || ""}
                onChange={(e) => {
                    props.handleInputChange(e, props.setFormInputs);
                }}
                error={props.error}
            />
        </>
    );
};

/* --------------------------------------------- */
/* ------------ Administrator Form ------------- */
/* --------------------------------------------- */
export const AdministratorForm = (props) => {
    return (
        <>
            {props.userSelect && (
                <FormBlockSelectUsers
                    value={props.formInputs.user_id || ""}
                    onChange={(e) => {
                        props.handleInputChange(e, props.setFormInputs);
                    }}
                    error={props.error}
                    target={props.target}
                    sender={props.sender}
                />
            )}

            <FormBlock
                label="First Name"
                name="first_name"
                type="text"
                required
                id="first_name"
                value={props.formInputs.first_name || ""}
                onChange={(e) => {
                    props.handleInputChange(e, props.setFormInputs);
                }}
                error={props.error}
            />
            <FormBlock
                label="Last Name"
                name="last_name"
                type="text"
                required
                id="last_name"
                value={props.formInputs.last_name || ""}
                onChange={(e) => {
                    props.handleInputChange(e, props.setFormInputs);
                }}
                error={props.error}
            />
        </>
    );
};

/* --------------------------------------------- */
/* ---------------- Country Form --------------- */
/* --------------------------------------------- */
export const CountryForm = (props) => {
    return (
        <>
            <FormBlockImage
                id="flag"
                label="Flag"
                name="flag"
                defaultImage={country_default}
                setFormInputs={props.setFormInputs}
                error={props.error}
                onChange={(e) => {
                    props.handleImageInputChange(e, props.setFormInputs);
                }}
            />

            <FormBlock
                label="Name"
                name="name"
                type="text"
                required
                id="name"
                value={props.formInputs.name || ""}
                onChange={(e) => {
                    props.handleInputChange(e, props.setFormInputs);
                }}
                error={props.error}
            />
        </>
    );
};

/* --------------------------------------------- */
/* ---------------- Flight Form ---------------- */
/* --------------------------------------------- */
export const FlightForm = (props) => {
    return (
        <>
            <FormBlockSelectCountry
                label="Origin Country"
                name="origin_country_id"
                id="origin_country_id"
                value={props.formInputs.origin_country_id || ""}
                onChange={(e) => {
                    props.handleInputChange(e, props.setFormInputs);
                }}
                error={props.error}
            />
            <FormBlockSelectCountry
                label="Destination Country"
                name="destination_country_id"
                id="destination_country_id"
                value={props.formInputs.destination_country_id || ""}
                onChange={(e) => {
                    props.handleInputChange(e, props.setFormInputs);
                }}
                error={props.error}
            />
            <FormBlock
                label="Departure time"
                name="departure_time"
                type="datetime-local"
                required
                id="departure_time"
                value={props.formInputs.departure_time || ""}
                onChange={(e) => {
                    props.handleInputChange(e, props.setFormInputs);
                }}
                error={props.error}
            />
            <FormBlock
                label="Landing time"
                name="landing_time"
                type="datetime-local"
                required
                id="landing_time"
                value={props.formInputs.landing_time || ""}
                onChange={(e) => {
                    props.handleInputChange(e, props.setFormInputs);
                }}
                error={props.error}
            />
            <FormBlock
                label="Price"
                name="price"
                type="number"
                required
                id="price"
                value={props.formInputs.price || ""}
                onChange={(e) => {
                    props.handleInputChange(e, props.setFormInputs);
                }}
                error={props.error}
            />
            <FormBlock
                label="Remaining Tickets"
                name="remaining_tickets"
                type="number"
                required
                id="remaining_tickets"
                value={props.formInputs.remaining_tickets || ""}
                onChange={(e) => {
                    props.handleInputChange(e, props.setFormInputs);
                }}
                error={props.error}
            />
        </>
    );
};
