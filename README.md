# Wild Leek
A simple package that checks if a password is on a list of the 10,000 most common passwords.

No network requests are made.

# Usage
```javascript
const passwordInTheWild = require('wildleek');

// In an async function
async function registerUser(username, password) {
    if(await passwordInTheWild(password)) {
        console.error("The password provided is too common to be used safely");
        return false;
    } else {
        // Allow user to use password
    }
}

// Using callbacks
passwordInTheWild("password123").then(wild => {
    if(wild) {
        console.error("The password provided is too common to be used safely");
    } else {
        // Allow user to use password
    }
});
```
The `passwordInTheWild(password)` function returns a promise that resolves to `true` if the password
is on the top list and `false` if it is not.

# Implementation
`passwordInTheWild(password)` loads an alphabetized list of the 10,000 most common passwords into an array 
when the function is first called. It then performs a binary search to check if the given password is in the array.

The array is kept in memory (The file is 74.7 KB).
The first password check takes about 27ms on my budget machine.
The second password check takes under 1ms. The main expense of the package is the time spent
loading the file into memory. After it's loaded checking a password is quick.

# Disclaimer
This package is intended for server-side password strength checks. 
This package will not make your security invincible. An attacker might be able to deduce that
your software uses this package, and avoid using the passwords in the list when trying to
brute force their way into your application. The best way to view this package is as an
encouragement to make your users be creative with their passwords.

I am not a security professional and recommend that all mission critical software be vetted by a
competent one before entering production.

# Credits
The current password list is 
the [Top 10,000 Passwords](https://github.com/danielmiessler/SecLists/blob/master/Passwords/Common-Credentials/10-million-password-list-top-10000.txt) (MIT LICENSE).
according to [Daniel Miessler's SecLists](https://github.com/danielmiessler/SecLists).
See relevant license file in /passwords subdirectory. 
It has been alphabetized so it can be binary searched, and a newline has been added so that a blank
password is marked wild.

The only npm dependency is [binary-search](https://github.com/darkskyapp/binary-search).