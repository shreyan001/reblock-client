module.exports = {
  reactStrictMode: true,
  env: {
    customKey: 'my-value',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nftstorage.link',
        port: '',
        pathname: '/ipfs/**',
      },
    ],
  },
}

