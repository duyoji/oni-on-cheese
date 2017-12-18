import { Router } from 'express';
import { getRooms } from './controller';

const router = Router();

router.route('/')
  .get(getRooms);

export default router;