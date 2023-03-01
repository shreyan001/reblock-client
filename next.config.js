module.exports = {
  reactStrictMode: true,
  env: {
    customKey: 'my-value',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ipfs.io',
        port: '',
        pathname: '/ipfs/**',
      },
    ],
  },
}

