# &#x3C;thumb-hash&#x3E;

**A [custom element](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements) that automatically renders a [thumbhash](https://github.com/evanw/thumbhash) placeholder for your lazy-loaded images**

[![Test status](https://img.shields.io/github/actions/workflow/status/hirasso/thumbhash-custom-element/tests.yml?branch=main&label=tests)](https://github.com/hirasso/thumbhash-custom-element/actions/workflows/tests.yml)
[![License](https://img.shields.io/github/license/hirasso/thumbhash-custom-element.svg)](https://github.com/hirasso/thumbhash-custom-element/blob/master/LICENSE)

## Demo

[thumbhash-custom-element.netlify.app](https://thumbhash-custom-element.netlify.app)

## Scope & Motivation

This package is intended for **frontend-only use only**. It assumes you have **already pre-generated your thumbhashes on the server or during an SSG build step**. Many server-side libraries already provide [convenience functions](https://github.com/SRWieZ/thumbhash?tab=readme-ov-file#usage) that will generate a thumbhash data URI for you. This is fine for pages with a few images, but will quickly increase the size of your html if you have more images. This is where `thumbhash-custom-element` comes in. All data-heavy calculation will be executed on the frontend, keeping your html small.

## Installation

Install from npm and import it into your bundle:

```bash
npm i @hirasso/thumbhash-custom-element
```

```js
import { ThumbHashElement } from "@hirasso/thumbhash-custom-element";
ThumbHashElement.init();
```

Or include the self-initializing production build from a CDN:

```html
<script src="https://unpkg.com/@hirasso/thumbhash-custom-element@0"></script>
```

## Usage

### Markup

Add `<thumb-hash>` elements with your pre-generated thumbhash strings to your markup:

```diff
<figure>
+  <thumb-hash value="YTkGJwaRhWUIt4lbgnhZl3ath2BUBGYA" />
  <img src="https://example.com/image.jpg" loading="lazy" width="32" height="32" alt="My large lazy-loaded image">
</figure>
```

**Result:**

```diff
<figure>
+  <thumb-hash value="YTkGJwaRhWUIt4lbgnhZl3ath2BUBGYA" aria-hidden="true">
+    ⏷ #shadow-root (open)
+       <canvas width="32" height="32" style="width: 100%; height: 100%;"></canvas>
+  </thumb-hash>
  <img src="https://example.com/image.jpg" loading="lazy" width="32" height="32" alt="My large lazy-loaded image">
</figure>
```

### Styling

```css
figure,
figure img {
  position: relative;
}
thumb-hash {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

## Strategies

The default strategy of `<thumb-hash>` is to render a `canvas` with the blurry representation of the thumbhash. Other options are `img` and `average`:

### Strategy: `img`

Add the attribute `strategy="img"` to render an image with a data URI:

```diff
<figure>
+  <thumb-hash strategy="img" value="YTkGJwaRhWUIt4lbgnhZl3ath2BUBGYA" />
  <img src="https://example.com/image.jpg" loading="lazy" width="32" height="32" alt="My large lazy-loaded image">
</figure>
```

**Result:**

```diff
<figure>
+  <thumb-hash strategy="img" value="YTkGJwaRhWUIt4lbgnhZl3ath2BUBGYA" aria-hidden="true">
+    ⏷ #shadow-root (open)
+       <img alt="" src="data:image/png;base64,iVBORw0KGgo..." style="width: 100%; height: 100%;">
+  </thumb-hash>
  <img src="https://example.com/image.jpg" loading="lazy" width="32" height="32" alt="My large lazy-loaded image">
</figure>
```

### Strategy: `average`

Add the attribute `strategy="average"` to render a div with the average color:

```diff
<figure>
+  <thumb-hash strategy="average" value="YTkGJwaRhWUIt4lbgnhZl3ath2BUBGYA" />
  <img src="https://example.com/image.jpg" loading="lazy" width="32" height="32" alt="My large lazy-loaded image">
</figure>
```

**Result:**

```diff
<figure>
+  <thumb-hash strategy="average" value="YTkGJwaRhWUIt4lbgnhZl3ath2BUBGYA" aria-hidden="true">
+    ⏷ #shadow-root (open)
+       <div style="width: 100%; height: 100%; background: rgb(111, 51, 0);"></div>
+  </thumb-hash>
  <img src="https://example.com/image.jpg" loading="lazy" width="32" height="32" alt="My large lazy-loaded image">
</figure>
```