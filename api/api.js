const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

async function fetchSadCats() {
  const response = await fetch('https://reddit.com/r/sadcats.json');
  const sadCats = (await response.json()).data.children;
  return sadCats.filter(sadCat => sadCat.data.thumbnail.startsWith('http')).map(sadCat => ({
    title: sadCat.data.title,
    description: sadCat.data.selftext ? sadCat.data.selftext : "A sad reddit post from r/sadcats",
    urlToImage: sadCat.data.thumbnail,
  }));
}

router.get('/', async (req, res) => {
  try {
    const sadCats = await fetchSadCats();
    res.json(sadCats);
  } catch (e) {
    res.status(501).send();
  }
});

module.exports = router;
