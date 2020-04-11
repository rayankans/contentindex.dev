const webpush = require('web-push');
const secrets = require('./secrets.js');
const database = require('./database_manager.js');

const vapidKeys = {
  publicKey: 'BOj7Q5zTq3d_TZ7MofKkMBQW-p_MJ4kU_1Ue9x6y4GGHqssMgxvFkkiX9ULlOy2XKBdD1LX9gStc-uHm_2RrHXw',
  privateKey: secrets.VAPID_PRIVATE_KEY,
};

webpush.setVapidDetails(
  'https://sadchonks.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey,
);

exports.saveSubscription = async function(subscriptionData) {
  await database.saveSubscription(subscriptionData);
  webpush.sendNotification(subscriptionData, JSON.stringify({'data': '!!!!!!!!'}));
}

exports.deleteSubscription = async function(subscriptionData) {
  await database.deleteSubscription(subscriptionData);
}
