const router = require('express').Router();
const mainController = require('../controllers/mainController');

router.get('/', mainController.index);

router.get('/sign-up', mainController.sign_up_get);

router.post('/sign-up', mainController.sign_up_post);

router.get('/log-in', (req, res) => {
  res.send('log-in');
});

router.post('/log-in', (req, res) => {
  res.send('logged in!');
});

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

router.get('/log-out', (req, res) => {
  res.send('Logged out!');
});

module.exports = router;
