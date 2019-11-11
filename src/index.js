let testStartDate = new Date('1970-01-01');

let currentInfo = {};

let currentTest = {};

module.exports = function () {
    return {
        report: {
            info:  [],
            tests: []
        },

        async reportTaskStart (startTime, userAgents) {
            currentInfo = {
                startDate:        startTime,
                testEnvironments: userAgents
            };
        },

        async reportFixtureStart (name, path, meta) {
            await this.addMetadata(meta, currentInfo);
        },

        async reportTestStart ( /* name, meta */ ) {
            testStartDate = new Date();
            currentTest = {
                start: new Date(testStartDate).toISOString()
            };
        },

        async reportTestDone (name, testRunInfo, meta) {
            this.addMetadata(meta, currentTest);
            let testStatus = 'UNDEFINED';
            const currentEvidences = {};

            const testFinishDate = new Date(testStartDate.getTime() + testRunInfo.durationMs).toISOString();

            if (!testRunInfo.skipped && JSON.stringify(testRunInfo.errs).replace(/[[\]]/g, '').length > 0) {
                testStatus = 'FAILED';
                currentTest.evidences = [];

                for (var i in testRunInfo.screenshots) {
                    currentEvidences.data = await this.base64Encode(testRunInfo.screenshots[i].screenshotPath);
                    currentEvidences.filename = testRunInfo.screenshots[i].screenshotPath;
                    currentEvidences.contentType = 'image/png';
                    currentTest.evidences.push(JSON.parse(JSON.stringify(currentEvidences)));
                    this.deleteUnusefulTestRunInfo(testRunInfo);
                }
            }
            else {
                testRunInfo = 'Test executed without any error';
                testStatus = 'PASSED';
            }      
            currentTest.comment = testRunInfo;
            currentTest.status = testStatus;
            currentTest.finish = testFinishDate;
            this.report.tests.push(JSON.parse(JSON.stringify(currentTest)));
            currentTest = {};
        },

        async reportTaskDone (endTime) {
            currentInfo.finishDate = endTime;
            this.report.info.push(currentInfo);
            this.write(JSON.stringify(this.report, null, 2));
        },

        async base64Encode (file) {
            const base64 = Buffer.from(file).toString('base64');

            return base64;
        },

        async deleteUnusefulTestRunInfo (testRunInfo) {
            for (var i in testRunInfo.errs) {
                if ('stackFrames' in testRunInfo.errs[i].callsite) delete testRunInfo.errs[i].callsite.stackFrames;
                if ('isV8Frames' in testRunInfo.errs[i].callsite) delete testRunInfo.errs[i].callsite.isV8Frames;
            }

            delete testRunInfo.screenshots;
            delete testRunInfo.screenshotPath;
            delete testRunInfo.quarantine;
            delete testRunInfo.durationMs;
            delete testRunInfo.durationMs;
            delete testRunInfo.warnings;
            delete testRunInfo.skipped;
        },

        async addMetadata (meta, object) {
            for (var key in meta) object[key] = meta[key];
        }
    };
};
