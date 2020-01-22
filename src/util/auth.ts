import passport from 'passport';
import { NextFunction, Request, Response } from 'express';
import User from 'src/models/User.model';

passport.serializeUser(function (user: User, done) {
    done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
    try {
        const user = await User.findOneOrFail(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

export function clearSessionOnError(err: any, req: Request, res: Response, next: NextFunction) {
    if (res.headersSent) {
        return next(err);
    }
    if (err.name === 'EntityNotFound') {
        // When passport.deserialize fails, it throws this
        req.session.destroy(() => {
            // NOOP
        });
        req.logout();
        return res.redirect(req.path);
    }
    return res.sendStatus(err.status || 500);
}

export { passport };

export function protect(req: Request, res: Response, next: NextFunction) {
    if (req.method === 'OPTIONS') {
        return res.send();
    }
    if (!req.user) {
        res.status(400).send({ message: 'Not Logged In' });
    } else {
        next();
    }
}
