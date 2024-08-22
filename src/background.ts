browser.runtime.onInstalled.addListener(() => {
	console.log('Rettiwt-Auth Helper installed!');
});

/**
 * The domain whose cookies are to be fetched.
 */
const domain = 'x.com';

/**
 * Gets cookies for x.com and stores them temporarily in local storage.
 */
async function getCookies(): Promise<string> {
	// Getting the cookies for the given domain
	let cookies = await browser.cookies.getAll({ domain: domain });

	// Filter out required cookies
	cookies = cookies.filter(
		(item) => item.name == 'auth_token' || item.name == 'ct0' || item.name == 'kdt' || item.name == 'twid',
	);

	/** Stores the API-Key */
	let key = '';

	// If all required cookies are present
	if (cookies.length == 4) {
		// Appending all cookies to a cookie string
		for (const { name, value } of cookies) {
			key += `${name}=${value};`;
		}

		// Encoding the cookies to base64 to get API-Key
		key = btoa(key);
	}

	return key;
}

// Listener for messages from popup
browser.runtime.onMessage.addListener((request: { action: string }, sender, respond) => {
	if (request.action === 'getCookies') {
		getCookies()
			.then((key) => {
				// If key generation was successful
				if (key.length) {
					respond({ success: true, key: key });
				}
				// If key generation failed
				else {
					throw new Error();
				}
			})
			.catch(() => respond({ success: false }));

		return true;
	}
});
