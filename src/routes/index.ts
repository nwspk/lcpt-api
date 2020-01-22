import { Router, Request, Response } from 'express'
import user from './user';
import campus from './campus';
import Campus from 'src/models/Campus.model';

const router = Router()

router.use('/user', user);
router.use('/campus', campus);

export default router
