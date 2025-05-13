// Create a command line interface that lets the 
// user specify a file path and the nodejs process
//  counts the number of words inside it.

// Input - node index.js /Users/kirat/file.txt
// Output - You have 10 words in this file

 

// const { program } = require('commander');

import { program } from 'commander';
import fs from 'fs';

program
    .option('-w, --words','number of words')
    .argument('<file>','file where text is present'); // provide file path(string) but as an array.

program.parse();

const options = program.opts();
const content = fs.readFile(program.args[0], 'utf-8', (err,data) => {
    if(err){
        console.log(err);
    } else {
        let contentArr = data.split(" ");
        console.log(`You have ${contentArr.length} words in this file`);
    }
} );

