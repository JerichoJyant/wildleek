const binary_search = require('binary-search');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

let passwordList = [];

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
            resolve();
        });
    });
}

async function passwordInTheWild(password) {
    if (passwordList.length === 0) {
        await loadPasswords();
    }
    const searchResult = binary_search(passwordList, password, (a, b) => a.localeCompare(b));
    return searchResult >= 0; // Negative values mean the item was not found in the array
}

module.exports = passwordInTheWild;