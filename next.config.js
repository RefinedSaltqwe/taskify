/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  // FIX - if error when <Image /> is using src image from clerk organization this is how you would allow nextJS to use source image
  /* Error: Invalid src prop (https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18yWmdLOXVINXdMMkRTTDFXVWRTUUtKeE5CeDQiLCJyaWQiOiJvcmdfMlpnZ2ZFUTN4RXBsd2VMMjBBaXp4WFFmMmxoIiwiaW5pdGlhbHMiOiJBIn0) 
    on `next/image`, hostname "img.clerk.com" is not configured under images in your `next.config.js` */

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default config;
