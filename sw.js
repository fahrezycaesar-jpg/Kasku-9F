self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(windowClients => {
      // Jika aplikasi sudah terbuka, fokuskan ke tab itu
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        if (client.url.includes('index.html') && 'focus' in client) {
          return client.focus();
        }
      }
      // Jika belum terbuka, buka tab baru
      if (clients.openWindow) {
        return clients.openWindow('./index.html');
      }
    })
  );
});

// (Opsional) Menangani sinyal push dari server (jika nanti pakai FCM)
self.addEventListener('push', function(event) {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Kas Kelas';
  const options = {
    body: data.body || 'Ada pemberitahuan baru',
    icon: './icon-192.png',
    badge: './icon-192.png',
    vibrate: [300, 100, 300],
    requireInteraction: true
  };
  event.waitUntil(self.registration.showNotification(title, options));
});
