# Properly

This is a really simple library than can list all properties (deeploy) in an object.

It will return a flatten object with a list of paths and its values.

## How to use it ?

```sh
npm add @sebaplaza/properly
```

```js
const { listProperties } = require('@sebaplaza/properly');

const data = {
  name: 'myself',
  address: {
    street: 'liberty alley',
    number:56
  }
}

const result = listProperties(data)

// result will be...
[
  { path: '/name', value: 'myself' },
  { path: '/address', value: { street: 'liberty alley', number: 56 } },
  { path: '/address/street', value: 'liberty alley' },
  { path: '/address/number', value: 56 }
]
```

### Options

The second parameter allows to customize `listProperties` function

We have 2 possible options:

- separator (default **'\'**): define a new separator
- leading (default **true**): set if the separator must be used at path's start.

## Performance

Some tests has been made with other libraries that can do the same thing

I tried to achieve the best possible performance.

Small object

```sh
Size of the object: 2716 bytes
json-ptr(listProperties) x 5,113 ops/sec ±1.75% (94 runs sampled)
json-pointer(dict) x 9,593 ops/sec ±0.89% (94 runs sampled)
deep-props.extract x 7,380 ops/sec ±1.38% (96 runs sampled)
properly x 90,847 ops/sec ±1.38% (89 runs sampled)
Fastest is properly
```

Big object

```sh
Size of the object: 296650 bytes
json-ptr(listProperties) x 43.77 ops/sec ±1.73% (57 runs sampled)
json-pointer(dict) x 70.04 ops/sec ±2.23% (71 runs sampled)
deep-props.extract x 76.89 ops/sec ±1.69% (67 runs sampled)
properly x 950 ops/sec ±1.26% (94 runs sampled)
Fastest is properly
```