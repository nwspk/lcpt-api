import { Router, Request, Response } from 'express'

import asyncHandler from 'express-async-handler'
import { listHandler, responseHandler } from '../util'
import Campus from 'src/models/Campus.model'
import User from 'src/models/User.model'

const router = Router()
// router.use(authenticate)
// router.use(adminVerify)
export default router

router.get(
    '/',
    asyncHandler(async (req: Request, res: Response) => {
        const params = await listHandler(Campus, req, null, { relations: ['dean'] });
        return responseHandler(res, params)
    })
)

router.get(
    '/:id',
    asyncHandler(async function (req: Request, res: Response) {
        const record = await Campus.findOne(req.params.id, { relations: ['dean'] })
        res.send(record)
    })
)

router.post(
    '/',
    asyncHandler(async function (req: Request, res: Response) {
        const reqUser = req.user as User;

        if (!reqUser.isAdmin) {
            throw new Error(`Only admins can create new users`);
        }

        const record = new Campus();
        if (req.body.dean) {
            const newDeanId = (req.body.dean || {}).id;
            delete req.body.dean;
            const dean = await User.findOneOrFail(newDeanId);
            record.dean = dean;
        }
        // else if (isDean) {
        //     record.campus = reqUser.campus;
        // }

        Object.assign(record, req.body);
        await record.save();
        res.send(record);
    })
)

router.put(
    '/:id',
    asyncHandler(async function (req: Request, res: Response) {
        const record = await Campus.findOne(req.params.id)
        const body = req.body;
        const newDeanId = (body.dean || {}).id;
        delete body.campus;
        delete body.id;
        delete body.createdAt;
        delete body.updatedAt;
        Object.assign(record, body);
        if ((record.dean || {}).id !== newDeanId && (req.user as User).isAdmin) {
            const newDean = await User.findOneOrFail(newDeanId);
            record.dean = newDean;
        }
        res.send(await record.save());
    })
)
