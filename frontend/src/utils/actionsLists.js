const createActions = (plural, singular) => {
    let actions = [
        { title: `View All ${plural}`, icon: "eye", link: "/all" },
        { title: `Add ${singular}`, icon: "add", link: "/add" },
    ];
    return actions;
};

export const adminActionsList = [
    {
        title: "Users",
        target: "users",
        isForm: true,
        actions: createActions("Users", "User"),
    },
    {
        title: "Customers",
        target: "customers",
        isForm: true,
        actions: createActions("Customers", "Customer"),
    },
    {
        title: "Airlines",
        target: "airlines",
        isForm: true,
        actions: createActions("Airlines", "Airline"),
    },
    {
        title: "Administrators",
        target: "administrators",
        isForm: true,
        actions: createActions("Administrators", "Administrator"),
    },
    {
        title: "Countries",
        target: "countries",
        isForm: true,
        actions: createActions("Countries", "Country"),
    },
];
