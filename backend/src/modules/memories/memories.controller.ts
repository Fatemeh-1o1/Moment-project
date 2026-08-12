import { Router } from 'express';
import { z } from 'zod';
import { type SessionRequest } from '../../shared/http.js';
import { upload } from '../../shared/upload.js';
import { memoriesRepository as repo } from './memories.repository.js';

export const memoriesRouter = Router();
const input = z.object({
  content: z.string().trim().min(1).max(5000),
  mood: z.enum(['happy', 'calm', 'nostalgic', 'tired']),
  memoryDate: z.string().date(),
});
const uid = (r: unknown) => (r as SessionRequest).userId;

memoriesRouter.get('/', async (req, res) => res.json({ memories: await repo.list(uid(req)) }));
memoriesRouter.get('/:id', async (req, res) => {
  const memory = (await repo.list(uid(req))).find(x => x.id === req.params.id);
  if (!memory) return res.status(404).json({ message: 'یادداشت پیدا نشد' });
  res.json({ memory });
});
memoriesRouter.post('/', async (req, res, next) => {
  try {
    const memory = await repo.create(uid(req), input.parse(req.body));
    res.status(201).json({ memory: { ...memory, media: [] } });
  } catch (e) {
    next(e);
  }
});
memoriesRouter.post('/:id/media', upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'فایلی ارسال نشد' });
    const type = req.file.mimetype.startsWith('video/') ? 'video' : 'image';
    const url = `/uploads/${req.file.filename}`;
    const media = await repo.addMedia(uid(req), String(req.params.id), type, url);
    if (!media) return res.status(404).json({ message: 'یادداشت پیدا نشد' });
    res.status(201).json({ media });
  } catch (e) {
    next(e);
  }
});
memoriesRouter.patch('/:id', async (req, res, next) => {
  try {
    const memory = await repo.update(uid(req), req.params.id, input.partial().parse(req.body));
    if (!memory) return res.status(404).json({ message: 'یادداشت پیدا نشد' });
    res.json({ memory });
  } catch (e) {
    next(e);
  }
});
memoriesRouter.delete('/:id', async (req, res) => {
  await repo.remove(uid(req), req.params.id);
  res.status(204).end();
});
