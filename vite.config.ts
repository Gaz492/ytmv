import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const commitSha = process.env.CF_PAGES_COMMIT_SHA

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  define: {
    VITE_APP_COMMIT_SHA: JSON.stringify(commitSha)
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
