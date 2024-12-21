---
"@hirasso/thumbhash-custom-element": patch
---

Prevent repeated rendering if either one of these conditions apply:

- the shadow root is not empty
- neither the `value` nor the `strategy` attributes have changed since the last render