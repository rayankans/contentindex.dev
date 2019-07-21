const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

function getDescriptionForSubreddit(subreddit) {
  switch(subreddit) {
    case 'r/sadcats':
      return 'A sad reddit post from r/sadcats';
    case 'r/chonkers':
      return 'Look at this absolute unit of a C H O N K';
  }
}

async function fetchRedditPosts(subreddit) {
  const response = await fetch(`https://reddit.com/${subreddit}.json`);
  const cats = (await response.json()).data.children;
  return cats.filter(cat => cat.data.thumbnail.startsWith('http')).map(cat => ({
    title: cat.data.title,
    description: cat.data.selftext ? cat.data.selftext : getDescriptionForSubreddit(subreddit),
    urlToImage: cat.data.thumbnail,
  }));
}

router.get('/', async (req, res) => {
  try {
    let cats = await Promise.all([
      await fetchRedditPosts('r/sadcats'),
      await fetchRedditPosts('r/chonkers'),
    ]);
    cats = cats[0].concat(cats[1]);
    cats = cats.sort(() => Math.random() < 0.5 ? 1 : -1);   // basically a shuffle.
    res.json(cats.slice(0, 20));
  } catch (e) {
    res.status(501).send();
  }
});

module.exports = router;
