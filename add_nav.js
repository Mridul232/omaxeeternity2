const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const oldStr = '<nav class="nav">\r\n                <a href="about">About</a>';
const oldStr2 = '<nav class="nav">\n                <a href="about">About</a>';

const newStr = '<nav class="nav">\n                <a href="omaxe-barsana.html" style="color: #FFD700; font-weight: 600;">Barsana (New Launch)</a>\n                <a href="about">About</a>';

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  if (content.includes(oldStr)) {
    fs.writeFileSync(f, content.replace(oldStr, newStr), 'utf8');
    console.log('Updated ' + f);
  } else if (content.includes(oldStr2)) {
    fs.writeFileSync(f, content.replace(oldStr2, newStr), 'utf8');
    console.log('Updated ' + f);
  } else {
    console.log('Skipped ' + f + ' (nav tag not found in expected format)');
  }
});
