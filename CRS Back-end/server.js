// Hard coding
// const express = require('express');
// const path = require('path');
// // const exphbs = require('express-handlebars');
// // const logger = require('./middleware/logger');
// const products = require('./Products')

// const app = express();

// // Init middleware
// //app.use(logger);

// // Handlebars Middleware
// // app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
// // app.set('view engine', 'handlebars');

// // Body Parser Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// // Homepage Route
// // app.get('/', (req, res) => 
// //     res.render('index', {
// //         title: 'Member App',
// //         members
// //     })
// // );

// //Set static folder
// app.use(express.static(path.join(__dirname, 'public')));

// // Products API Routes
// app.use('/api/products', require('./routes/api/products'))

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

//Data base
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db') 
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));