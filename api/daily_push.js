const database = require('./database_manager.js');
const {sendNotification} = require('./subscription_manager');


exports.dailyPush = async function() {
  const subscriptions = await database.getAllSubscriptions();
  for (const subscription of subscriptions) {
    sendNotification(subscription, '!!!!!!!!!!!!!!!!!!!!!');
  }
}

