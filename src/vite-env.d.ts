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
