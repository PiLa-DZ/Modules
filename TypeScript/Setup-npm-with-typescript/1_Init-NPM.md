```bash
npm init -y
npm pkg set type="module"
npm pkg set scripts.start="node dist/server.js"
npm pkg set scripts.dev="tsx watch src/server.ts"
npm pkg set scripts.build="tsc"
npm pkg set scripts.check="tsc --noEmit"
npm pkg set scripts.tree="clear; tree -I node_modules -I .git -I wiki -I dist -a"
```
