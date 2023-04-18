const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();

router.get('/',adminController.admin_index);
router.get('/adminlogin',adminController.admin_login);
router.post('/adminlogin',adminController.admin_login_post);
router.get('/menu',adminController.admin_menu);
router.get('/addabook',adminController.admin_addabook_get);
router.post('/addabook', adminController.admin_addabook_post);
router.get('/browser/viewallbooks',adminController.admin_browser_viewallbooks);
router.get('/removeabook',adminController.admin_removeabook_get);
router.get('/:bookid/delete',adminController.admin_delete);
router.get('/checkstock',adminController.admin_checkstock);
router.get('/vieworder',adminController.admin_vieworder);
router.get('/viewfeedback',adminController.admin_viewfeedback);
router.get('/home',adminController.admin_home);
router.get('/signout',adminController.admin_signout);
//router.get('/browser/bookid',adminController.admin_browser_bookid);
//router.get('/browser/bookid/addtocart',adminController.admin_browser_bookid_addtocart);

module.exports = router;