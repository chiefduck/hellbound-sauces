/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SHOPIFY_STORE_DOMAIN: string
  readonly VITE_SHOPIFY_STOREFRONT_TOKEN: string
  readonly VITE_JUDGEME_PUBLIC_TOKEN: string
  readonly VITE_JUDGEME_SHOP_DOMAIN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Judge.me global object
interface Window {
  jdgm?: {
    SHOP_DOMAIN?: string
    PLATFORM?: string
    PUBLIC_TOKEN?: string
    customWidget?: (selector: string) => void
  }
  jdgmLoadWidgets?: () => void
}
