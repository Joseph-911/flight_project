export const adminActionsList = [
    {
        title: "Users",
        target: "users",
        actions: [
            { title: "View All Users", icon: "eye", link: "/all" },
            { title: "Add User", icon: "add", link: "/add" },
        ],
    },
    {
        title: "Customers",
        actions: [
            {
                title: "View All Customers",
                icon: "eye",
                link: "/customers",
            },
            { title: "Add Customer", icon: "add", link: "/customers/add" },
        ],
    },
    {
        title: "Airlines",
        actions: [
            {
                title: "View All Airlines",
                icon: "eye",
                link: "/airlines",
            },
            { title: "Add Airline", icon: "add", link: "/airlines/add" },
        ],
    },
    {
        title: "Administrators",
        actions: [
            {
                title: "View All Administrators",
                icon: "eye",
                link: "/administrators",
            },
            {
                title: "Add Administrator",
                icon: "add",
                link: "/administrators/add",
            },
        ],
    },
    {
        title: "Countries",
        actions: [
            {
                title: "View All Countries",
                icon: "eye",
                link: "countries/",
            },
            {
                title: "Add Country",
                icon: "add",
                link: "countries/add",
            },
        ],
    },
];
