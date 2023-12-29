const { getCardById } = require('./database/cards.dbtype.middleware');
const { getUserById } = require('./database/users.dbtype.middleware');
const handleError = require('../middleware/errorHandler.middleware');

const checkIsOwner = async (res, next, idUser, idCard) => {
	try {
		const cardData = await getCardById(idCard);
		console.log(cardData.user_id.toHexString());
		console.log(idUser);
		if (!cardData) {
			handleError(res, 'card not found', 400);
		}
		if (cardData.user_id.toHexString() === idUser) {
			return next();
		} else {
			handleError(res, 'not authorized', 401);
		}
	} catch (err) {
		handleError(res, err.message, 401);
	}
};

const checkIsUser = async (res, next, idToken, idParam) => {
	try {
		const userData = await getUserById(idToken);
		if (!userData) {
			handleError(res, 'user not found', 400);
		}
		if (userData._id.toHexString() === idParam) {
			return next();
		} else {
			handleError(res, 'not authorized', 401);
		}
	} catch (err) {
		handleError(res, err.message, 401);
	}
};

const permissionsMiddleware = (isAdmin, isBiz, isOwner) => {
	return (req, res, next) => {
		if (!req.userData) {
			handleError(res, 'must provide userData', 400);
		}
		if (isBiz && req.userData.isBiz) {
			return next();
		}
		if (isAdmin && req.userData.isAdmin) {
			return next();
		}
		if (isOwner) {
			if (req.baseUrl.includes('cards')) {
				return checkIsOwner(res, next, req.userData._id, req.params.id);
			} else {
				return checkIsUser(res, next, req.userData._id, req.params.id);
			}
		}
		handleError(res, 'you are not allowed to do that action', 401);
	};
};

module.exports = permissionsMiddleware;
