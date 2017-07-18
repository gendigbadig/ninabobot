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
  .then((result) => res.json(result))
  .catch(err => console.log(err));
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

  if (event.replyToken === "00000000000000000000000000000000") {
    return {"verifyMode": true}
  }

  switch (event.message.text) {
    case "Hi NinaBoBot" || "hi ninabobot" || "Hi ninabobot" || "hi NinaBoBot":
      return Promise.resolve(client.getProfile(event.source.userId))
        .then((profile) => {
          let displayName = profile.displayName;
          return client.replyMessage(event.replyToken, {
            type: 'text',
            text: 'Hi juga ' + displayName
          });
        });
      break;
    case "Aku ngantuk" || "aku ngantuk" || "Ngantuk" || "ngantuk" || "hoam" || "Hoam":
      return client.replyMessage(event.replyToken, {
        type: 'text',
        text: `Nina bobo oh nina bobo 🎶
Kalau tidak bobo digigit nyamuk 🎶
Nina bobo oh nina bobo 🎶
Kalau tidak bobo digigit nyamuk 🎶
        
🛌💤😴`
      });
      break;
    case "Siapa aku?" || "siapa aku?"  || "siapa aku" || "Siapa aku" || "whoami" || "Whoami":
      return Promise.resolve(client.getProfile(event.source.userId))
        .then((profile) => {
          let displayName = profile.displayName;
          return client.replyMessage(event.replyToken, {
            type: 'text',
            text: 'Aku kenal! Nama kamu adalah ' + displayName
          });
        });
      break;
    default:
      return client.replyMessage(event.replyToken, {
        type: 'text',
        text: 'Aku tidak paham, jadi aku mengulang apa yang kamu ucap saja yaa.. \n\n' + event.message.text
      });
  }
}

app.listen(process.env.PORT || 3000);