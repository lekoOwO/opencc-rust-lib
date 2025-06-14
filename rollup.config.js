import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'src/opencc-rust.mjs',
  output: {
    file: 'dist/opencc-rust.umd.js',
    format: 'umd',
    name: 'OpenccRust',
    exports: 'named',
  },
  plugins: [resolve()]
};
