# llvm2

FFI-based abstraction over the LLVM C API.

## Installation

```sh
npm install llvm2
```

#### Mac OS X notes

llvm2 currently requires the Homebrew version of LLVM 3.5 being installed and linked. You will need to use the `--force` option to force Homebrew to link it, since linking this LLVM can interfere with the default system (ie. Apple's) development tools.

```sh
$ brew install llvm
...
$ brew ls --versions llvm
llvm 3.5.1
$ brew link -f llvm
Linking /usr/local/Cellar/llvm/3.5.1... 195 symlinks created
```

## Testing

The basic test suite can be run using [mocha](http://mochajs.org/).

```sh
$ npm install -g mocha@latest
$ mocha test
```

## License

Licensed under the MIT License, see [LICENSE](LICENSE) for details.

