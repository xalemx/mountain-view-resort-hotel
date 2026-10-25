const webUrl = (query) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

const isIOS = () => /iPhone|iPad|iPod/i.test(navigator.userAgent);
const isAndroid = () => /Android/i.test(navigator.userAgent);

export function mapsWebUrl(query) {
  return webUrl(query);
}

// On a phone, hand the tap over to the Google Maps app; on a computer the
// plain web link opens as usual. If the app is not installed, we land on Maps
// in the browser instead of on a dead link.
export function openInMaps(event, query) {
  if (!isIOS() && !isAndroid()) return;

  event.preventDefault();

  const appUrl = isIOS()
    ? `comgooglemaps://?q=${encodeURIComponent(query)}&zoom=16`
    : `geo:0,0?q=${encodeURIComponent(query)}`;

  let appOpened = false;
  const markOpened = () => {
    appOpened = true;
  };

  document.addEventListener("visibilitychange", markOpened);
  window.location.href = appUrl;

  window.setTimeout(() => {
    document.removeEventListener("visibilitychange", markOpened);
    if (!appOpened && document.visibilityState === "visible") {
      window.open(webUrl(query), "_blank", "noopener");
    }
  }, 1200);
}