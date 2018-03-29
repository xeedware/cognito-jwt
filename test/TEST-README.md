cognito-jwt Testing
=====================

# Overview

We use mocha for our testing framework.\
[https://www.npmjs.com/package/mocha]

For coverage testing we use the nyc npm package which includes
instanbul.\
[https://www.npmjs.com/package/nyc]

Because our tests are written in Typescript, we use the ts-node npm
package to compile our test spec files.\
[https://www.npmjs.com/package/ts-node]


# Setup

### Testing Specific Package Dependencies
Make sure the following packages have been installed.
They should be listed in the `devDependencies` section of the
`package.json` file:

- @types/chai
- @types/mocha
- @types/node
- chai\
  Assertions.
- mocha\
  JavaScript test framework for node.js.
- nyc\
  Instanbul command line interface used with mocha for test coverage
  analysis.
- ts-node\
  Typescript execution environment whose compiler is used with mocha
  to compile source and testcases written in Typescript.

To install:
```
$ npm i -D @types/chai @types/mocha @types/node chai mocha nyc ts-node
```

### test/mocha.opts
The following are added to the `mocha.opts` file to eliminate the need
to specify them on the command line:
```
--timeout 15s
--compilers ts-node/register
test/specs/**/*.spec.ts
```

# Test Execution
Testing can be performed via the command line or via the WebStorm IDE's
Run/Debug.


## Command Line
**_Note_**: Use this command line option for test coverage.

### Setup

#### package.json
Add the following to the scripts section of the package.json file:
```
    "test": "mocha",
    "testcov": "nyc --clean false mocha",
    "testcovnew": "nyc mocha"
```

### Execution

In a terminal and at the project root
```
$ npm run test
OR
$ npm run testcov
OR
$ npm run testcovnew
```
The **testcovnew** will "clean the slate" of coverage statistics
whereas **testcov** will accumulate stats.

## WebStorm

### Setup
In Webstorm:

1. Select Run > Edit Configurations...
2. Click on the "+" button and select Mocha from the dropdown list.
3. For `Name`, enter "Mocha Testing"
4. For `Extra Mocha Options`, leave blank since options specified in mocha.opts.
5. Check the "File patterns" radio button
6. For `Test file patterns`, enter "./test/specs/*.spec.ts"
7. Click the "OK" button.

### Execution

In the WebStorm toolbar, in the Run/Debug section:

1. Select "Mocha Testing" from the dropdown
2. Click on the run button (arrow) to run, or debug button (bug) to debug.

