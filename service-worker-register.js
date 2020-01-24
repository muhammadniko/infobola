// Registrasi Service Worker

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("./workbox.js")
      .then(function() {
        console.log("Pendaftaran ServiceWorker berhasil");
      })
      .catch(function() {
        console.log("Pendaftaran ServiceWorker gagal");
      });
  });
} else {
  console.log("ServiceWorker belum didukung browser ini.");
}

// Notification API Check
if ('Notification' in window) {
  Notification.requestPermission().then(function (result) {
    if (result === "denied") {
      console.log("Fitur notifikasi tidak diijinkan.");
      return;
    } 
    else if (result === "default") {
      console.error("Pengguna menutup kotak dialog permintaan ijin.");
      return;
    }
  });
}

//Push Notification 
if (('PushManager' in window)) {
  navigator.serviceWorker.getRegistration().then(function(registration) {
    registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array("BDbtqofYU9O6mmx52d76yiS1e8vdaPe8QGjHoEut2x1UA80sp3_6o43o-_xBFm3I_60NRanwGXdC_6LAIuhygF8") 
    
    }).then(function(subscribe) {
      console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
      console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey('p256dh')))));
      console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey('auth')))));
    
    }).catch(function(e) {
      console.error('Tidak dapat melakukan subscribe ', e.message);
    });
  });
} 

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  
  for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
  }
  
  return outputArray;
}

function showNotif() {
  const title = 'Notification Enabled';
  const options = {
    'body': 'Anda akan mendapatkan pemberitahuan dari aplikasi infobola',
  }
  
  if (Notification.permission === 'granted') {
    navigator.serviceWorker.ready.then(function(registration) {
      registration.showNotification(title, options);
    });
  } else {
    console.error('Fitur notifikasi tidak diijinkan.');
  }
}
