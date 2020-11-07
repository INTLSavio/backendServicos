import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

// Caminho da pasta que salva os avatares
const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
    directory: tmpFolder,

    // Seta para os arquivos serem salvos no disco da própria máquina
    storage: multer.diskStorage({
        destination: tmpFolder,
        filename(request, file, callback) {
            const fileHash = crypto.randomBytes(10).toString('hex');
            const fileName = `${fileHash}-${file.originalname}`;

            return callback(null, fileName);
        },
    }),
};
