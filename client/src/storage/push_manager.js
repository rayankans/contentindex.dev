
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

async function activatePush() {
  const permissionResult = await Notification.requestPermission();
  if (permissionResult !== 'granted')
    return false;
  
}

async function deactivatePush() {

}
