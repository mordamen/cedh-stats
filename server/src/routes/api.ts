import express from 'express'; // Import the 'express' package
const router = express.Router(); // Create an instance of the router

const usersRout = require('./users.router'); // Router for users
const cardsRout = require('./cards.router'); // Router for cards
const decksRout = require('./decks.router'); // Router for decks

//[ROUTE]/api/users/
router.use('/users', usersRout);

//[ROUTE]/api/cards
router.use('/cards', cardsRout);

//[ROUTE]/api/decks/
router.use('/decks', decksRout);

// router.use((req: Request, res: Response) => {
// 	res.status(404).send({ error: 'api not found' });
// });

module.exports = router;
