const URL = {
	type: String,
	match: [
		RegExp(
			/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
		),
		'Invalid URL format. URL should start with "http://" or "https://"',
	],
	trim: true,
};

const DEFAULT_STRING_SCHEMA = {
	type: String,
	maxLength: [256, 'Field must be at most 256 characters long'],
	trim: true,
};

const DEFAULT_STRING_SCHEMA_REQUIRED = {
	...DEFAULT_STRING_SCHEMA,
	minLength: [2, 'Field must be at least 2 characters long'],
	required: [true, 'Field is required'],
};

module.exports = {
	URL,
	DEFAULT_STRING_SCHEMA,
	DEFAULT_STRING_SCHEMA_REQUIRED,
};
