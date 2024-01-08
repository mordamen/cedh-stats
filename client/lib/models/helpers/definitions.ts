// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.

type User = {
	id: string;
	name: {
		first: string;
		middle: string;
		last: string;
	};
	email: string;
	password: string;
	image: {
		url: string;
		alt: string;
	};
	isAdmin: boolean;
	isBusiness: boolean;
	createdAt: Date;
};

export default User;
