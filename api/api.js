const express = require('express');
const crypto = require('crypto');
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

function getUrlAndType(post) {
  if (post.data.media) {
    if (!post.data.media.reddit_video)
      return null;
    return {
      url: post.data.media.reddit_video.fallback_url,
      type: 'video',
    };
  }

  if (!post.data.url.includes('i.redd.it'))
    return null;

  return {
    url: post.data.url,
    type: 'photo',
  };
}

async function fetchRedditPosts(subreddit) {
  const response = await fetch(`https://reddit.com/${subreddit}.json`);
  const cats = (await response.json()).data.children;
  return cats.filter(cat => cat.data.thumbnail.startsWith('http'))
             .filter(cat => getUrlAndType(cat)).map(cat => ({
    id: crypto.createHash('md5').update(cat.data.permalink).digest('hex'),
    title: cat.data.title,
    description: cat.data.selftext ? cat.data.selftext : getDescriptionForSubreddit(subreddit),
    thumbnail: cat.data.thumbnail,
    permalink: `https://reddit.com${cat.data.permalink}`,
    ...getUrlAndType(cat),
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
    res.status(501).send(e.message);
  }
});

module.exports = router;
