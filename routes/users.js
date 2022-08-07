const express = require('express');
const auth = require('../middleware/auth')
const _ = require('lodash')
const bcrypt = require('bcrypt');
const router = express.Router()
const {User, validate} = require('../models/user');

router.get('/', auth, async (req, res) => {
    const user = await User.find();
    return res.status(200).send(user);
})

// Register users

router.post('/',  async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email});
  if (user) return res.status(400).send('This user already exist');

  user = new User(_.pick(req.body, ['name', 'email', 'password']))

  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(user.password, salt)

  await user.save()

  const token = user.generateAuthToken()

  return res.header('x-auth-token', token).status(200).send({
    message: "New User registered",
    user: _.pick(user, ['name', 'email'])
  });
})

//Add user role, it should take in userid, and the role type
// google how to validate strings
//check the role type and update the right boolean type.

// function validateRole() {
//   const schema = {
//     user: 
//   }
// }

module.exports = router;