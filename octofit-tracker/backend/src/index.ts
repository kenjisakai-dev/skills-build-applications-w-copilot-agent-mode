import express from 'express';
import mongoose from 'mongoose';
import usersRouter      from './routes/users';
import teamsRouter      from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter   from './routes/workouts';

const app = express();
const PORT = 8000;
const MONGO_URI = 'mongodb://localhost:27017/octofit_db';

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

app.get('/api/', (_req, res) => {
  res.json({ message: 'OctoFit Tracker API is running', baseUrl });
});

app.use('/api/users',       usersRouter);
app.use('/api/teams',       teamsRouter);
app.use('/api/activities',  activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts',    workoutsRouter);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB — octofit_db');
    app.listen(PORT, () => {
      console.log(`Backend running on ${baseUrl}`);
    });
  })
  .catch((err: Error) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

export default app;
