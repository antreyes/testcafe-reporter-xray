module.exports = function () {
    return {
      report: {
        info: [],
        tests: []
      },
  
      async reportTaskStart(startTime, userAgents) {
        currentInfo = {
          startDate: startTime,
          testEnvironments: userAgents
        };
        
      },
  
      async reportFixtureStart(name, path, meta) {
        await this.addMetadata(meta, currentInfo);
      },
  
      async reportTestStart (/* name, meta */) {
        currentTest = { start: new Date().toISOString()};
      },
  
      async reportTestDone(name, testRunInfo, meta) {
  
        this.addMetadata(meta, currentTest)
  
        let testStatus = "UNDEFINED";
        let currentEvidences = {};
  
  
        if(!testRunInfo.skipped && JSON.stringify(testRunInfo.errs).replace(/[[\]]/g,'').length > 0)
        {
          testStatus = "FAILED";
          currentTest.evidences = [];
  
          for (i in testRunInfo.screenshots)
          {
            currentEvidences.data = await this.base64_encode(testRunInfo.screenshots[i].screenshotPath);
            currentEvidences.filename = testRunInfo.screenshots[i].screenshotPath;
            currentEvidences.contentType = "image/png";
            currentTest.evidences.push(JSON.parse(JSON.stringify(currentEvidences)));
          }
        }
        else
        {
          testRunInfo = "Test executed without any error";
          testStatus = "PASSED";
        }
  
        await this.deleteUnusefulTestRunInfo(testRunInfo);
  
        currentTest.comment = testRunInfo;
        currentTest.status = testStatus;
        currentTest.finish = new Date().toISOString();
        this.report.tests.push(JSON.parse(JSON.stringify(currentTest)));
        currentTest = {};
      },
  
      async reportTaskDone(endTime) {
        currentInfo.finishDate = endTime;
        this.report.info.push(currentInfo);
        this.write(JSON.stringify(this.report, null, 2));
      },
      
      async base64_encode (file) {
      let base64 = Buffer.from(file).toString('base64');
      return base64;
      },
  
      async deleteUnusefulTestRunInfo(testRunInfo) {
        for (i in testRunInfo.errs)
        {
          delete testRunInfo.errs[i].callsite.stackFrames;
          delete testRunInfo.errs[i].callsite.isV8Frames;
        }
  
        delete testRunInfo.screenshots;
        delete testRunInfo.screenshotPath;
        delete testRunInfo.quarantine;
        delete testRunInfo.durationMs;
        delete testRunInfo.warnings;
        delete testRunInfo.skipped;
      },
  
      async addMetadata (meta, object) {
        for (var key in meta)
        {
          object[key]=meta[key];
        }
      }
    };
  };