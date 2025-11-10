const fs = require('fs');
const path = require('path');

const outIndex = path.resolve(process.cwd(), 'out', 'index.html');

if (fs.existsSync(outIndex)) {
  console.log('Smoke check passed: out/index.html exists');
  process.exit(0);
} else {
  console.error('Smoke check failed: out/index.html not found');
  process.exit(2);
}
