import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";
import { dts } from "rollup-plugin-dts";
import pkg from './package.json' assert { type: 'json' };
import tsConfig from './tsconfig.json' assert { type: 'json' };
import alias from "@rollup/plugin-alias";
import path from "path";


const isProduction = process.env.NODE_ENV === "production";
const libraryName = pkg.name;

const getOutput = (folder) => [
  {
    file: `${folder}/index.cjs.js`,
    format: "cjs",
    sourcemap: true,
    exports: "auto",
    inlineDynamicImports: true,
  },
  {
    file: `${folder}/index.esm.js`,
    format: "esm",
    sourcemap: true,
    inlineDynamicImports: true,
  },
  {
    file: `${folder}/index.umd.js`,
    format: "umd",
    name: libraryName,
    sourcemap: true,
    globals: {
      "reflect-metadata": "Reflect",
      "@savafeed/module-manager": "iocModuleManager", 
    },
    inlineDynamicImports: true,
  },
];

export default [
  {
    input: "src/index.ts",
    output: getOutput('dist'),
    plugins: [
      alias({
        entries: Object.entries(tsConfig.compilerOptions.paths).map(([key, value]) => ({
          find: key.replace("/*", ""),
          replacement: path.resolve(
            __dirname,
            tsConfig.compilerOptions.baseUrl,
            value[0].replace("/*", "")
          ),
        })),
      }),
      resolve({
        preferBuiltins: true,
        extensions: [".js", ".ts", ".cts"],
      }),
      commonjs(),
      json(),
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: false,
        rootDir: "src"
      }),
      isProduction && terser(),
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ]
  },
  {
    input: 'src/index.ts',
    output: { file: 'dist/index.d.ts', format: 'es' },
    plugins: [
      alias({
        entries: Object.entries(tsConfig.compilerOptions.paths).map(([key, value]) => ({
          find: key.replace("/*", ""),
          replacement: path.resolve(
            __dirname,
            tsConfig.compilerOptions.baseUrl,
            value[0].replace("/*", "")
          ),
        })),
      }),
      dts()
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ]
  },
];