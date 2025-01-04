
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { Pool } = require('pg');
const app = express();
const port = 5500;
const cors = require('cors');
require('dotenv/config');

app.use(cors());
app.options('*', cors())

// middleware
app.use(bodyParser.json())
app.use(morgan('tiny'));
app.use(express.json());


/** this is for signup */
// app.post('/signup', async (req, res) => {
//     console.log(req)
//     try {
//         const {
//             first_name,
//             last_name,
//             gender,
//             phone,
//             address,
//             email,
//             password,
//         } = req.body;
//         const query = `

//             INSERT INTO users (first_name, last_name, gender, phone, address, email, password)
//             VALUES ($1, $2, $3, $4, $5, $6, $7)
//             RETURNING id;
//         `;

//         const values = [
//             first_name,
//             last_name,
//             gender,
//             phone,
//             address,
//             email,
//             password,
//         ];

//         const result = await pool.query(query, values);

//         res.status(200).json({ message: 'User registered successfully' });
//     } catch (error) {
//         res.status(500).json({ error: 'An error occurred during registration' });
//     }
// });

/** this is for login */
// app.post('/login', async (req, res) => {
//     console.log(req);
//     try {
//         const { email, password } = req.body;
//         const query = `
//             SELECT * FROM users
//             WHERE (email = $1 OR phone = $1) AND password = $2;
//         `;

//         const values = [email, password];

//         const result = await pool.query(query, values);
//         res.status(200).json({message:'success'})
//     } catch (error) {
//         console.log('Error during login:', error);
//         res.status(500).json({ error: 'An error occurred during login' });
//     }
// });


// Routes
// const categoriesRoutes = require('./routes/categories');
// const productsRoutes = require('./routes/products');
// const usersRoutes = require('./routes/users');
// const ordersRoutes = require('./routes/orders');


// const api = process.env.API_URL;
// app.get(`${api}/products`,(req,res) =>{
//     const product ={
//         id: 1,
//         name: 'hair hv',
//         Image: 'url',
//     }
//     res.send(product);
// })

// app.post(`${api}/products`,(req,res) =>{
//     const newproduct = req.body;
//     console.log(newproduct);
//     res.send(newproduct);
// })

// database
const pool = new Pool({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: '6267',
    database: "kalakriti",
});
pool.connect()
    .then(() => {
        console.log('Database Connection is ready...');
    })
    .catch((err) => {
        console.error(err);
    });


// server
const startServer = () => {
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
};

