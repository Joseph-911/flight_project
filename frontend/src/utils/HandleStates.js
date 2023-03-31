export const handleInputChange = (e, theSetState) => {
    const name = e.target.name;
    const value = e.target.value;
    theSetState((values) => ({ ...values, [name]: value }));
};

export const handleImageInputChange = (e, theSetState) => {
    const name = e.target.name;
    const [value] = e.target.files;
    theSetState((values) => ({ ...values, [name]: value }));
};
