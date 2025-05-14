import { Command } from "commander";

const program = new Command();
let ctr = 1;

program
    .name('Todo List')
    .description('Takes tasks and store it in a todo list')
    .version('0.0.1');

program.command('task')
    .description('logs todo task')
    .argument('string','task to do')
    .action((string) => {
        console.log(`${ctr}. ${string}`);
        ctr++;
    });

program.parse();
