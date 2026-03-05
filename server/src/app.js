import express from 'express'
import 'dotenv/config'
import organizationRoutes from './routes/organization.route.js'
import departmentRoutes from './routes/department.route.js'
import authRoutes from './routes/user.route.js'
import revenueRoutes from './routes/revenue.route.js'
import cookieParser from 'cookie-parser'
import cors from 'cors';
 
const app = express();


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use('/api/organization' , organizationRoutes)
app.use('/api/departments' , departmentRoutes)
app.use('/api/auth' , authRoutes)
app.use('/api/revenue' , revenueRoutes)

export default app;