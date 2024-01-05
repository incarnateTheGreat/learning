/** @type {import('next').NextConfig} */
const nextConfig = {
    productionBrowserSourceMaps: false,
    swcMinify: true,
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'resources.premierleague.com',
              port: '',
              pathname:"**"
            },
          ],
    },
}

module.exports = nextConfig
