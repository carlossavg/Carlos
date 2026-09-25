// Uso: import { gql } from './gql.mjs'; await gql(query, variables, {mutate:true})
import { execSync } from 'node:child_process';
import { writeFileSync, readFileSync, mkdtempSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
const STORE = 'vt9vns-xz.myshopify.com';
export function gql(query, variables = {}, { mutate = false } = {}) {
  const d = mkdtempSync(join(tmpdir(), 'gql-'));
  const q = join(d, 'q.graphql'), v = join(d, 'v.json'), o = join(d, 'o.json');
  writeFileSync(q, query); writeFileSync(v, JSON.stringify(variables));
  const cmd = `shopify store execute --store ${STORE} --query-file "${q}" --variable-file "${v}" --output-file "${o}"${mutate ? ' --allow-mutations' : ''}`;
  try { execSync(cmd, { stdio: ['ignore', 'pipe', 'pipe'] }); }
  catch (e) { throw new Error((e.stdout || '') + (e.stderr || '')); }
  return JSON.parse(readFileSync(o, 'utf8'));
}
