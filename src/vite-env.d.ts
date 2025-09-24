/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CHILD_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}