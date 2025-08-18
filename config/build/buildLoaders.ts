import MiniCssExtractPlugin, { loader } from "mini-css-extract-plugin";
import webpack from "webpack";
import { BuildOptions } from "./types/config";
import { buildCssLoaders } from "./loaders/buildCssLoaders";
import { buildBabelLoader } from "./loaders/buildBabelLoader";

export function buildoadres(options: BuildOptions): webpack.RuleSetRule[] {
  
  const {isDev} = options
  
  const svgloader = {
    test: /\.svg$/,
    use: ["@svgr/webpack"],
  };

  const babelLoader = buildBabelLoader(options)

  const cssLoaders = buildCssLoaders(isDev);

  const typescriptLoader = {
    test: /\.tsx?$/,
    use: "ts-loader",
    exclude: /node_modules/,
  };

  const fileLoader = {
    test: /\.(png|jpe?g|gif|woff2|woff)$/,
    use: [
      {
        loader: "file-loader",
        options: {},
      },
    ],
  };

  return [babelLoader, fileLoader, svgloader, typescriptLoader, cssLoaders];
}
