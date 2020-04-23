const binary_search = require('binary-search');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

let passwordList = [];
let passwordListLoaded = false;
let passwordLI
function loadPasswords() {
    const passwordsFilePath = path.join(__dirname, 'passwords', '10-million-password-list-top-10000_ALPHABETIZED.txt');
    return new Promise((resolve, reject) => {
        const rl = readline.createInterface({
            input: fs.createReadStream(passwordsFilePath),
            crlfDelay: Infinity
        });

        rl.on('line', (line) => {
            passwordList.push(line);
        });

        rl.on('close', () => {
            passwordListLoaded = true;
            resolve();
        });
    });
}

async function passwordInTheWild(password) {
    if(!passwordListLoaded) {
        await loadPasswords();
    }
    const searchResult = binary_search(passwordList, password, (a, b) => a.localeCompare(b));
    return searchResult >= 0; // Negative values mean the item was not found in the array
}

passwordInTheWild.eagerLoadPasswords = loadPasswords;

module.exports = passwordInTheWild;