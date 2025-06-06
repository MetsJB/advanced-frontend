import { BuildOptions } from "./types/config";
import type { Configuration as DevSreverConfiguration } from "webpack-dev-server";

export function buildDevServer(options: BuildOptions): DevSreverConfiguration {
  return {
    port: options.port,
    open: true,
    historyApiFallback: true,
    hot: true,
  };
}
