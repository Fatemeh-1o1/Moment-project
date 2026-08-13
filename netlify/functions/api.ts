import 'dotenv/config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import serverless from 'serverless-http';
import { ZodError } from 'zod';
import { authRouter } from '../../backend/src/modules/auth/auth.controller.js';
import { capsulesRouter } from '../../backend/src/modules/capsules/capsules.controller.js';
import { memoriesRouter } from '../../backend/src/modules/memories/memories.controller.js';
import { authRequired } from '../../backend/src/shared/http.js';

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL ?? 'http://localhost:5173', credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());
app.use('/api/auth', authRouter);
app.use('/api/memories', authRequired, memoriesRouter);
app.use('/api/capsules', authRequired, capsulesRouter);
app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  const message = err instanceof ZodError ? err.issues[0]?.message : err instanceof Error ? err.message : 'خطای ناشناخته';
  res.status(err instanceof ZodError ? 400 : 500).json({ message });
});

export const handler = serverless(app);
