function normalizeColorIdentity(colorIdentity) {
	// Handle empty string or undefined input
	if (!colorIdentity) {
		return [];
	}
	console.log('before normalization: ', colorIdentity);
	// Convert string to uppercase and remove extra spaces
	colorIdentity = colorIdentity.toUpperCase().replace(/\s+/g, '');

	// Extract individual characters and validate
	const normalizedColors = colorIdentity.split('').filter((char) => {
		// Allow only single letters (A-Z)
		return char.match(/[A-Z]/);
	});

	// Enforce maximum length of 5 characters
	return normalizedColors.slice(0, 5);
}

module.exports = normalizeColorIdentity;
