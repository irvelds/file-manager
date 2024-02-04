import { readCommands } from './modules/commands.js';
import { getUseName, state } from './helpers.js';

const start = () => {
    process.chdir(state.currentDir);
    getUseName();
}

start();
readCommands();