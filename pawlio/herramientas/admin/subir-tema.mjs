import { gql } from './gql.mjs';
import { readFileSync } from 'node:fs';
const zip = readFileSync('pawlio.zip');
const st = gql(`mutation($input:[StagedUploadInput!]!){ stagedUploadsCreate(input:$input){ stagedTargets{ url resourceUrl parameters{ name value } } userErrors{ field message } } }`,
  { input: [{ filename: 'pawlio.zip', mimeType: 'application/zip', httpMethod: 'POST', resource: 'FILE', fileSize: String(zip.length) }] }, { mutate: true });
const r = st.stagedUploadsCreate; if (r.userErrors.length) { console.log(r.userErrors); process.exit(1); }
const t = r.stagedTargets[0];
const fd = new FormData();
for (const p of t.parameters) fd.append(p.name, p.value);
fd.append('file', new Blob([zip], { type: 'application/zip' }), 'pawlio.zip');
const up = await fetch(t.url, { method: 'POST', body: fd });
console.log('upload', up.status);
if (!up.ok) { console.log(await up.text()); process.exit(1); }
const tc = gql(`mutation($source:URL!,$name:String){ themeCreate(source:$source, name:$name, role:UNPUBLISHED){ theme{ id name role processing } userErrors{ field message code } } }`,
  { source: t.resourceUrl, name: 'Pawlio' }, { mutate: true });
console.log(JSON.stringify(tc, null, 2));
