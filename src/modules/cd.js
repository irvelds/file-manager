import { resolve, sep } from 'path';
import { state, exitCommand, msg } from '../helpers.js';
import { stat } from 'fs/promises';

export const goToDir = async (arg) => {
    if (!arg) return
    if (arg.endsWith(':') && sep === "\\") {
        arg += '\\';
    }
    const targetPath = resolve(state.currentDir, arg);
    try {
        const isDirectory = (await stat(targetPath)).isDirectory();

        if (!isDirectory) {
            console.log('Path not a directory');
            console.log(msg.OPERATION_FAILED);
            return
        }
        state.currentDir = targetPath;
    } catch (err) {
        console.log(msg.OPERATION_FAILED, err);
    }
    finally {
        exitCommand();
    }
}