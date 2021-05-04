import autoExternal from "rollup-plugin-auto-external";
import typescript from "rollup-plugin-typescript2";

const pkg = require("./package.json");

const isProd = process.env.NODE_ENV === "production";

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
      exports: "named",
    },
    {
      file: pkg.module,
      format: "es",
      sourcemap: true,
      exports: "named",
    },
  ],
  plugins: [
    autoExternal(),
    typescript({ clean: true, rollupCommonJSResolveHack: false }),
  ],
};
