const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../modules/auth/google')(passport);


const isValidUser = (req,res,next) => {
  if(req.isAuthenticated()) next();
  else return res.status(401).json({message:"You're not logged in"});
}


// Local authentication and register

const register = async (req, res) => {

  const { displayName, email, password, password2} = req.body;
  let errors = [];
  if (!displayName || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (undefined !== password && password.length < 8) {
    errors.push({ msg: 'Password must be at least 8 characters' });
  }

  if (errors.length > 0) {
    res.status(400).json(errors);
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });

        res.status(409).json(errors);
      } else {
          const user = new User({
            email: email,
            displayName: displayName,
            password: User.hashPassword(password)
          }).save();
          return res.status(201).json({msg: 'Resgistration success'});
        }
      })
    }
}

router.post('/register', (req, res, next) => {
  register(req, res);
});



router.post('/login', (req,res,next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { return res.status(501).json(err); }
    if (!user) { return res.status(501).json(info); }
    req.logIn(user, function(err) {
      if (err) { return res.status(501).json(err); }
      return res.status(200).json({message:'Login Success'});
    });
  })(req, res, next);
});

// Google authentication
router.get('/google', passport.authenticate('google', { scope: ['profile','email'] }));
router.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/auth/google',
}));


router.get('/user', isValidUser, (req,res)=>{ 
  return res.status(200).json(req.user);
});

router.get("/logout", isValidUser, async (req, res) => {
  await req.logout();
  res.redirect('/');
});

module.exports = router;