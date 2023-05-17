# EOLANG to JavaScript Transpiler

## Description

Transpiler is a type of translator that takes the source code of a program written in a programming language as its input and produces an equivalent source code in the same or a different programming language.

We have made an analogue to https://github.com/objectionary/eo2py transpiler. But it translate EOLANG code into JavaScript.

## How to use:

*After clonning:*

`cd eo2xml && mvn install` — install mvn dependencies 

`cd ../ && npm ci` — install npm dependencies 

*Usage:*

`ts-node src/index.ts <file.eo>` — generates translated js file

`node <file.js>` — run translated js file

## Supported features:

- Abstraction
- Decoration
- Dataization
- Inner objects
- `@` with free attributes

## Unsupported features:

- Positional application
- Dataize Once (`!`)
- Regexes
- Partial application
- Varargs
- Arrays

## Atoms:

- bool
    - .if
    - .and | .or
    - .not
- num
    - arithmetics: .add | .sub | .mul | .div
    - comparisons: .lt | .lte | .gt | .gte | .eq
    - .neg
- string
    - .length
    - .add
- seq