const PUBLIC_KEY = 'BOj7Q5zTq3d_TZ7MofKkMBQW-p_MJ4kU_1Ue9x6y4GGHqssMgxvFkkiX9ULlOy2XKBdD1LX9gStc-uHm_2RrHXw';
let isToggleInFlight = false;

export async function isPushSupported() {
  const sw = await navigator.serviceWorker.ready;
  return 'pushManager' in sw;
}

export async function isPushEnabled() {
  const sw = await navigator.serviceWorker.ready;
  const pushSubscription = await sw.pushManager.getSubscription();
  return pushSubscription !== null;
}

export async function handlePushToggle(isPushOn, setIsPushOn) {
  if (isToggleInFlight) return;
  isToggleInFlight = true;

  try {
    if (isPushOn) {
      await deactivatePush();
      setIsPushOn(false);
    } else {
      await activatePush();
      setIsPushOn(true);
    }
  } catch (e) {}

  isToggleInFlight = false;
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/')
  ;
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

async function activatePush() {
  const permissionResult = await Notification.requestPermission();
  if (permissionResult !== 'granted')
    return;
  
  const sw = await navigator.serviceWorker.ready;
  const pushSubscription = await sw.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(PUBLIC_KEY),
  });

  await fetch('/api/save_subscription', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pushSubscription),
  }).then(response => {
    if (response.status !== 200) {
      throw new Error('Server error');
    }
  }).catch(err => pushSubscription.unsubscribe());
}

async function deactivatePush() {
  const sw = await navigator.serviceWorker.ready;
  const pushSubscription = await sw.pushManager.getSubscription();
  await fetch('/api/delete_subscription', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pushSubscription),
  }).then(response => {
    if (response.status !== 200) {
      throw new Error('Server error');
    }
    return pushSubscription.unsubscribe();
  })
}
