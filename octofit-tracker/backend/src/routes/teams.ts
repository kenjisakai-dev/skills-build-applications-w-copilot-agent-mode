import { Router, Request, Response } from 'express';
import { Team } from '../models/Team';

const router = Router();

// GET /api/teams/
router.get('/', async (_req: Request, res: Response) => {
  const teams = await Team.find().populate('members', '-password');
  res.json(teams);
});

// GET /api/teams/:id
router.get('/:id', async (req: Request, res: Response) => {
  const team = await Team.findById(req.params.id).populate('members', '-password');
  if (!team) return res.status(404).json({ error: 'Team not found' });
  return res.json(team);
});

// POST /api/teams/
router.post('/', async (req: Request, res: Response) => {
  const team = new Team(req.body);
  await team.save();
  res.status(201).json(team);
});

// PUT /api/teams/:id
router.put('/:id', async (req: Request, res: Response) => {
  const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('members', '-password');
  if (!team) return res.status(404).json({ error: 'Team not found' });
  return res.json(team);
});

// DELETE /api/teams/:id
router.delete('/:id', async (req: Request, res: Response) => {
  const team = await Team.findByIdAndDelete(req.params.id);
  if (!team) return res.status(404).json({ error: 'Team not found' });
  return res.json({ message: 'Team deleted' });
});

export default router;
