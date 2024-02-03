import readlinePromises from 'readline/promises';
import { exitCommand, state, exitProgram, msg } from '../helpers.js';
import { lsFiles } from './ls.js';
import { goToDir } from './cd.js';
import { goToUpDir } from './up.js';

export const readCommands = () => {
  const rl = readlinePromises.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on('SIGINT', () => {
    exitProgram(state.userName);
  });

  rl.on('line', async (line) => {
    const spaceIndex = line.indexOf(' ');
    let args =
      (spaceIndex !== -1)
        ? line.slice(spaceIndex).trim()
        : false;
    const command = line.slice(0, spaceIndex);
    if (['cd'].includes(command)){
        switch (command) {
            case 'cd':
                await goToDir(args);
                break;
        }
    }
    if (['up', 'ls', '.exit'].includes(line)) {
      switch (line) {
        case 'cd':
            await goToDir(args);
            break;
        case 'up':
          await goToUpDir();
          break;
        case 'ls':
          await lsFiles();
          break;
        case '.exit':
          exitProgram(state.userName);
          break;
        default:
          console.log(msg.INVALID_INPUT);
          exitCommand();
      }
    }
  });

};