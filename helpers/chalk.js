const chalk = require('chalk');

export function info(message) {
  console.log(chalk.cyan(message));
}

export function success(message) {
  console.log(chalk.green(message));
}

export function warning(message){
  console.warn(chalk.yellow(message))
}
