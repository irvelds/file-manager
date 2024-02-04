import { state, exitCommand, msg, getArgs } from '../helpers.js';
import { resolve, basename } from 'path';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import { stat } from 'fs/promises';

export const createBrotli = async (args, action = 'compress') => {

    const argsArray = getArgs(args).argsArray;
    const joinPath = getArgs(args).joinPath;

    if (!argsArray[1]) {
        console.log(msg.INVALID_INPUT);
        exitCommand();
        return
    }

    try {

        const currentFilePath = resolve(state.currentDir, argsArray[0]);
        const folderPath = resolve(state.currentDir, joinPath);

        let fileName =
        (action === 'compress')
            ? `${basename(currentFilePath)}.br`
            : `${basename(currentFilePath).slice(0, -3)}`;    

        const targetFolderPath = resolve(state.currentDir, joinPath, fileName);

        if (!(await stat(folderPath)).isDirectory()) {
            console.log('Destination should be a folder');
            console.log(msg.OPERATION_FAILED);
            return
        }
        if (!(await stat(currentFilePath)).isFile()) {
            console.log('Source should be a file');
            console.log(msg.OPERATION_FAILED);
            return
        }

        let brotliZip =
        (action === 'compress')
            ? createBrotliCompress()
            : createBrotliDecompress();

        const readStream = createReadStream(currentFilePath);
        const writeStream = createWriteStream(targetFolderPath);
        readStream.pipe(brotliZip).pipe(writeStream);

    } catch {
        console.log(msg.OPERATION_FAILED);
    }
    finally {
        exitCommand();
    }
};