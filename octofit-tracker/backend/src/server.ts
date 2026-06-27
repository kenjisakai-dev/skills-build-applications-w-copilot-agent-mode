import express from 'express';
import cors from 'cors';
import { connectDatabase } from './config/database';
import usersRouter      from './routes/users';
import teamsRouter      from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter   from './routes/workouts';

const app = express();
const PORT = 8000;

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(cors());
app.use(express.json());

app.get('/api/', (_req, res) => {
  res.json({ message: 'OctoFit Tracker API is running', baseUrl });
});

app.use('/api/users',       usersRouter);
app.use('/api/teams',       teamsRouter);
app.use('/api/activities',  activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts',    workoutsRouter);

connectDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Backend running on ${baseUrl}`);
    });
  })
  .catch((err: Error) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

export default app;
