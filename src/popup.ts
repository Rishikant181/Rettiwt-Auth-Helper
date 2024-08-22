// Handles click event for getting API-Key
document.getElementById('get-api-key')!.addEventListener('click', () => {
	browser.runtime
		.sendMessage({ action: 'getCookies' })
		.then((response: { success: boolean; key: string }) => {
			// Getting the output area
			const output = document.getElementById('api-key-output')!;

			if (response.success) {
				output.textContent = response.key;
			} else {
				output.textContent = 'Failed to get API-key! Please try again.';
			}
		})
		.catch((err) => console.log(err));
});

// Handles copying the API-Key using the button
document.getElementById('copy-api-key')!.addEventListener('click', () => {
	navigator.clipboard
		.writeText((document.getElementById('api-key-output') as HTMLInputElement).value)
		.catch((err) => console.log(err));
});
