const webpush = require('web-push');
const secrets = require('./secrets.js');

const vapidKeys = {
  publicKey: 'BOj7Q5zTq3d_TZ7MofKkMBQW-p_MJ4kU_1Ue9x6y4GGHqssMgxvFkkiX9ULlOy2XKBdD1LX9gStc-uHm_2RrHXw',
  privateKey: secrets.VAPID_PRIVATE_KEY,
};

webpush.setVapidDetails(
  'mailto:rayan@kans.fyi',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

exports.saveSubscription = async function(subscriptionData) {
  console.log(JSON.stringify(subscriptionData));
  webpush.sendNotification(subscriptionData, JSON.stringify({'data': '!!!!!!!!'}));
}