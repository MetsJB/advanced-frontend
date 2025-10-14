import MiniCssExtractPlugin, { loader } from 'mini-css-extract-plugin';
import webpack from 'webpack';
import { BuildOptions } from './types/config';
import { buildCssLoaders } from './loaders/buildCssLoaders';
import { buildBabelLoader } from './loaders/buildBabelLoader';

export function buildoadres(options: BuildOptions): webpack.RuleSetRule[] {
    const { isDev } = options;

    const svgloader = {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    };

    const codeBabelLoader = buildBabelLoader({ ...options, isTsx: false });
    const tsxCodeBabelLoader = buildBabelLoader({ ...options, isTsx: true });

    const cssLoaders = buildCssLoaders(isDev);
    // если не используем тайпскрипт - нужен babel-loader
    // const typescriptLoader = {
    //   test: /\.tsx?$/,
    //   use: "ts-loader",
    //   exclude: /node_modules/,
    // };

    const fileLoader = {
        test: /\.(png|jpe?g|gif|woff2|woff)$/,
        use: [
            {
                loader: 'file-loader',
                options: {},
            },
        ],
    };

    return [
        codeBabelLoader,
        tsxCodeBabelLoader,
        fileLoader,
        svgloader,
        // typescriptLoader
        cssLoaders,
    ];
}
