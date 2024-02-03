import { resolve, basename } from 'path';
import { mkdir, unlink } from 'fs/promises';
import { state, exitCommand, isExistPath, msg } from '../helpers.js';
import { createReadStream, createWriteStream } from 'fs';

const getArgs = (args) => {
    const argsArray = [];
    let joinPath = '';
    args.split(' ')
        .forEach((arg) => {
            if (!arg) return;
            return argsArray.push(arg);
        });

    if (argsArray.length > 2) {
        joinPath = argsArray.join(' ').slice(argsArray[0].length + 1);
    }
    else joinPath = argsArray[1];
    return { argsArray, joinPath }
};


export const copyFile = async (args, mv = false) => {

    const argsArray = getArgs(args).argsArray;
    const joinPath = getArgs(args).joinPath;

    if (!argsArray[1]) {
        console.log(msg.INVALID_INPUT);
        exitCommand();
        return
    }

    const currentFilePath = resolve(state.currentDir, argsArray[0]);
    const targetFileName = basename(currentFilePath);
    const targetFolderName = resolve(state.currentDir, joinPath);
    const newFilePath = resolve(state.currentDir, joinPath, targetFileName);

    try {
        if (!(await isExistPath(currentFilePath))) {
            console.log('No such file exists');
            console.log(msg.OPERATION_FAILED);
            return
        }
        if (await isExistPath(newFilePath)) {
            console.log('File already exist in this folder');
            console.log(msg.OPERATION_FAILED);
            return
        }
        if (!(await isExistPath(targetFolderName))) {
            await mkdir(targetFolderName, { recursive: true })
        }
        await new Promise((resolve, reject) => {
            const readStream = createReadStream(currentFilePath);
            readStream.on('error', (err) => reject(err))
                .on('close', () => resolve());
            const writeStream = createWriteStream(newFilePath);
            writeStream.on('error', (err) => reject(err))
                .on('close', () => resolve());
            readStream.pipe(writeStream);
            readStream
                .on('end', async () => {
                    if (mv)
                        await unlink(currentFilePath);
                });
        });
    } catch(err) {
        console.log(msg.OPERATION_FAILED, err);
    }
    finally {
        exitCommand();
    }
}
