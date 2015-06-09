[![Build Status][travis-image]][travis-url]

# llvm2

FFI-based abstraction over the LLVM C API.

## Installation

```sh
npm install llvm2
```

#### Mac OS X notes

llvm2 uses the 3.6 version of LLVM via the Homebrew/versions tap. This version also doesn't link the dynamic library into the system search path, so you may need to do this manually (see below).

```sh
$ brew tap homebrew/versions
==> Tapping Homebrew/versions
...
$ brew install llvm36
...
$ brew ls --versions llvm36
llvm 3.6.1
$ brew link llvm36
Linking /usr/local/Cellar/llvm36/3.6.1... 78 symlinks created
$ ln -s /usr/local/opt/llvm36/lib/llvm-3.6/lib/libLLVM-3.6.dylib /usr/local/lib/libLLVM-3.6.dylib
```

## Testing

The basic test suite can be run using [mocha](http://mochajs.org/).

```sh
$ npm install -g mocha@latest
$ mocha test
```

## License

Licensed under the MIT License, see [LICENSE](LICENSE) for details.

[travis-image]: https://img.shields.io/travis/dirk/llvm2/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/dirk/llvm2

