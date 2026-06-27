import { Router, Request, Response } from 'express';
import { Activity } from '../models/Activity';

const router = Router();

// GET /api/activities/
router.get('/', async (_req: Request, res: Response) => {
  const activities = await Activity.find().populate('user', '-password').sort({ date: -1 });
  res.json(activities);
});

// GET /api/activities/:id
router.get('/:id', async (req: Request, res: Response) => {
  const activity = await Activity.findById(req.params.id).populate('user', '-password');
  if (!activity) return res.status(404).json({ error: 'Activity not found' });
  return res.json(activity);
});

// POST /api/activities/
router.post('/', async (req: Request, res: Response) => {
  const activity = new Activity(req.body);
  await activity.save();
  res.status(201).json(activity);
});

// PUT /api/activities/:id
router.put('/:id', async (req: Request, res: Response) => {
  const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!activity) return res.status(404).json({ error: 'Activity not found' });
  return res.json(activity);
});

// DELETE /api/activities/:id
router.delete('/:id', async (req: Request, res: Response) => {
  const activity = await Activity.findByIdAndDelete(req.params.id);
  if (!activity) return res.status(404).json({ error: 'Activity not found' });
  return res.json({ message: 'Activity deleted' });
});

export default router;
