const express = require ('express') ; // 1. load the Express framework module
const router= express.Router();
const userController = require('../controllers/userControllers')

router.get('/', userController.getAllUsers ) ;
router.get('/:id', userController.getUserById ) ;
router.post('/', userController.createUser ) ;
router.put('/:id', userController.updateUser ) ;
router.delete('/:id', userController.deleteUser ) ;
module.exports = router ;
