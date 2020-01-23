var webPush = require('web-push');
 
const vapidKeys = {
  "publicKey": "BDbtqofYU9O6mmx52d76yiS1e8vdaPe8QGjHoEut2x1UA80sp3_6o43o-_xBFm3I_60NRanwGXdC_6LAIuhygF8",
  "privateKey": "CLJshGYS9OFWKbRcR7tDtRd06kfsTXpBz4fJzFQE5CQ"
};
 
 
webPush.setVapidDetails(
  'mailto:mn.muhammadniko@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)

var pushSubscription = {
  "endpoint": "https://fcm.googleapis.com/fcm/send/fIjEC5wBdQY:APA91bGwJ4xeERRYZs8tZwe_3jWL4OsQdUggIjbfeKR5dLJ17q-ISHRxrz0eGn0yWnNqcKq85J_S7TPdCeHPLi9-WfprFAz74gH1F5uWXgSGKnNJQoYUr8MmAolgFhi6V9aBMVn7K9rJ",
  "keys": {
    "p256dh": "BI1zT3+nsA5UkIYFxQhGVQWjOmC9pbS0R/lNLNJ6BGmBVd0UBWaBIQYUCRrslKzzeHL5UN/fOC6PnW4MctsCsYA=",
    "auth" : "voeOfRV8up8lfj11ULbh1Q=="
  }
};

// Bagian isi dari notifikasi
var payload = 'Terimakasih telah mengaktifkan notifikasi, Anda akan mendapatkan pemberitahuan dari aplikasi ini';
 
var options = {
  gcmAPIKey: '242229027013',
  TTL: 60
};

webPush.sendNotification(
  pushSubscription,
  payload,
  options
);