import heroSauce from '@/assets/hero-sauce.jpg';
import productDevilsTongue from '@/assets/product-devils-tongue.jpg';
import productHellfireHabanero from '@/assets/product-hellfire-habanero.jpg';
import productSmokyChipotle from '@/assets/product-smoky-chipotle.jpg';
import productSignatureRub from '@/assets/product-signature-rub.jpg';
import productBundle from '@/assets/product-bundle.jpg';
import collectionHotSauces from '@/assets/collection-hot-sauces.jpg';
import collectionBbqRubs from '@/assets/collection-bbq-rubs.jpg';

export const images = {
  hero: heroSauce,
  products: {
    'devils-tongue': productDevilsTongue,
    'hellfire-habanero': productHellfireHabanero,
    'smoky-chipotle-inferno': productSmokyChipotle,
    'scorpion-sting': productDevilsTongue,
    'garlic-ghost': productDevilsTongue,
    'citrus-reaper': productHellfireHabanero,
    'hellbound-signature-rub': productSignatureRub,
    'reaper-rub': productSignatureRub,
    'coffee-cocoa-rub': productSignatureRub,
    'ultimate-heat-bundle': productBundle,
    'bbq-masters-bundle': productBundle,
    'starter-pack': productBundle,
  },
  collections: {
    'hot-sauces': collectionHotSauces,
    'bbq-rubs': collectionBbqRubs,
    'bundles': productBundle,
  },
};

export const getProductImage = (handle: string): string => {
  return images.products[handle as keyof typeof images.products] || productDevilsTongue;
};

export const getCollectionImage = (handle: string): string => {
  return images.collections[handle as keyof typeof images.collections] || collectionHotSauces;
};
