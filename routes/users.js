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

router.post('/role', isadmin,  (req, res) => {
  const { roleType,  userid } = req.body

  if (roleType.toLowerCase() === 'admin') {
    User.updateOne({ _id: userid}, {$set: {isadmin: true}})
  }

  if (roleType.toLowerCase() === 'manager') {
    User.updateOne({ _id: userid}, {$set: {isManager: true}})
  }

  if (roleType.toLowerCase() === 'staff') {
    User.updateOne({_id: userid }, {$set: {isStaff: true}})
  }

  if (roleType.toLowerCase() === 'user') {
    User.updateOne({ _id: userid }, {$set: {isUser: true}})
  }

  res.status(200).send({Message: 'Role successfully added', status: true})
})

module.exports = router;