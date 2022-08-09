import bcrypt from 'bcryptjs';
const users=[
    
    {
        name: "John Doe",
        email: "john@example.com",
        password: bcrypt.hashSync("1111", 10),
        isAdmin: false,
    },
    {
        name: "Jane Doe",
        email: "jane@example.com",
        password: bcrypt.hashSync("1111", 10),
        isAdmin: false,
    },
    {
        name: "Admin",
        email: "admin@example.com",
        password: bcrypt.hashSync("1111", 10),
        isAdmin: true,
    },
]
export default users;