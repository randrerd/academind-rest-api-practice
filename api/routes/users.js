const express = require('express');
const router = express.Router();


const UsersControllers = require('../controllers/users') 

router.post('/signup', UsersControllers.users_create_one);

router.post('/login', UsersControllers.users_login);

router.delete('/:userId', UsersControllers.users_delete_one);

// router.delete('/', (req, res, next) => {
//   User.deleteMany({})
//     .exec()
//     .then((response) => {
//       res.status(200).json({
//         message: 'All users deleted',
//       });
//     })
//     .catch((err) => {
//       res.status(500).json({
//         error: err,
//       });
//     });
// });

module.exports = router;
