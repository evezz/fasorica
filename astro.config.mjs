// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import starlight from '@astrojs/starlight';
// import cloudflare from '@astrojs/cloudflare';  <-- Metti due barre qui

export default defineConfig({
    markdown: {
        processor: unified({
            remarkPlugins: [remarkMath],
            rehypePlugins: [rehypeKatex],
        }),
    },
    // DISATTIVIAMO TEMPORANEAMENTE L'ADATTATORE CLOUDFLARE
    // adapter: cloudflare({
    //     prerenderEnvironment: 'node',
    // }),
    integrations: [
        starlight({
            title: 'Fasorica',
            customCss: [
                'katex/dist/katex.min.css',
                './src/styles/custom.css',
            ],
            defaultLocale: 'it',
            locales: {
                it: { label: 'Italiano' },
                en: { label: 'English' },
            },
        }),
    ],
});