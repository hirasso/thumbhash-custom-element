# Changelog

## 0.5.5

### Patch Changes

- 4b1bf37: Render light DOM child nodes of a `<thumb-hash>` via `<slot>`

## 0.5.4

### Patch Changes

- 4b5df2e: Add `display: block` to the default styles for the `canvas` and `img` render strategies, to optimize rendering and simplify styling.

## 0.5.3

### Patch Changes

- d050c4f: Prevent repeated rendering if either one of these conditions apply:

  - the shadow root is not empty
  - neither the `value` nor the `strategy` attributes have changed since the last render

## 0.5.2

### Patch Changes

- dc5a96c: Simplify the observer

## 0.5.1

### Patch Changes

- 17724f7: Ensure garbage collection of observed elements

## 0.5.0

### Minor Changes

- 82054da: Wait until a `<thumb-hash>` comes close to the viewport before rendering the hash

## 0.4.0

### Minor Changes

- 58a5995: Add support for `document.createElement`. Remove illegal operations from constructor.

### Patch Changes

- 58a5995: (re-)render when the `value` or `strategy` attributes are being changed

## 0.3.0

### Minor Changes

- 017b02b: Fix readonly `shadowRoot` assignment. Basically only from this version, the library starts to be usable 😅

### Patch Changes

- 017b02b: Fix instructions for import statements
- 017b02b: Test the umd version in e2e tests instead of the development version
- eb99ef4: Make the umd bundle self-initializing and update the README accordingly

## 0.2.4

### Patch Changes

- babfe46: Add scope and motivation to the readme

## 0.2.3

### Patch Changes

- [#21](https://github.com/hirasso/thumbhash-custom-element/pull/21) [`b4f3030`](https://github.com/hirasso/thumbhash-custom-element/commit/b4f3030dd8820c0f519c60b0b1ceb69e39094499) Thanks [@hirasso](https://github.com/hirasso)! - Make package public

## 0.2.2

### Patch Changes

- [#14](https://github.com/hirasso/thumbhash-custom-element/pull/14) [`05220b2`](https://github.com/hirasso/thumbhash-custom-element/commit/05220b2d1ac68ebadd04e35d2789d8d0195a3846) Thanks [@hirasso](https://github.com/hirasso)! - Add unit test for UMD export

- [#18](https://github.com/hirasso/thumbhash-custom-element/pull/18) [`19e3f52`](https://github.com/hirasso/thumbhash-custom-element/commit/19e3f527475fec674bffbb3fad592f39516c59d1) Thanks [@hirasso](https://github.com/hirasso)! - Attempt to fix actions

- [#19](https://github.com/hirasso/thumbhash-custom-element/pull/19) [`f8476a9`](https://github.com/hirasso/thumbhash-custom-element/commit/f8476a9d59f789a86f5beb2b6e93aa5f481bf363) Thanks [@hirasso](https://github.com/hirasso)! - fix error: Unable to locate executable file: changeset.

- [#17](https://github.com/hirasso/thumbhash-custom-element/pull/17) [`4d9e708`](https://github.com/hirasso/thumbhash-custom-element/commit/4d9e708edafb5332b1f5388fd4d0faa0c0b79f8a) Thanks [@hirasso](https://github.com/hirasso)! - Setup PNMP first so that it can be cached

- [#16](https://github.com/hirasso/thumbhash-custom-element/pull/16) [`76303e6`](https://github.com/hirasso/thumbhash-custom-element/commit/76303e6395b7ed655a09e9debf5bf886983649fe) Thanks [@hirasso](https://github.com/hirasso)! - Only run changesets action for repository owner 'hirasso'

- [#15](https://github.com/hirasso/thumbhash-custom-element/pull/15) [`c7201b7`](https://github.com/hirasso/thumbhash-custom-element/commit/c7201b7dbadf93860f3d5d909b76bfb8432e8984) Thanks [@hirasso](https://github.com/hirasso)! - Simplify changesets action

## 0.2.1

### Patch Changes

- [#12](https://github.com/hirasso/thumbhash-custom-element/pull/12) [`f6d100a`](https://github.com/hirasso/thumbhash-custom-element/commit/f6d100a1c6ecc8a62f663336b602e50a9a9c4696) Thanks [@hirasso](https://github.com/hirasso)! - Let changesets do everything

## 0.2.0

### Minor Changes

- [#8](https://github.com/hirasso/thumbhash-custom-element/pull/8) [`30e19c3`](https://github.com/hirasso/thumbhash-custom-element/commit/30e19c335248957e0abcead521e85b5cdd584e6b) Thanks [@hirasso](https://github.com/hirasso)! - deprecate boolean attribute `average` in favor of new attribute `strategy="canvas | img | average"`

### Patch Changes

- [#9](https://github.com/hirasso/thumbhash-custom-element/pull/9) [`205fad2`](https://github.com/hirasso/thumbhash-custom-element/commit/205fad2f9b197eb93c4f6880980dc358c80f3deb) Thanks [@hirasso](https://github.com/hirasso)! - Retry changesets

## 0.1.2

### Patch Changes

- 470f2d5: Add new strategy "image" to render an image with a data uri instead of a canvas

## 0.1.1

### Patch Changes

- c282ccf: Add more images to the demo site
- 349d76d: Fix average color algorythm
