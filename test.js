const passwordInTheWild = require('.');

// Can't have top level await calls...
(async function tests() {
        console.log("'Wild' means the password is on the list of top 10,000 common passwords.");
        console.log("'Tame' means the password is not on the list.");
        console.log();

        // node test.js --eager
        if (process.argv[2] === "--eager") {
            const eagerStart = Date.now()
            await passwordInTheWild.eagerLoadPasswords();
            const eagerEnd = Date.now();

            console.log(`Passwords eagerly loaded in ${eagerEnd-eagerStart} ms`);
            console.log();
        }

        const start = Date.now();
        let testCount = 0;
        let successfulCount = 0;
        let failedCount = 0;

        async function tester(password, isWild) {
            const testStart = Date.now();
            let markedWild = await passwordInTheWild(password);
            const testEnd = Date.now();
            testCount++;
            if (markedWild === isWild) {
                successfulCount++;
                console.log("Passed: " + (isWild ? "Wild" : "Tame") +
                    ` password '${password}' marked ` + (markedWild ? "wild" : "tame")
                    + ` (${testEnd - testStart} ms)`);
            } else {
                failedCount++;
                console.error("!! Failed: " + (isWild ? "Wild" : "Tame") +
                    ` password '${password}' marked ` + (markedWild ? "wild" : "tame")
                    + ` (${testEnd - testStart} ms)`);
            }
        }

        const firstTestStart = Date.now();
        await tester("password", true);
        const firstTestEnd = Date.now();
        const secondTestStart = Date.now();
        await tester("password", true);
        const secondTestEnd = Date.now();
        await tester("Thank you for checking out this npm package", false);
        await tester("hithere", true);
        await tester("hello", true);
        await tester("", true);
        await tester("Good123654", true);
        await tester("this project is cool right", false);
        await tester("action", true);
        await tester("gadget", true);
        await tester("*****", true);
        await tester("thereisNOwaythisisonthelist", false);
        await tester("00000000adsfadsf00", false);
        await tester("hihdafso;hoadfs", false);
        await tester("           ", false);
        await tester("testtesttesttest21342q34", false);
        const end = Date.now();

        console.log();
        console.log(`${testCount} passwords tested in ${end - start} ms`);
        console.log(`${successfulCount} successful tests, ${failedCount} failed tests`);
        console.log();

        if (failedCount > 0) {
            console.error("Testing Failed");
        } else {
            console.log("All tests passed");
        }
    }
)();