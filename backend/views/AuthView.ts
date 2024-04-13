import {Router} from "express";
import passport from "passport";

export const AuthView: Router = Router();

AuthView.get(
    '/auth/github',
    passport.authenticate('github')
);

AuthView.get(
    '/auth/github/callback',
    passport.authenticate('github', {failureRedirect: '/auth'}),
    (req, res) => res.redirect('/')
);