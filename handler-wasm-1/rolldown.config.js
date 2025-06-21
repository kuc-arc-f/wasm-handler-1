import { defineConfig } from 'rolldown';

export default defineConfig({
  input: 'index.ts',
  output: {
    file: 'index.cjs',
    format: 'cjs',
  },
  platform: "node",
});