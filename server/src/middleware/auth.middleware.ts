const { verifyToken } = require('../utilities/token');
import handleError from '../middleware/errorHandler.middleware';

const authMiddleware = async (req: { headers: { [x: string]: any }; userData: any }, res: any, next: () => void) => {
	try {
		if (!req.headers['auth-token']) {
			handleError(res, 'please provide token', 401);
		} else {
			const userData = await verifyToken(req.headers['auth-token']);
			req.userData = userData;
			next();
		}
	} catch (error) {
		handleError(res, (error as Error).message, 401);
	}
};

module.exports = authMiddleware;
