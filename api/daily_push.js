const database = require('./database_manager.js');
const {getContent} = require('./get_content.js');
const {sendNotification} = require('./subscription_manager');

exports.dailyPush = async function() {
  const [subscriptions, content] = await Promise.all([
    database.getAllSubscriptions(),
    getContent(),
  ]);

  const payload = JSON.stringify(content[0]);
  for (const subscription of subscriptions) {
    sendNotification(subscription, payload);
  }
}

