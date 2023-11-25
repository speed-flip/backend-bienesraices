import app from './app';
import connectDB from './config/conectarDB';

import authRoutes from './routes/authRoutes';
import inmuebleRoutes from './routes/inmuebleRoutes';

connectDB();

// routes
app.use('/api/auth', authRoutes);
app.use('/api/inmueble', inmuebleRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
