import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'
import obfuscator from 'vite-plugin-javascript-obfuscator'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ mode }) => ({
  resolve: {
    alias: [
      { find: /^src\//, replacement: `${path.resolve(rootDir, 'src')}/` }
    ]
  },
  plugins: [
    react(),
    svgr(),
    tailwindcss(),
    mode === 'production' &&
      obfuscator({
        options: {
          compact: true,
          controlFlowFlattening: true,
          controlFlowFlatteningThreshold: 0.75,
          deadCodeInjection: true,
          deadCodeInjectionThreshold: 0.4,
          debugProtection: false,
          debugProtectionInterval: 0,
          disableConsoleOutput: true,
          identifierNamesGenerator: 'hexadecimal',
          log: false,
          numbersToExpressions: true,
          renameGlobals: false,
          selfDefending: true,
          simplify: true,
          splitStrings: true,
          splitStringsChunkLength: 10,
          stringArray: true,
          stringArrayCallsTransform: true,
          stringArrayCallsTransformThreshold: 0.75,
          stringArrayEncoding: ['base64'],
          stringArrayIndexShift: true,
          stringArrayRotate: true,
          stringArrayShuffle: true,
          stringArrayWrappersCount: 2,
          stringArrayWrappersChainedCalls: true,
          stringArrayWrappersParametersMaxCount: 4,
          stringArrayWrappersType: 'function',
          stringArrayThreshold: 0.75,
          transformObjectKeys: true,
          unicodeEscapeSequence: false
        }
      })
  ].filter(Boolean),
  server: {
    port: 5173,
    open: true
  },
  build: {
    sourcemap: mode !== 'production',
    chunkSizeWarningLimit: 1000
  }
}))
