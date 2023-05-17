# EOLANG to JavaScript Transpiler

## Description

Transpiler is a type of translator that takes the source code of a program written in a programming language as its input and produces an equivalent source code in the same or a different programming language.

This project transpiles EOlang to JavaScript

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
- num: int | float
    - arithmetics: .add | .sub | .mul | .div
    - comparisons: .lt | .lte | .gt | .gte | .eq
    - .neg
- string
    - .length
    - .add
- seq

## Examples:

-----
**EOLANG code #1**
```eolang
[t @] > tagged
  t > tag

[] > five
  tagged > @
    "five"
    5

seq > app
  five
  five.tag
```

<details>
<summary> JS generated `code` </summary>

```
const {int, float, boolTrue, boolFalse, string, seq} = require('./eolib')

const tagged = (t, _decoratee) => ({
  ...(() => ({
    ..._decoratee()
  }))(),
  tag: () => ({
    ...t()
  })
})

const five = () => ({
  ...(() => ({
    ...tagged(() => ({
      ...string("five")
    }), () => ({
      ...int(5)
    }))
  }))()
})

const app = () => ({
  ...seq(() => ({
    ...five()
  }), () => ({
    ...five().tag()
  }))
})

console.log(app().$_datarize())
```
</details>

**Output**
```
$ ts-node src/index.ts test.eo && node test.js
[5, "five"]
```
-----
**EOLANG code #2**
```eolang
5 > five
  $.add > doubled
    $

seq > app
  five
  five.doubled
```

<details>
<summary> JS generated `code` </summary>

```
const {int, float, boolTrue, boolFalse, string, seq} = require('./eolib')

const five = () => ({
    ...int(5),
    doubled: () => ({
        ...five().add(() => ({
            ...five()
        }))
    })
})

const app = () => ({
    ...seq(() => ({
        ...five()
    }), () => ({
        ...five().doubled()
    }))
})

console.log(app().$_datarize())
```
</details>

**Output**
```eolang
$ ts-node src/index.ts test.eo && node test.js                                                                                       5s 04:52:34
[5,10]
```

----
**EOLANG code #3**
```eolang
"Seven plus two is " > beginning
7.add 2 > sevenPlusTwo
sevenPlusTwo.eq 10 > sevenPlusTwoIsTen

[] > app
  if. > @
    sevenPlusTwoIsTen
    beginning.add "ten"
    beginning.add "NOT ten"
```

<details>
<summary> JS generated `code` </summary>

```
const {int, float, boolTrue, boolFalse, string, seq} = require('./eolib')

const beginning = () => ({
  ...string("Seven plus two is ")
})

const sevenPlusTwo = () => ({
  ...int(7).add(() => ({
    ...int(2)
  }))
})

const sevenPlusTwoIsTen = () => ({
  ...sevenPlusTwo().eq(() => ({
    ...int(10)
  }))
})

const app = () => ({
  ...(() => ({
    ...sevenPlusTwoIsTen().if(() => ({
      ...beginning().add(() => ({
        ...string("ten")
      }))
    }), () => ({
      ...beginning().add(() => ({
        ...string("NOT ten")
      }))
    }))
  }))()
})

console.log(app().$_datarize())
```
</details>

**Output**
```eolang
$ ts-node src/index.ts test.eo && node test.js                                                                                       5s 04:52:34
Seven plus two is NOT ten
```

