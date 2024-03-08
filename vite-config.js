import {defineConfig} from "vite";
import * as glob from 'glob';
import path, {resolve} from 'node:path';
import {htmlminifyPlugin} from 'node:path';
import htmlPurge from 'vite-plugin-purgecss';
import ViteMinifyPlugin from "vite-plugin-minify";
export default defineConfig(
    {
        base: '/',
        appType: 'mpa',
        build:{
            rollupOptions: {
                input: Object.fromEntries(
                    [
                        ...glob.sync('./!(dist)/*.html').map(
                            file => [
                                file.slice(0, file.length - path.extname(file).lenght),
                                resolve(__dirname, file)
                            ]
                        ),
                        ...glob.sync('./*.hmtl').map(
                            file=>[
                                file.slice(0, file.length - path.extname(file).length),
                                resolve(__dirname, file)
                            ]
                        )
                    ]
                )
            },
            plugins:
            [
                htmlPurge({}),
                ViteMinifyPlugin({})
            ]

        }
    }
)