// export const registerFormFields = [
//     { name: "username", type: "text", required: true },
// ];

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
