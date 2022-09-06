const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/sign-up', (req, res) => {
  res.send('sign-up');
});

router.post('/sign-up', (req, res) => {
  res.send('signed up');
});

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
