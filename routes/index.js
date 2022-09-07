const router = require('express').Router();
const mainController = require('../controllers/mainController');

router.get('/', mainController.index);

router.get('/sign-up', mainController.sign_up_get);

router.post('/sign-up', mainController.sign_up_post);

router.get('/login', mainController.login_get);

router.post('/login', mainController.login_post);

router.get('/become-a-member', (req, res) => {
  res.send('become a member');
});

router.post('/become-a-member', (req, res) => {
  res.send('You are now a member!');
});

router.get('/become-an-admin', (req, res) => {
  res.send('become an admin');
});

router.post('/become-an-admin', (req, res) => {
  res.send('You are now an admin!');
});

router.get('/log-out', mainController.log_out_post);

module.exports = router;
