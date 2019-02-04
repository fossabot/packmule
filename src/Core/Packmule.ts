import webpack from 'webpack';
import merge from 'webpack-merge';
import dir from 'pkg-dir';
import Pack from './Pack';
import Options from './Options';
import BasePack from './Packs/BasePack';
import OptimizationPack from './Packs/OptimizationPack';
import MinificationPack from './Packs/MinificationPack';

export default class Packmule {
    private packs: Pack[] = [];
    private readonly options: Options;

    private defaults: Options = {
        mode: 'none',
        root: dir.sync(process.cwd()),
        optimize: false,
        extract: false,
        notify: false,
        watch: false,
        lint: false,
        debug: false,
        cache: false,
        hash: false,
    };

    private presets: any = {
        none: {},
        production: {
            mode: 'production',
            optimize: true,
            extract: true,
            hash: true,
        },
        development: {
            mode: 'development',
            notify: true,
            watch: true,
            lint: true,
            debug: true,
            cache: true,
        },
    };

    public constructor(mode?: 'development' | 'production' | 'none', options?: Options) {
        this.options = { ...this.defaults, ...this.presets[mode || 'none'], ...options };

        this.register(new BasePack());
        this.register(new OptimizationPack());
        this.register(new MinificationPack());
    }

    public register(pack: Pack): this {
        this.packs.push(pack);
        return this;
    }

    public generate(): webpack.Configuration {
        const parts: webpack.Configuration[] = [];

        this.packs.forEach((pack: Pack) => {
            pack.generate && parts.push(pack.generate(this.options));
        });

        let configuration = merge(...parts);

        this.packs.forEach((pack: Pack) => {
            pack.process && (configuration = pack.process(configuration));
        });

        return configuration;
    }
}
