import fs from 'node:fs';

const input = process.argv[2];
const output = process.argv[3];
const raw = fs.readFileSync(input, 'utf8');
const text = raw.trim();
let payload;
try {
  payload = JSON.parse(text);
  if (typeof payload === 'string') payload = JSON.parse(payload);
} catch {
  throw new Error('No se encontró un JSON válido de la consola');
}
fs.writeFileSync(output, `${JSON.stringify(payload, null, 2)}\n`);
console.log(`Inventario extraído: ${output}`);
