/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * Automatically read from package.json version field
   */
  readonly VITE_APP_VERSION: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
