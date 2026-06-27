import { Router, Request, Response } from 'express';
import { Leaderboard } from '../models/Leaderboard';

const router = Router();

// GET /api/leaderboard/
router.get('/', async (_req: Request, res: Response) => {
  const entries = await Leaderboard.find()
    .populate('user', '-password')
    .sort({ score: -1 });
  res.json(entries);
});

// GET /api/leaderboard/:id
router.get('/:id', async (req: Request, res: Response) => {
  const entry = await Leaderboard.findById(req.params.id).populate('user', '-password');
  if (!entry) return res.status(404).json({ error: 'Leaderboard entry not found' });
  return res.json(entry);
});

// POST /api/leaderboard/
router.post('/', async (req: Request, res: Response) => {
  const entry = new Leaderboard(req.body);
  await entry.save();
  res.status(201).json(entry);
});

// PUT /api/leaderboard/:id
router.put('/:id', async (req: Request, res: Response) => {
  const entry = await Leaderboard.findByIdAndUpdate(
    req.params.id,
    { ...req.body, updated_at: new Date() },
    { new: true }
  );
  if (!entry) return res.status(404).json({ error: 'Leaderboard entry not found' });
  return res.json(entry);
});

// DELETE /api/leaderboard/:id
router.delete('/:id', async (req: Request, res: Response) => {
  const entry = await Leaderboard.findByIdAndDelete(req.params.id);
  if (!entry) return res.status(404).json({ error: 'Leaderboard entry not found' });
  return res.json({ message: 'Leaderboard entry deleted' });
});

export default router;
