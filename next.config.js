/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   webpack: (config, { isServer }) => {
//     // Fixes npm packages that depend on `fs` module
//     if (!isServer) {
//       config.node = {
//         fs: 'empty'
//       }
//     }

//     return config
//   }
// }
module.exports = {
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
};
// module.exports = nextConfig
// module.exports = {
  // webpack: (config, { isServer }) => {
  //     if (!isServer) {
  //         // set 'fs' to an empty module on the client to prevent this error on build --> Error: Can't resolve 'fs'
  //         config.node = {
  //             fs: "empty"
  //         }
  //     }

  //     return config;
  // }

 
