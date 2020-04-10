
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

export async function handlePushToggle(isPushOn) {
  console.log(isPushOn);
  if (isToggleInFlight) return;
  isToggleInFlight = true;

  if (isPushOn) {
    await deactivatePush();
  } else {
    await activatePush();
  }

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
    return false;
  
  const sw = await navigator.serviceWorker.ready;
  const pushSubscription = {'asd': 43};/*await sw.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array('BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U'),
  });*/

  const responseData = await fetch('/api/save_subscription', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(pushSubscription),
  });

  return responseData.data && responseData.data.success;
}

async function deactivatePush() {

}
