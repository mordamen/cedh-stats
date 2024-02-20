// import { verifyToken } from './token.middleware';
// import handleError from './errorHandler.middleware';

// export const authMiddleware = async (req, res, next) => {
// 	try {
// 		if (!req.headers['auth-token']) {
// 			handleError(res, 'please provide token', 401);
// 		} else {
// 			const userData = await verifyToken(req.headers['auth-token']);
// 			req.userData = userData;
// 			next();
// 		}
// 	} catch (error) {
// 		handleError(res, error.message, 401);
// 	}
// };
