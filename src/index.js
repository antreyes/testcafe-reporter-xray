/* eslint-disable prettier/prettier */
/* eslint-disable newline-after-var */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable keyword-spacing */
/* eslint-disable indent */
/* eslint-disable prettier/prettier */
module.exports = function () {
    return {

        report: {
            info:  [],
            tests: [],       
        },

        async reportTaskStart (startTime, userAgents, testCount) {
            this.currentInfo = { startDate: startTime, testEnvironments: userAgents, testCount: testCount };
            this.report.info.push(this.currentInfo);
        },

        async reportFixtureStart (name, path, meta) {
            console.log("hola");
            console.log(meta);
            console.log("adios");
            console.log(path);
            console.log("hasta luego");
            console.log(name);
            console.log("bye");
        },

        async reportTestDone (testKey, start, status, comment, evidences, examples, steps) {
            this.currentTest = { testKey: testKey, start: start, status: status, comment: comment, evidences: evidences, examples: examples, steps: steps };
            this.report.tests.push(this.currentTest);
        },

        async reportTaskDone (rm ) {
            this.write(JSON.stringify(this.report, null, 2));
        }
    };
};
