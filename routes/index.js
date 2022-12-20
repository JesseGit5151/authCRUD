const router = require('express').Router();
const connection = require('../config/database');
const User = connection.models.User;


/**
 * -------------- POST ROUTES ----------------
 */

//User enters login information
router.post('/login', async (req, res) => {

})
//Hash n Salt process
router.post('/register', async (req, res) => {
    
})
//
router.post('/gallery', async (req, res) => {
    
})
/**
 * -------------- GET ROUTES ----------------
 */

//Home Page(Welcome)
router.get('/', async (req, res) => {

})
//Login Pgae
router.get('/login', async (req, res) => {

})
//Register Page
router.get('/register', async (req, res) => {

})
//User Form Page
router.get('/form', async (req, res) => {

})
//Gallery Page
router.get('/gallery', async (req, res) => {

})
//Logout Page
router.get('/logout', async (req, res) => {

})


/**
 * -------------- DELETE ROUTE ----------------
 */

//Logout Page
router.delete('gallery/:id', async (req, res) => {

})

module.exports = router;