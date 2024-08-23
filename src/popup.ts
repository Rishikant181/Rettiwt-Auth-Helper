const getButton = document.getElementById('get-api-key')!;
const getButtonText = document.getElementById('get-api-key-text')!;
const copyButton = document.getElementById('copy-api-key')!;
const copyButtonText = document.getElementById('copy-api-key-text')!;

// Handles click event for getting API-Key
getButton.addEventListener('click', () => {
	browser.runtime
		.sendMessage({ action: 'getCookies' })
		.then((response: { success: boolean; key: string }) => {
			// Getting the output area
			const output = document.getElementById('api-key-output')!;

			if (response.success) {
				// Outputting API key
				output.textContent = response.key;

				// Chenging button text
				getButtonText.textContent = 'Generated!';
			} else {
				output.textContent = 'Failed to get API-key! Please login before trying again!';
			}
		})
		.catch((err) => console.log(err));
});

// Handles copying the API-Key using the button
copyButton.addEventListener('click', () => {
	navigator.clipboard
		.writeText((document.getElementById('api-key-output') as HTMLInputElement).value)
		.then(() => (copyButtonText.textContent = 'Copied!'))
		.catch((err) => console.log(err));
});
