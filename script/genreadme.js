'use strict';

const fs = require('fs');
const path = require('path');

const filename = "README.md";
const escape = "\r\n\r\n";

function getPath(...args) {
  return path.resolve(path.join(__dirname, '..', ...args));
};

const TOSservices = fs
  .readdirSync(getPath('tos'))
  .filter(dir => dir !== '.DS_Store'); // MacOS fix

for (const TOSservice of TOSservices) {
  const TOSRaws = fs
    .readdirSync(getPath('tos', TOSservice))
    .filter(file => file.endsWith('.json'));

  const latestTOSRaw = TOSRaws
    .map(file => parseFloat(file.split('.')[0]))
    .sort((a, b) => a - b);

  const latestRevision = latestTOSRaw[latestTOSRaw.length - 1];

  const TOSRaw = JSON.parse(fs.readFileSync(getPath('tos', TOSservice, `${latestRevision}.json`), 'utf8'));

  const tos = generateDoc(TOSRaw);

  fs.writeFileSync(getPath('tos', TOSservice, filename), tos);

  console.log('DONE.')
};

function generateDoc(TOSRaw) {
  const { metadata, data } = TOSRaw;

  let TOS = `# Latest TOS | revision: ${metadata.revision}` + escape;
  TOS += `modified at **${new Date(metadata.date.start).toString()}**` + escape;
  TOS += `language: **${metadata.lang}**` + escape;

  for (const constitution of data) {
    if (constitution.type.endsWith('title')) {
      TOS += generatetitle(constitution.type, constitution.text);
    } else if (constitution.type == 'paragraph') {
      TOS += generateParagraph(constitution.text);
    } else {
      console.log('invalid type: %s', constitution.type);
    }
  };

  return TOS;
};

function generatetitle(type, text) {
  if (type.startsWith('first')) {
    return text.map((t) => `# ${t}`).join(escape) + escape;
  } else if (type.startsWith('second')) {
    return text.map((t) => `## ${t}`).join(escape) + escape;
  } else if (type.startsWith('third')) {
    return text.map((t) => `### ${t}`).join(escape) + escape;
  };
};

function generateParagraph(text) {
  return text.map((t) => {
    if (typeof t == 'string') {
      return t;
    } else if (typeof t == 'object') {
      if (t.type.startsWith('list')) {
        return generateList(t);
      }
    };
  }).join(escape) + escape;
}

function generateList(data) {
  if (data.type == 'list') {
    return data.list.map((l) => l).join(escape);
  } else if (data.type == 'list-with-introducing') {
    return data.introducing + escape + data.list.map((l) => l).join(escape);
  }
};