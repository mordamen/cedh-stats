import handleError from '../middleware/errorHandler.middleware';

const checkIsUser = async (res: any, next: () => any, idToken: any, idParam: any) => {
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
	} catch (error: any) {
		handleError(res, error.message, 401);
	}
};

const permissionsMiddleware = (isAdmin: boolean, isBiz: boolean, isOwner?: boolean) => {
	return (
		req: { userData: { isBiz: any; isAdmin: any; _id: any }; baseUrl: string | string[]; params: { id: any } },
		res: any,
		next: () => any
	) => {
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
			return checkIsUser(res, next, req.userData._id, req.params.id);
		}
		handleError(res, 'you are not allowed to do that action', 401);
	};
};

// module.exports = permissionsMiddleware;
export default permissionsMiddleware;
