const fs = require('fs');
const readline = require('readline');
const binary_search = require('binary-search');

let passwordsList;
export async function loadPasswords() {
    const rl = readline.createInterface({
        input: fs.createReadStream('./passwords/10-million-password-list-top-10000_ALPHABETIZED.txt'),
        crlfDelay: Infinity
    });

    rl.on('line', (line) => {
        passwordsList.push(line);
    });

    await once(rl, 'close');
}

async function passwordIsCommon(password) {
    if(!passwordsList) {
        await loadPasswords();
    }
    return !!binary_search(passwordsList, password, (a, b) => a.localeCompare(b));
}

export default passwordIsCommon;