import { resolve } from 'path';
import { rm } from 'fs/promises';
import { state, exitCommand, msg } from '../helpers.js';
export async function removeFile(arg) {
    const currentFilePath = resolve(state.currentDir, arg);
    try {
        await rm(currentFilePath);
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.log('No such file or directory');
        }
        console.log(msg.OPERATION_FAILED);
    }
    finally {
        exitCommand();
    }
}