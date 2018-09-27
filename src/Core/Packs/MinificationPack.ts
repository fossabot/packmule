import * as webpack from 'webpack';
import * as TerserPlugin from 'terser-webpack-plugin';
import Pack from '../Pack';
import Options from '../Options';

export default class MinificationPack implements Pack {
    private configuration: webpack.Configuration = {
        optimization: {
            minimizer: [],
        },
    };

    public generate(options: Options): webpack.Configuration {
        if (options.optimize) {
            const uglify = new TerserPlugin({
                parallel: true,
                cache: options.cache,
                sourceMap: options.debug,
            });

            this.configuration.optimization!.minimizer!.push(uglify);
        }

        return this.configuration;
    }
}
