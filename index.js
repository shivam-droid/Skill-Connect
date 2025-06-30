import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './backend/routes/authRoutes.js';
import cors from 'cors';
import serverConfig from './backend/config/serverConfig.js';
import serviceTypeRoutes from './backend/routes/serviceTypeRoutes.js';
import userRoutes from './backend/routes/userRoutes.js';
import listingRoutes from './backend/routes/listingRoutes.js';


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/servicetypes', serviceTypeRoutes);
app.use('/api/users', userRoutes); // Ensure userRoutes is imported from the correct path
app.use('/api/listings',listingRoutes);


mongoose.connect(serverConfig.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(serverConfig.PORT, () => console.log(`Server running on port ${serverConfig.PORT}`));
  })
  .catch((err) => console.error(err));
