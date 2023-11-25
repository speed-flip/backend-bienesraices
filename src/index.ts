import app from './app';
import connectDB from './config/conectarDB';

connectDB();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
