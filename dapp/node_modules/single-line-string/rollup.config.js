import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/main.js',
  format: 'cjs',
  plugins: [babel()],
  dest: 'dist.js'
};
