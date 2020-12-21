const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../modules/auth');

router.get('/google', passport.authenticate('google', { scope: ['profile','email'] }));
router.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/auth/google',
}));


router.get('/user', (req,res)=>{ 
  res.send(req.user)
});
 

router.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
});

module.exports = router;