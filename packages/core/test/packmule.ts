import test from 'ava';
import Packmule from '../src/';

test('packmule instantiation', (t) => {
    const packmule = new Packmule();

    t.truthy(packmule);
});

test('directory context is set by default', (t) => {
    const packmule = new Packmule();
    const configuration = packmule.generate();

    t.assert(typeof configuration.context === 'string');
});

test('webpack watch is false by default', (t) => {
    const packmule = new Packmule();
    const configuration = packmule.generate();

    t.false(configuration.watch);
});

test('webpack cache is false by default', (t) => {
    const packmule = new Packmule();
    const configuration = packmule.generate();

    t.false(configuration.cache);
});

test('webpack mode is none by default', (t) => {
    const packmule = new Packmule();
    const configuration = packmule.generate();

    t.assert(configuration.mode === 'none');
});
