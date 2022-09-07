const router = require('express').Router();
const mainController = require('../controllers/mainController');

router.get('/', mainController.index);

router.get('/sign-up', mainController.sign_up_get);

router.post('/sign-up', mainController.sign_up_post);

router.get('/login', mainController.login_get);

router.post('/login', mainController.login_post);

router.get('/become-member', mainController.become_a_member_get);

router.post('/become-member', mainController.become_a_member_post);

router.get('/create-message', mainController.create_message_get);

router.post('/create-message', mainController.create_message_post);

router.get('/become-admin', mainController.become_admin_get);

router.post('/become-admin', mainController.become_admin_post);

router.get('/log-out', mainController.log_out_post);

module.exports = router;
