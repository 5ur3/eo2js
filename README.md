# EOLANG to JavaScript Transpiler

## Description

Transpiler is a type of translator that takes the source code of a program written in a programming language as its input and produces an equivalent source code in the same or a different programming language.

We have made an analogue to https://github.com/objectionary/eo2py transpiler. It takes a code written in EOLANG and translate it to JavaScript.

## How to use

*First run:*

`cd eo2xml && mvn install` — install mvn dependencies 

`cd ../ && npm ci` — install npm dependencies 

*Other:*

`ts-node src/index.ts` — run transpiler