import * as assert from "assert";
import * as shelljs from "shelljs";

const MODULE_GENERATION = [
    "CommonJS",
    "AMD",
    "System",
    "UMD",
    "ES6",
    "ES2015",
    "ESNext",
];

const TARGETS = [
    "ES5",
    "ES2015",
    "ES2016",
    "ES2017"
]

shelljs.exec("tsc --target 'ES5' --module 'None' --strict main.ts", { silent: true });
assert.ok(shelljs.error());
shelljs.exec("tsc --target 'ES5' --module 'None' main.ts", { silent: true });
assert.ok(shelljs.error());

for (const moduleGeneration of MODULE_GENERATION) {
    console.log(`Testing module generation: ${moduleGeneration}`);
    for (const target of TARGETS) {
        console.log(`  Building for ${target}`);
        for (const strict of [true, false]) {
            console.log(`    Strict mode: ${strict ? 'en' : 'dis'}abled`)
            const command = (
                `tsc` +
                ` --module '${moduleGeneration}'` +
                ` --experimentalDecorators` +
                ` --target '${target}'` +
                ` ${strict ? "--strict" : ""}` +
                ` main.ts`
            );
            const output = shelljs.exec(
                command,
                { silent: true },
            );
            let symbol;
            if (strict) {
                assert.ok(shelljs.error());
                symbol = '✖'
            } else {
                assert.strictEqual(0, output.code);
                symbol = '✓'
            }
            console.log(`      ${symbol} ${command}`);
        }
    }
}
