var assert           = require('assert');
var normalizeNewline = require('normalize-newline');
var read             = require('read-file-relative').readSync;
var createReport     = require('./utils/create-report');

it('Should produce report with colors', function () {
    var report   = createReport(true);
    var expected = read('./data/report-with-colors');

    console.log(expected);
    report   = normalizeNewline(report).trim();
    expected = normalizeNewline(expected).trim();

    assert.strictEqual(report, expected);
});

it('Should produce report without colors', function () {
    var report   = createReport(false);
    var expected = read('./data/report-without-colors');

    console.log('WIHT: ' + expected);
    report   = normalizeNewline(report).trim();
    expected = normalizeNewline(expected).trim();

    assert.strictEqual(report, expected);
});
