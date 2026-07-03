import express from 'express'
import dotenv from 'dotenv'
import passport from 'passport'
dotenv.config()
const authRoutes=express.Router();
authRoutes.get('/github', passport.authenticate('github', { scope: [ 'user:email' ] }),)
authRoutes.get('/github/callback',passport.authenticate('github', { failureRedirect: process.env.CLIENT_URL + '/login' }),
  function(req, res) {
    res.redirect(process.env.CLIENT_URL);
  })

  authRoutes.get("/check", (req, res) => {
	if (req.isAuthenticated()) {
		res.send({ user: req.user });
	} else {
		res.send({ user: null });
	}
});

authRoutes.get("/logout", (req, res) => {
	req.session.destroy((err) => {
		res.json({ message: "Logged out" });
	});
});
export default authRoutes;