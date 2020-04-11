const mysql = require('mysql');
const secrets = require('./secrets.js');

const pool = mysql.createPool({
  connectionLimit: 2,
  ...secrets.DATABASE,
});

pool.query(`
  CREATE TABLE IF NOT EXISTS subscriptions (
    endpoint VARCHAR(250) NOT NULL,
    subscription VARCHAR(500) NOT NULL,
    PRIMARY KEY(endpoint)
  );`, err => err && console.log(err));

exports.saveSubscription = async function(pushSubscription) {
  return await new Promise((s, f) => {
    pool.query('INSERT IGNORE INTO subscriptions SET ?',
               {endpoint: pushSubscription.endpoint, subscription: JSON.stringify(pushSubscription)},
               error => {
      if (error) {
        console.log(error);
        f(error);
        return;
      }
      s();
    });
  });
};

exports.deleteSubscription = async function(pushSubscription) {
  return await new Promise((s, f) => {
    pool.query('DELETE FROM subscriptions WHERE endpoint=?', pushSubscription.endpoint, error => {
      if (error) {
        console.log(error);
        f(error);
        return;
      }
      s();
    });
  });
};
