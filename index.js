const express = require('express');
const line = require('@line/bot-sdk');

const config = {
  channelAccessToken: 'IQkq80dt4Gdd6iupK23wG8aiT5iSemswBB8iArIPrPpkCim034T5Y408/WeOQEwZRPXfxmlRV2jfuBobJx2t6kwMyVK4M4lj/NO5ue2Ro9CJzb2HBhWrF/qlfv+LerFf8eSYb7ChX38/dQhBQJtGEAdB04t89/1O/w1cDnyilFU=',
  channelSecret: 'e37f924e7b6330c1d7d4d2193a149957'
};

const app = express();
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
  .all(req.body.events.map(handleEvent))
  .then((result) => res.json(result));
});

app.get('/', (req, res) => {
  res.send('Hello World!')
});

const client = new line.Client(config);
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  console.log(event);

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: event.message.text
  });
}

app.listen(3000);