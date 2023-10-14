import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const commitSha = process.env.CF_PAGES_COMMIT_SHA

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    VITE_APP_COMMIT_SHA: JSON.stringify(commitSha)
  },
  plugins: [react()],
})
