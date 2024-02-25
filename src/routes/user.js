const express = require('express');
const auth = require('../middleware/auth');

/*
 ** import controllers
 */
const CreateAccount = require('../controllers/users/CreateAccount');
const Login = require('../controllers/users/Login');
const Logout = require('../controllers/users/Logout');
const LogoutAllAccounts = require('../controllers/users/LogoutAllAccounts');
const Profile = require('../controllers/users/Profile');
const UpdateAccount = require('../controllers/users/UpdateAccount');
const DeleteAccount = require('../controllers/users/DeleteAccount');
const UploadAvatar = require('../controllers/users/UploadAvatar');
const DeleteAvatar = require('../controllers/users/DeleteAvatar');
const GetAvatar = require('../controllers/users/GetAvatar');

// utils
const errorMessage = require('../../utils/errors/message');

const router = express.Router();

router.post('/users', CreateAccount);
router.post('/users/login', Login);

router.use(auth);

router
	.get(userpreference)
	.patch(userpreference);
module.exports = router;