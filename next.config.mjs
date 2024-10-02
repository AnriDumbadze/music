/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'musicappbacket.s3.eu-north-1.amazonaws.com',
          port: '',
          pathname: '/**', // This allows all paths in the bucket
        },
      ],
    },
  };
  
  export default nextConfig;
  