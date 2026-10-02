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
            description: 'Lezioni, appunti e strumenti interattivi per capire l’elettronica e le materie affini.',
            head: [
                {
                    tag: 'link',
                    attrs: {
                        rel: 'icon',
                        href: '/favicon.svg',
                    },
                },
            ],

            components: {
                Header: './src/components/CustomHeader.astro',
                Sidebar: './src/components/starlight/Sidebar.astro',
                PageSidebar: './src/components/starlight/PageSidebar.astro',
                PageTitle: './src/components/starlight/PageTitle.astro',
            },

            customCss: [
                'katex/dist/katex.min.css',
                './src/styles/custom.css',
                './src/styles/lezione.css',
            ],
            defaultLocale: 'it',
            locales: {
                it: { label: 'Italiano' },
                en: { label: 'English' },
            },
        }),
    ],
});