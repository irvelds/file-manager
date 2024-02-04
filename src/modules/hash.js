import { createHash } from 'crypto';
import { readFile } from "fs/promises"
import { state, exitCommand, msg } from '../helpers.js'
import { resolve } from 'path';
export const getHash = async (arg) => {
    try {
        const filePath = resolve(state.currentDir, arg);
        const contentFile = await readFile(filePath, 'utf8');
        const hash = createHash('sha256').update(contentFile);
        const digest = hash.digest('hex');
        console.log(digest);
    } catch (err) {
        console.error(msg.OPERATION_FAILED);
    }
    finally {
        exitCommand();
    }
};