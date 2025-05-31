#!/bin/bash

# Color definitions
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Setting up Project ===${NC}"

npx create-next-app@latest gamified-learning \
  --javascript \
  --tailwind \
  --app \
  --src-dir
cd gamified-learning

npm install tailwindcss @tailwindcss/postcss postcss
npm install gray-matter remark remark-html next-mdx-remote
npm install @next/mdx @mdx-js/loader @mdx-js/react @types/mdx



