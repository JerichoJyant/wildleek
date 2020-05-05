const binary_search = require('binary-search');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// All 10,001 (empty string is the plus one) passwords
let passwordList = [];
// If passwordInTheWild() gets called more than once,
// we need to prevent loading the list more than once
let loadingPromise = null;

function loadPasswords() {
    // Have we started loading?
    if (loadingPromise === null) {
        // Cross-platform
        const passwordsFilePath = path.join(__dirname, 'passwords', '10-million-password-list-top-10000_ALPHABETIZED.txt');
        // This is only created once, scoped to the module, not this function
        loadingPromise = new Promise(
            (resolve, reject) => {
                const rl = readline.createInterface({
                    input: fs.createReadStream(passwordsFilePath),
                    crlfDelay: Infinity // \r\n -- See readline docs
                });

                rl.on('line', (line) => {
                    // New password read from file
                    passwordList.push(line);
                });

                rl.on('close', () => {
                    // End of file, passwords are loaded, resolve promise
                    resolve();
                });
            });
    }
    // Returns the same object no matter when this function is called
    // loadPasswords() is returning loadingPromise from module scope,
    // but loadingPromise gets its value from this function.
    return loadingPromise;
}

async function passwordInTheWild(password) {
    await loadPasswords();
    const searchResult = binary_search(passwordList, password, (a, b) => a.localeCompare(b));
    return searchResult >= 0; // Negative values mean the item was not found in the array
}

passwordInTheWild.eagerLoadPasswords = loadPasswords;

module.exports = passwordInTheWild;