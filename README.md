# OpenCC Rust Library

這是基於 Rust + WebAssembly 的 OpenCC 中文轉換工具。

## 安裝

```sh
npm install opencc-rust
```

## 使用方式

### ESM/現代瀏覽器/Node.js

```js
import { initOpenccRust, getConverter } from 'opencc-rust';
// 或是 import { initOpenccRust, getConverter } from 'https://cdn.jsdelivr.net/npm/opencc-rust/dist/opencc-rust.mjs';

await initOpenccRust();
const converter = getConverter();
const result = await converter.convert('漢字');
```

### UMD/CDN

```html
<script src="https://cdn.jsdelivr.net/npm/opencc-rust/dist/opencc-rust.umd.js"></script>
<script>
OpenccRust.initOpenccRust().then(() => {
  const converter = OpenccRust.getConverter();
  converter.convert('漢字').then(result => {
    console.log(result);
  });
});
</script>
```
## 授權
MIT

## 致謝

[polyproline/opencc-rust](https://github.com/polyproline/opencc-rust)