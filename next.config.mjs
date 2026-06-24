import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true
    }
  },
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.sportradar.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: '',
        pathname: '**',
      }
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/cep/:cep',
        destination: 'https://viacep.com.br/ws/:cep/json/',
      },
    ];
  },
  modularizeImports: {
    'lodash/?(((\\w*)?/?)*)': {
      transform: 'lodash/{{ member }}',
      skipDefaultConversion: true
    },
    // '@mui/material/?(((\\w*)?/?)*)': {
    //   transform: '@mui/material/{{ matches.[1] }}/{{ member }}',
    //   skipDefaultConversion: true
    // }
  },
  async redirects() {
    return [
      {
        source: '/home/register',
        has: [
          {
            type: 'query',
            key: 'associate',
          },
          {
            type: 'query',
            key: 'campaign',
          },
        ],
        destination: '/register?associate=:associate&campaign=:campaign',
        permanent: true,
      },
    ];
  },
};

async function getConfig() {
  const sentryWebpackPluginOptions = process.env.NODE_ENV === 'production';

  if (sentryWebpackPluginOptions) {
    // const { withSentryConfig } = await import('@sentry/nextjs');
    // return withSentryConfig(withNextIntl(nextConfig), { 
    //   org: "marjosports",
    //   project: "marjo-new-frontend",
    //   authToken: process.env.SENTRY_AUTH_TOKEN,
    //   sourcemaps: {
    //     disable: true,
    //   },
    //   telemetry: false, 
    // });
    return withNextIntl(nextConfig);
  } else {
    return withNextIntl(nextConfig);
  }
}

export default getConfig();