/**
 * Seed the octofit_db database with test data
 *
 * Usage: npx ts-node src/scripts/seed.ts
 */

import mongoose from 'mongoose';
import { connectDatabase } from '../config/database';
import { User } from '../models/User';
import { Team } from '../models/Team';
import { Activity } from '../models/Activity';
import { Leaderboard } from '../models/Leaderboard';
import { Workout } from '../models/Workout';

async function seed() {
  await connectDatabase();

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({}),
  ]);
  console.log('Cleared existing collections');

  // Users
  const users = await User.insertMany([
    { username: 'monalisa',    email: 'monalisa@github.com',    password: 'hashed_pw_1', age: 28 },
    { username: 'octocat',     email: 'octocat@github.com',     password: 'hashed_pw_2', age: 25 },
    { username: 'hubot',       email: 'hubot@github.com',       password: 'hashed_pw_3', age: 30 },
    { username: 'defunkt',     email: 'defunkt@github.com',     password: 'hashed_pw_4', age: 35 },
    { username: 'torvalds',    email: 'torvalds@github.com',    password: 'hashed_pw_5', age: 54 },
  ]);
  console.log(`Inserted ${users.length} users`);

  // Teams
  const teams = await Team.insertMany([
    { name: 'OctoRunners',  members: [users[0]._id, users[1]._id] },
    { name: 'GitFit',       members: [users[2]._id, users[3]._id] },
    { name: 'PushAndPull',  members: [users[4]._id, users[0]._id] },
  ]);
  console.log(`Inserted ${teams.length} teams`);

  // Activities
  const activities = await Activity.insertMany([
    { user: users[0]._id, activity_type: 'Running',   duration: 30, calories_burned: 300, date: new Date('2026-06-20') },
    { user: users[1]._id, activity_type: 'Cycling',   duration: 45, calories_burned: 400, date: new Date('2026-06-21') },
    { user: users[2]._id, activity_type: 'Swimming',  duration: 60, calories_burned: 500, date: new Date('2026-06-22') },
    { user: users[3]._id, activity_type: 'Yoga',      duration: 50, calories_burned: 200, date: new Date('2026-06-23') },
    { user: users[4]._id, activity_type: 'Weightlifting', duration: 40, calories_burned: 350, date: new Date('2026-06-24') },
    { user: users[0]._id, activity_type: 'Hiking',    duration: 90, calories_burned: 600, date: new Date('2026-06-25') },
  ]);
  console.log(`Inserted ${activities.length} activities`);

  // Leaderboard
  const leaderboard = await Leaderboard.insertMany([
    { user: users[0]._id, score: 900 },
    { user: users[1]._id, score: 400 },
    { user: users[2]._id, score: 500 },
    { user: users[3]._id, score: 200 },
    { user: users[4]._id, score: 350 },
  ]);
  console.log(`Inserted ${leaderboard.length} leaderboard entries`);

  // Workouts
  const workouts = await Workout.insertMany([
    {
      name: 'Morning Cardio',
      description: 'A 30-minute cardio routine to start your day.',
      exercises: [
        { name: 'Jumping Jacks', sets: 3, reps: 20 },
        { name: 'High Knees',    sets: 3, reps: 30 },
        { name: 'Burpees',       sets: 3, reps: 10 },
      ],
      duration: 30,
      difficulty: 'beginner',
    },
    {
      name: 'Strength Builder',
      description: 'Build core strength with compound movements.',
      exercises: [
        { name: 'Squats',       sets: 4, reps: 12 },
        { name: 'Deadlifts',    sets: 4, reps: 8  },
        { name: 'Bench Press',  sets: 3, reps: 10 },
      ],
      duration: 60,
      difficulty: 'intermediate',
    },
    {
      name: 'Advanced HIIT',
      description: 'High-intensity interval training for advanced athletes.',
      exercises: [
        { name: 'Sprint Intervals', sets: 6, reps: 1  },
        { name: 'Box Jumps',        sets: 5, reps: 10 },
        { name: 'Pull-ups',         sets: 4, reps: 12 },
      ],
      duration: 45,
      difficulty: 'advanced',
    },
  ]);
  console.log(`Inserted ${workouts.length} workouts`);

  console.log('Seed complete!');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
