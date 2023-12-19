import "dotenv/config.js"
import express from 'express';
import cors from 'cors';
import connectDatabase from './config/database.js';
import userRoutes from './routes/user.route.js';
import adminRoutes from './routes/admin.route.js';
import productRoutes from './routes/product.route.js';
import saleRoutes from './routes/sale.route.js';
import bodyParser from 'body-parser';
import helmet from 'helmet';

const app = express();

const PORT = process.env.PORT || 8080;
const baseURL = '/api';

connectDatabase();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());

app.use(`${baseURL}/login`, userRoutes);
app.use(`${baseURL}/create`,  adminRoutes);
app.use(`${baseURL}/inventory`, productRoutes);
app.use(`${baseURL}/sales`, saleRoutes);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));