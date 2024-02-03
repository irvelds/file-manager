import { createReadStream } from 'fs';
import { resolve } from 'path';
import { state, exitCommand, msg } from '../helpers.js'
import { stat } from 'fs/promises';

export const readFile = async (arg) => {
    try {
        const filePath = resolve(state.currentDir, arg);
        const isFile = (await stat(filePath)).isFile();
        if (isFile) {
            const readFileStream = createReadStream(filePath);
            readFileStream.pipe(process.stdout);
            readFileStream.on("end", () => {
                console.log("");
                exitCommand();
            });
        }
        else {
            console.log('Path is not a file');
            console.log(msg.OPERATION_FAILED);
            exitCommand();
        }
    } catch {
        console.log(msg.OPERATION_FAILED);
        exitCommand();
    }
};
