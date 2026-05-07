# Setup NPM with TypeScript

## Initialize NPM

```bash
npm init -y
npm pkg set type="module"
npm pkg set scripts.start="node dist/server.js"
npm pkg set scripts.dev="tsx watch src/server.ts"
npm pkg set scripts.build="tsc"
npm pkg set scripts.check="tsc --noEmit"
npm pkg set scripts.tree="clear; tree -I node_modules -I .git -I wiki -I dist -a"
```

## Install Modules

```bash
npm install typescript --save-dev --verbose
npm install @types/node --save-dev --verbose
npm install tsx --save-dev --verbose
```

## Initialize TypeScript

```bash
npx tsc --init
nvim tsconfig.json
```

```json
{
  "compilerOptions": {
    // File Layout
    "rootDir": "./src",
    "outDir": "./dist",
    // Environment Settings
    "module": "NodeNext",
    "target": "ESNext",
    "lib": ["esnext"],
    "types": ["node"], // and npm install -D @types/node

    // Other Outputs
    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,

    // Stricter Typechecking Options
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,

    // Recommended Options
    "strict": true,
    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "noUncheckedSideEffectImports": true,
    "moduleDetection": "force",
    "skipLibCheck": true,

    "forceConsistentCasingInFileNames": true,
    "esModuleInterop": true,
    "removeComments": true,
    "moduleResolution": "NodeNext"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

# Setup File Structure

```bash
mkdir -p src
touch src/server.ts
touch src/app.ts
mkdir -p src/controllers
mkdir -p src/middleware
mkdir -p src/routes
mkdir -p src/services
mkdir -p src/types
mkdir -p src/lib
```
