
const express = require('express');
const path = require('path');

const app = express();
const port = 5000;

// API endpoint.
const fakeData = {
  "status": "ok",
  "totalResults": 2,
  "articles": [
    {
      "source": {
        "id": null,
        "name": "Lowendbox.com"
        },
      "author": "Frank Williams",
      "title": "Bigfoot Servers – Large VPS Resource Pools – Summer Sales out of Los Angeles and Dallas!",
      "description": "BigFootServers, sent in some new summer specials on VPS pools that we felt was deal-worthy to display to you! They are offering discounted packages on VPS resource pools. With these VPS pools, they’re giving customers the ability to create VPS’s on-demand, in…",
      "url": "https://lowendbox.com/blog/bigfoot-servers-large-vps-resource-pools-summer-sales-out-of-los-angeles-and-dallas/",
      "urlToImage": "http://lowendbox.com/wp-content/uploads/2018/08/bigfootservers-141x300.jpg",
      "publishedAt": "2019-07-14T14:00:30Z",
      "content": "Share \r\nTweet \r\nGoogle Plus \r\nShare\r\nBigFootServers, sent in some new summer specials on VPS pools that we felt was deal-worthy to display to you! They are offering discounted packages on VPS resource pools. With these VPS pools, theyre giving customers the a… [+2126 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Bitcoinist.com"
      },
      "author": "Emilio Janus",
      "title": "Weekly Digest: Bitcoin Price, Facebook, 3D Representations Of The Blockchain",
      "description": "Another day another dollar, as they say. So another week must be another seven dollars? Which seems like a bit of a bargain. Well you can get your round up of all the weeks Bitcoin news for even less than that, as we’re giving it away for free. Bitcoin Price …",
      "url": "https://bitcoinist.com/weekly-digest-bitcoin-price-facebook-3d-representations-of-the-blockchain/",
      "urlToImage": "https://bitcoinist.com/wp-content/uploads/2019/07/shutterstock_116458489-1920x1200.jpg",
      "publishedAt": "2019-07-14T14:00:02Z",
      "content": "Another day another dollar, as they say. So another week must be another seven dollars? Which seems like a bit of a bargain. Well you can get your round up of all the weeks Bitcoin news for even less than that, as we’re giving it away for free.\r\nBitcoin Price… [+3179 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Bitcoinist.com"
      },
      "author": "Emilio Janus",
      "title": "Weekly Digest: Bitcoin Price, Facebook, 3D Representations Of The Blockchain",
      "description": "Another day another dollar, as they say. So another week must be another seven dollars? Which seems like a bit of a bargain. Well you can get your round up of all the weeks Bitcoin news for even less than that, as we’re giving it away for free. Bitcoin Price …",
      "url": "https://bitcoinist.com/weekly-digest-bitcoin-price-facebook-3d-representations-of-the-blockchain/",
      "urlToImage": "https://bitcoinist.com/wp-content/uploads/2019/07/shutterstock_116458489-1920x1200.jpg",
      "publishedAt": "2019-07-14T14:00:02Z",
      "content": "Another day another dollar, as they say. So another week must be another seven dollars? Which seems like a bit of a bargain. Well you can get your round up of all the weeks Bitcoin news for even less than that, as we’re giving it away for free.\r\nBitcoin Price… [+3179 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Bitcoinist.com"
      },
      "author": "Emilio Janus",
      "title": "Weekly Digest: Bitcoin Price, Facebook, 3D Representations Of The Blockchain",
      "description": "Another day another dollar, as they say. So another week must be another seven dollars? Which seems like a bit of a bargain. Well you can get your round up of all the weeks Bitcoin news for even less than that, as we’re giving it away for free. Bitcoin Price …",
      "url": "https://bitcoinist.com/weekly-digest-bitcoin-price-facebook-3d-representations-of-the-blockchain/",
      "urlToImage": "https://bitcoinist.com/wp-content/uploads/2019/07/shutterstock_116458489-1920x1200.jpg",
      "publishedAt": "2019-07-14T14:00:02Z",
      "content": "Another day another dollar, as they say. So another week must be another seven dollars? Which seems like a bit of a bargain. Well you can get your round up of all the weeks Bitcoin news for even less than that, as we’re giving it away for free.\r\nBitcoin Price… [+3179 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Bitcoinist.com"
      },
      "author": "Emilio Janus",
      "title": "Weekly Digest: Bitcoin Price, Facebook, 3D Representations Of The Blockchain",
      "description": "Another day another dollar, as they say. So another week must be another seven dollars? Which seems like a bit of a bargain. Well you can get your round up of all the weeks Bitcoin news for even less than that, as we’re giving it away for free. Bitcoin Price …",
      "url": "https://bitcoinist.com/weekly-digest-bitcoin-price-facebook-3d-representations-of-the-blockchain/",
      "urlToImage": "https://bitcoinist.com/wp-content/uploads/2019/07/shutterstock_116458489-1920x1200.jpg",
      "publishedAt": "2019-07-14T14:00:02Z",
      "content": "Another day another dollar, as they say. So another week must be another seven dollars? Which seems like a bit of a bargain. Well you can get your round up of all the weeks Bitcoin news for even less than that, as we’re giving it away for free.\r\nBitcoin Price… [+3179 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Bitcoinist.com"
      },
      "author": "Emilio Janus",
      "title": "Weekly Digest: Bitcoin Price, Facebook, 3D Representations Of The Blockchain",
      "description": "Another day another dollar, as they say. So another week must be another seven dollars? Which seems like a bit of a bargain. Well you can get your round up of all the weeks Bitcoin news for even less than that, as we’re giving it away for free. Bitcoin Price …",
      "url": "https://bitcoinist.com/weekly-digest-bitcoin-price-facebook-3d-representations-of-the-blockchain/",
      "urlToImage": "https://bitcoinist.com/wp-content/uploads/2019/07/shutterstock_116458489-1920x1200.jpg",
      "publishedAt": "2019-07-14T14:00:02Z",
      "content": "Another day another dollar, as they say. So another week must be another seven dollars? Which seems like a bit of a bargain. Well you can get your round up of all the weeks Bitcoin news for even less than that, as we’re giving it away for free.\r\nBitcoin Price… [+3179 chars]"
    },
  ],
};
  

app.all('/api', (req, res) => res.json(fakeData));

if (app.get('env') === 'production') {
  app.get('/static/*', (req, res) => res.sendFile(path.join(__dirname, `client/build/${req.path}`)));
  app.get('/*', (req, res) => res.sendFile(path.join(__dirname, 'client/build/index.html')));
}

app.listen(port, () => console.log(`Listening on port ${port}! Mode: ${app.get('env')}`));
