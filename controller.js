// const pool = require("./db");

const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "123",
  port: 5432,
});

const getUsers = (request, response) => {
    pool.query("SELECT * FROM hr.users", (error, results) => {
        if (error) {
            console.log(error);
        }
        response.status(200).json(results.rows);
    });
};

const checkEmailExits = (request, response) => {
    const {name, email} = request.body;
    pool.query("SELECT * FROM hr.users u WHERE u.email = $1", [email], (error, results) => {
        if (error) {
            console.log(error);
        }
        if (results.rows.length) {
            response.send("user already exists");
        }
    });
};
const getUserById = (request, response) => {
    const  id = parseInt(request.params.id);
    pool.query("SELECT * FROM hr.users WHERE id = $1", [id], (error, results) => {
        if (error) {
            console.log(error);
        }
        response.status(200).json(results.rows);
    });
};

const addUser = (request, response) => {
    const  {name, email} = request.body;
    console.log(name);
    console.log(email);

    // checking whether user is already present in database
    // if present is not present or not
    pool.query("SELECT * FROM hr.users u WHERE u.email = $1", [email], (error, results) => {
        if (error) {
            console.log(error);
        }
        if (results.rows.length > 0) {
            response.send("user already exists");
        }
        else {
            pool.query("INSERT INTO hr.users (name, email) VALUES ($1, $2);", [name, email], (error, results) => {
                if (error) {
                    console.log(error);
                }
                response.status(201).send("user inserted successfully");
            });
        }

    });
};

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id);

    // checking whether user is already present in database
    // if present, no need to insert
    pool.query("SELECT * FROM hr.users u WHERE u.id = $1", [id], (error, results) => {
        if (error) {
            console.log(error);
        }
        if (results.rows.length == 0) {
            response.send("user does not exist. deletion failed");
        }
        else {
            pool.query("DELETE FROM hr.users u WHERE u.id = $1;", [id], (error1, results1) => {
                if (error1) {
                    console.log(error1);
                }
                console.log(id);
                response.status(201).send("user deleted successfully");
            });
        }

    });
};


const editUser = (request, response) => {
    const id = parseInt(request.params.id);

    // checking whether user is already present in database
    // if present is not present or not
    pool.query("SELECT * FROM hr.users WHERE id = $1", [id], (error, results) => {
        if (error) {
            console.log(error);
        }
        if (results.rows.length == 0) {
            response.send("user does not exist. updation failed");
        }
        else {
            const  {name, email} = request.body;
            console.log(name);
            console.log(email);

            pool.query("UPDATE hr.users SET name = $1, email = $2 WHERE id = $3 ;", [name, email, id], (error1, results1) => {
                if (error1) {
                    console.log(error1);
                }
                console.log(id);
                response.status(201).send("user updated successfully");
            });
        }

    });
};

module.exports = {
    getUsers,
    getUserById,
    addUser,
    deleteUser,
    editUser,
};