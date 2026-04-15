import { defineConfig } from 'tsdown';

export default defineConfig({
  tsconfig: 'tsconfig.lib.json',
  entry: [ 'src/index.ts', 'src/schema/auth/index.ts' ],
  exports: true,
  minify: true,
  dts: true,
});
