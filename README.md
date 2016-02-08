# lerna-run
run command in each packages of monorepo ([lerna](https://www.npmjs.com/package/lerna))

- https://github.com/shokai/lerna-run
- https://npmjs.com/package/lerna-run

[![Circle CI](https://circleci.com/gh/shokai/lerna-run.svg?style=svg)](https://circleci.com/gh/shokai/lerna-run)


## Install

    % npm i lerna-run -g


## Use
move into each directories, and execute command.

### serial

    % lerna-run ls
    % lerna-run babel src/ --out-dir lib/

### parallel

    % lerna-run --parallel babel src/ --out-dir lib/ --watch
