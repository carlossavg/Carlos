import { gql } from './gql.mjs';
import { readFileSync } from 'node:fs';
const [id, ...files] = process.argv.slice(2);
const root = 'C:/tiendas/carlos-gh/pawlio/tema/';
const r = gql(`mutation($id:ID!,$files:[OnlineStoreThemeFilesUpsertFileInput!]!){ themeFilesUpsert(themeId:$id, files:$files){ upsertedThemeFiles{ filename } userErrors{ filename field code message } } }`,
  { id, files: files.map(f => ({ filename: f, body: { type: 'TEXT', value: readFileSync(root + f, 'utf8') } })) }, { mutate: true });
console.log(JSON.stringify(r.themeFilesUpsert, null, 2));
