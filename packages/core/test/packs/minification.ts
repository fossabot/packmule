import test from 'ava';
import TerserPlugin from 'terser-webpack-plugin';
import Pack from '../../src/packs/minification';

test('pack instantiation', (t) => {
    const pack = new Pack();

    t.truthy(pack);
});

test('minification is disabled by default', (t) => {
    const pack = new Pack();
    const configuration = pack.generate({});

    t.falsy(configuration.optimization!.minimizer!.length);
});

test('minification is enabled for the optimize option', (t) => {
    const pack = new Pack();
    const configuration = pack.generate({
        optimize: true,
    });

    const result = configuration.optimization!.minimizer!.some((minimizer) => minimizer instanceof TerserPlugin);

    t.true(result);
});
