let currentTest = {};

let currentInfo = {};

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
            for (var key in meta) 
                currentInfo[key] = meta[key];
            
        },
  
        async reportTestStart (/* name, meta */) {
            currentTest = { start: new Date().toISOString() };
        },
  
        async reportTestDone (name, testRunInfo, meta) {
            let testStatus = 'UNDEFINED';

            if (!testRunInfo.skipped && JSON.stringify(testRunInfo.errs).replace(/[[\]]/g, '').length > 0) {
                testStatus = 'FAILED';
                delete testRunInfo.errs[0].callsite.stackFrames;
            }
            else 
                testStatus = 'PASSED';
            
            for (var key in meta) 
                currentTest[key] = meta[key];
            
  
            currentTest.comment = testRunInfo;
            currentTest.status = testStatus;
            currentTest.finish = new Date().toISOString();
            this.report.tests.push(JSON.parse(JSON.stringify(currentTest)));
            currentTest = {};
  
        },
      
  
        async reportTaskDone (endTime) {
            currentInfo.finishDate = endTime;
            this.report.info.push(currentInfo);
            this.write(JSON.stringify(this.report, null, 2));
        },
      
  
    };
};
