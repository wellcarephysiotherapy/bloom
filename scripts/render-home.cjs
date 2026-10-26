/* Render the same editable components used by the browser, without a framework. */
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const source=fs.readFileSync(path.join(root,'app.js'),'utf8').split('\nconst currentFile=')[0];
const result=vm.runInNewContext(source+'\nJSON.stringify({main:home(),footer:footer(),whatsapp:`<a class="whatsapp-float" href="${WHATSAPP_URL}" target="_blank" rel="noopener noreferrer" aria-label="Chat with Wellcare Bloom on WhatsApp">${whatsappIcon}<span class="whatsapp-float-label">Chat on WhatsApp</span></a>`})',Object.create(null),{timeout:5000});
process.stdout.write(result);
