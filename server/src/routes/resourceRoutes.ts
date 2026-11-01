import { Router, Request, Response } from 'express';
import { getVerifiedResources } from '../services/resourceService';

const router = Router();

// GET /api/v1/resources
router.get('/', (req: Request, res: Response) => {
  const lang = (req.query.lang as string) === 'hi' ? 'hi' : 'en';
  const category = req.query.category as string | undefined;
  const query = req.query.query as string | undefined;

  const resources = getVerifiedResources(lang, category, query);

  res.json({
    success: true,
    count: resources.length,
    resources
  });
});

export default router;
