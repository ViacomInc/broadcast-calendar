import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import externals from "rollup-plugin-node-externals";

const plugins = [
  commonjs(),
  resolve(),
  externals(),
  typescript({ exclude: "rollup.config.ts" }),
];

export default {
  input: "src/index.ts",
  output: [
    {
      file: "lib/index.js",
      format: "cjs",
      sourcemap: true,
      exports: "named",
    },
    {
      file: "lib/index.es.js",
      format: "es",
      sourcemap: true,
      exports: "named",
    },
  ],
  plugins,
};
