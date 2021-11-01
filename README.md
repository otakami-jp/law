# Otakami
last change: **22 october 2021**

This repository regroups all the ***TOS*** of otakami projects.

You can get TOS with this API:

`https://law.core.otaka.me/tos/{type}/{revision}`

You can also get a revsion by data
`http://law.core.otaka.me/revision/{lawType}/{serviceType}/{date}`

like:
```js
const axios = require('axios');

const date = ;

function getRevision(date) {
  return axios.get(`https://law.core.otaka.me/revision/tos/api/${date}`)
    .then(res => res.data.revision);
}

async function getTos(revision) {
  const date = new Date('13 october 2021')

  const revision = await getRevision(date);

  return axios.get(`https://tos.core.otaka.me/tos/api/${revision}`)
}
```
