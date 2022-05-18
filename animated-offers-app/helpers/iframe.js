// ************* Helper description *************

export function passDataToIframe(frameId, message) {
  document.getElementById(frameId).contentWindow.postMessage(message, '*');
}
