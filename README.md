# Cron Expression Parser

This is a simple CRON Expression parser implementation. This utility will parse a CRON string and expands each field to
show the times at which it will run.

## System Requirements

node >= v10

## Usage

Assuming yarn is preinstalled

with yarn:

```bash
yarn install # (or yarn) to install dependencies for tests
yarn start "CRON_EXPRESSION PATH_TO_COMMAND" # Example yarn start "*/15 0 1,15 * 1-5 /usr/bin/find"
yarn test # To run tests
```

## Assumptions, Limitations and Some Improvements

- All Calendar months are assumed to have 31 days.
- All String Formats for Months and Days are case sensitive, ideally they must be case-insensitive
- Some Special Characters like `#` and `?` are not supported
- Input validation and Error Handling can be improved
- Unit Tests are only inlcuded for one handler because of time constraints. Need to write more tests
- Need to Add Integration tests to test for final response
- Result Format is hardcoded in the current implementation, but wit will be better if we accept it as a template and fill it accordingly.
