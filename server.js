import express from 'express';
import { fileURLToPath } from 'url';
import { join ,dirname} from 'path';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// eslint-disable-next-line no-undef
app.use(express.static(join(__dirname, '/dist')));

// eslint-disable-next-line no-undef
app.listen(process.env.PORT || 5000, () => {
  console.log('Server is running...');
});