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

const date = new Date('13 october 2021');

function getRevision(date) {
  return axios.get(`https://law.core.otaka.me/revision/tos/api/${date}`)
    .then(res => res.data.revision);
}

function getTos(date) {
  
}

axios({
  url: 'https://tos.core.dev.otaka.me/api/ids/1.0.0',
  method: 'header',
  headers: {
    'Accept': 'text/html;q=0.9, application/json;q=0.8, */*',
    Authorization: 'Internal token',
    'X-Challenge': 'challenge'
  },
});