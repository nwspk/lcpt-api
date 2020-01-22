import { Router, Request, Response } from 'express'

import asyncHandler from 'express-async-handler'
import { listHandler, responseHandler } from '../util'
import User from 'src/models/User.model'
import Campus from 'src/models/Campus.model'

const router = Router()
// router.use(authenticate)
// router.use(adminVerify)
export default router

// TODO: permissions for create/edit

router.get('/alumni.json',
    asyncHandler(async (req: Request, res: Response) => {
        const alumni = await User.find({ isFellow: true });
        res.send(alumni);
    })
);

router.get(
    '/',
    asyncHandler(async (req: Request, res: Response) => {
        const params = await listHandler(User, req)
        return responseHandler(res, params)
    })
)

router.get(
    '/:id',
    asyncHandler(async function (req: Request, res: Response) {
        const record = await User.findOne(req.params.id)
        res.send(record)
    })
)

router.delete(
    '/:id',
    asyncHandler(async function (req: Request, res: Response) {
        const record = await User.delete(req.params.id)
        res.send(record)
    })
)

router.post(
    '/',
    asyncHandler(async function (req: Request, res: Response) {
        const reqUser = req.user as User;

        // const isDean = reqUser.campus?.dean.id === reqUser.id;
        if (!reqUser.isAdmin) {
            throw new Error(`Only admins can create new users`);
        }

        const record = new User();
        if (reqUser.isAdmin && req.body.campus) {
            const newCampusId = (req.body.campus || {}).id;
            delete req.body.campus;
            const campus = await Campus.findOneOrFail(newCampusId);
            record.campus = campus;
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
        const record = await User.findOne(req.params.id)
        const body = req.body;
        const newCampusId = (body.campus || {}).id;
        delete body.campus;
        delete body.id;
        delete body.createdAt;
        delete body.updatedAt;
        if (body.isFellow && record.isFellow !== body.isFellow) {
            body.receivedFellowshipAt = new Date();
        }
        Object.assign(record, body);
        if ((record.campus || {}).id !== newCampusId) {
            const newCampus = await Campus.findOneOrFail(newCampusId);
            record.campus = newCampus;
        }
        res.send(await record.save());
    })
)
