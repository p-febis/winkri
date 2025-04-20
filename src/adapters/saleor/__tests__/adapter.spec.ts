import { expect, it } from 'vitest';
import { SaleorStoreAdapter } from '../adapter';

it('Should parse a page properly', () => {
    const adapter = new SaleorStoreAdapter();
    const parsePage = adapter['parsePage'];
    const result = parsePage({
        title: 'TEST PAGE',
        content: '{}',
        metadata: [
            {
                key: 'hero-image-url',
                value: 'http://example.com/images/16x9',
            },
        ],
    });

    expect(result?.name).toBe('TEST PAGE');
    expect(result?.description).toBe('{}');
    expect(result?.metadata['hero-image-url']).toBe(
        'http://example.com/images/16x9',
    );
});
