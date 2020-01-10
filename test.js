// This is a simple test file, I'm currently inexperienced in writing them for node
// I'll use a real test library in the future

(async function tests() {
        console.log("'Wild' means the password is on the list of top 10,000 common passwords.");
        console.log("'Tame' means the password is not on the list.");
        console.log();

        const start = Date.now();
        const passwordInTheWild = require('.'); // require the package we're in
        let testCount = 0;
        let successfulCount = 0;
        let failedCount = 0;

        async function tester(password, isWild) {
            let markedWild = await passwordInTheWild(password);
            testCount++;
            if (markedWild === isWild) {
                successfulCount++;
                console.log("Passed: " + (isWild ? "Wild" : "Tame") + ` password '${password}' marked ` + (markedWild? "wild" : "tame"));
            } else {
                failedCount++;
                console.error("!! Failed: " + (isWild ? "Wild" : "Tame") + ` password '${password}' marked ` + (markedWild ? "wild" : "tame"));
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
        console.log(`${successfulCount} successful tests, ${failedCount} failed tests`)
        console.log(`The first test (with 'password') took ${firstTestEnd - firstTestStart} ms`);
        console.log(`The second test (also with 'password') took ${secondTestEnd - secondTestStart} ms`);
        console.log();

        if(failedCount>0) {
            console.error("Tests failed");
        } else {
            console.log("Tests passed");
        }
    }
)();