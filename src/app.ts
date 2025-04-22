import express from 'express';
import cors from 'cors';
import userRoutes from './routes/usuarioRouter';
import cryptoRouter from './routes/cryptoRouter';
import inicio_sesioRouter from './routes/inicio_sesionRoutes';
import programaEstudioRouter from './routes/programaEstudioRouter';
import semestreRouter from './routes/semestreRouter';
import turnoRouter from './routes/turnoRoutes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/usuario', userRoutes);
app.use('/api/md5', cryptoRouter);
app.use('/api/inicio_sesion', inicio_sesioRouter);
app.use('/api/programaEstudio', programaEstudioRouter);
app.use('/api/semestre', semestreRouter);
app.use('/api/turno', turnoRouter);





// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: err.message
    });
});


export default app;