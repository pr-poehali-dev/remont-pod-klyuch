const PUSH_API_URL = 'TBD';

export async function getVapidPublicKey(): Promise<string> {
  try {
    const response = await fetch(`${PUSH_API_URL}?action=key`);
    const data = await response.json();
    return data.publicKey;
  } catch (error) {
    console.error('Failed to get VAPID key:', error);
    throw error;
  }
}

export async function subscribeToPushNotifications(userId?: number): Promise<boolean> {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    console.warn('Push notifications not supported');
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    
    const existingSubscription = await registration.pushManager.getSubscription();
    if (existingSubscription) {
      await saveSubscription(existingSubscription, userId);
      return true;
    }

    const publicKey = await getVapidPublicKey();
    
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicKey)
    });

    await saveSubscription(subscription, userId);
    return true;
    
  } catch (error) {
    console.error('Failed to subscribe to push:', error);
    return false;
  }
}

async function saveSubscription(subscription: PushSubscription, userId?: number): Promise<void> {
  const response = await fetch(`${PUSH_API_URL}?action=subscribe`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      subscription: subscription.toJSON(),
      userId
    })
  });

  if (!response.ok) {
    throw new Error('Failed to save subscription');
  }
}

export async function unsubscribeFromPush(): Promise<boolean> {
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    
    if (subscription) {
      await subscription.unsubscribe();
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Failed to unsubscribe:', error);
    return false;
  }
}

export async function checkPushPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) {
    return 'denied';
  }
  return Notification.permission;
}

export async function requestPushPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) {
    return 'denied';
  }
  return await Notification.requestPermission();
}

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
