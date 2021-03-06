# testcafe-reporter-xray
[![Build Status](https://travis-ci.org/antreyes/testcafe-reporter-xray.svg)](https://travis-ci.org/antreyes/testcafe-reporter-xray)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

This is the **xray** reporter plugin for [TestCafe](http://devexpress.github.io/testcafe).

<p align="center">
    <img src="./media/preview.png" alt="preview" />
</p>

## Install :construction:

```
npm install testcafe-reporter-xray
```

## Usage :wrench:

When you run tests from the command line, specify the reporter name by using the `--reporter` option:

```
testcafe chrome 'path/to/test/file.js' --reporter xray
```


When you use API, pass the reporter name to the `reporter()` method:

```js
testCafe
    .createRunner()
    .src('path/to/test/file.js')
    .browsers('chrome')
    .reporter('xray') // <-
    .run();
```

## Author 
Antonio REYES (https://github.com/antreyes)
