// Static files (images, logos, fonts) are served from the asset bucket when NEXT_PUBLIC_ASSET_URL
// is set, under the same path they have in public/. Unset, they load from the site itself.
const base = (process.env.NEXT_PUBLIC_ASSET_URL ?? '').replace(/\/+$/, '');

export const asset = (path: string) => base + path;

// True for root-relative paths to files in public/, such as "/photos/team.jpg".
export const isAssetPath = (value: string) => /^\/(?:photos|brands|images|industries|fonts)\/.+\.\w+$|^\/(?:favicon\.svg|integrations-diagram\.png)$/.test(value);
