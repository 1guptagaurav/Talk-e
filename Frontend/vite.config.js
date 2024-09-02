import { defineConfig } from 'vite'
import reactRefresh from "eslint-plugin-react-refresh";
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  "plugins": [react(),"react-refresh"],
  "rules": {
    "react-refresh/only-export-components": "warn"
  }
})

