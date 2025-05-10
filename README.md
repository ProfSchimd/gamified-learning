# Gamified Learning
Gamified Learning Experience (Study, Play, and Learn material)

## Setup

### Installation
The setup procedure requires a few steps (see also `init.sh` companion file).

Create the project 
```sh
npx create-next-app@latest gamified-learning \
  --javascript \
  --tailwind \
  --app \
  --src-dir
cd gamified-learning
```

Install all the appropriate packages

```sh
npm install tailwindcss \
    @tailwindcss/postcss \
    postcss \
    gray-matter \
    remark \
    remark-html \
    next-mdx-remote
```

### Configuration
Setup `next.config.js` for Github Pages
```js
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  output: 'export', // enables static export
  trailingSlash: true, // recommended for GitHub Pages
  assetPrefix: isProd ? '/interactive-learning/' : '',
  basePath: isProd ? '/interactive-learning' : '',
};
```

### NextJS
