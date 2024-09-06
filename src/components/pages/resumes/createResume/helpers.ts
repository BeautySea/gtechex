export function convertArrayBufferToFileAndDownload(buffer: number[]) {
	const arrayBuffer = new Uint8Array(buffer).buffer;
	// Create a Blob from the ArrayBuffer
	const blob = new Blob([arrayBuffer], { type: 'application/octet-stream' });
	const rand = Math.round(Math.random() * 1000000).toString(16);
	// Create a File from the Blob
	const file = new File([blob], `resume_${rand}.pdf`, {
		type: 'application/pdf',
	});

	// Log the File object
	console.log(file);

	const a = document.createElement('a');
	const url = URL.createObjectURL(file);

	a.href = url;
	a.download = `resume_${rand}.pdf`;

	// Append the anchor to the body
	document.body.appendChild(a);

	// Simulate a click on the anchor
	a.click();

	// Clean up
	document.body.removeChild(a);
	window.URL.revokeObjectURL(url);
}

// convertArrayBufferToFileAndDownload(sampleBuffer);
