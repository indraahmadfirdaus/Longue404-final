const router = require('express').Router();
const UserController = require('../controllers/UserController');
const { userAuthentication } = require('../middlewares/auth');

router.route('/api/v1').get((req, res) => {
  res.send('connected !');
});

router.route('/api/v1/login').post(UserController.login);

router.route('/api/v1/register').post(UserController.register);

// route-route yang membutuhkan authentikasi (login)
router
  .route('/api/v1/users')
  .get(userAuthentication, UserController.findAllUser);
router
  .route('/api/v1/user')
  .get(userAuthentication, UserController.findLoggedUser)
  .put(userAuthentication, UserController.updateUser)
  .delete(userAuthentication, UserController.deleteUser);

router
  .route('/api/v1/users/:id')
  .get(userAuthentication, UserController.findById);

module.exports = router;
