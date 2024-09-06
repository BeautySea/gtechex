import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/*', function (_, res) {
	res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
	console.log(`listening on port ${PORT} on http://localhost:${PORT}`);
});
