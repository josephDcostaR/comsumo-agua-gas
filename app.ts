import express from 'express';
import bodyParser from 'body-parser';
import uploadRoutes from './routes/uploadRouter'; // Corrigido
import confirmRoutes from './routes/confirmRouter'; // Corrigido
import listRoutes from './routes/listRouter'; // Corrigido
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/upload', uploadRoutes);
app.use('/confirm', confirmRoutes);
app.use('/list', listRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
