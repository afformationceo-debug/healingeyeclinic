const fs = require('fs');
const path = require('path');

const langs = ['en', 'ko', 'th', 'ru', 'ja', 'zh-CN', 'zh-TW'];
const files = {};
langs.forEach(l => {
  files[l] = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'src', 'messages', l + '.json'), 'utf8'));
});

function getKeys(obj, prefix) {
  prefix = prefix || '';
  let keys = [];
  for (const k of Object.keys(obj)) {
    const fullKey = prefix ? prefix + '.' + k : k;
    if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
      keys = keys.concat(getKeys(obj[k], fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

const enKeys = getKeys(files.en).sort();
console.log('=== FINAL VERIFICATION ===\n');
console.log('EN reference: ' + enKeys.length + ' leaf keys\n');

for (const lang of langs) {
  const langKeys = getKeys(files[lang]).sort();
  const missing = enKeys.filter(k => langKeys.indexOf(k) === -1);
  const extra = langKeys.filter(k => enKeys.indexOf(k) === -1);
  const match = missing.length === 0 && extra.length === 0;
  console.log(lang + ': ' + langKeys.length + ' keys | Missing: ' + missing.length + ' | Extra: ' + extra.length + ' | ' + (match ? 'PERFECT' : 'DIFF'));
  if (missing.length > 0) console.log('  Missing: ' + missing.join(', '));
  if (extra.length > 0) console.log('  Extra: ' + extra.join(', '));
}

console.log('\n=== JSON Validity ===');
langs.forEach(l => {
  try {
    JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'src', 'messages', l + '.json'), 'utf8'));
    console.log(l + ': VALID');
  } catch(e) {
    console.log(l + ': INVALID - ' + e.message);
  }
});

console.log('\n=== Line Counts ===');
langs.forEach(l => {
  const content = fs.readFileSync(path.join(__dirname, '..', 'src', 'messages', l + '.json'), 'utf8');
  console.log(l + ': ' + content.split('\n').length + ' lines');
});

// FAQ count verification
console.log('\n=== FAQ Counts ===');
const categories = ['clearLasik', 'lasik', 'lasek', 'icl', 'cataract', 'pterygium', 'retina'];
for (const lang of langs) {
  const faq = files[lang].Community && files[lang].Community.Page && files[lang].Community.Page.faq && files[lang].Community.Page.faq.items;
  if (!faq) { console.log(lang + ': NO FAQ'); continue; }
  let total = 0;
  categories.forEach(c => { total += faq[c] ? faq[c].length : 0; });
  console.log(lang + ': ' + total + ' FAQ items');
}
