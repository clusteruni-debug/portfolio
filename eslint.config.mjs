import nextConfig from 'eslint-config-next'

const config = [
  { ignores: ['.next/', 'dist/'] },
  ...nextConfig,
]

export default config
