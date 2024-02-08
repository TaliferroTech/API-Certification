// Function to get the value of a cookie
export function getCookie(name: string) {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) {
      return cookieValue || "";
    }
  }
  return "";
}

// Function to set the value of a cookie
export function setCookie(name: string, value: number) {
  document.cookie = `${name}=${value}`;
}

export const currentDomainURL = new URL(window.location.href);

export function getOutboundLinks(
  links: HTMLCollectionOf<HTMLAnchorElement>,
): HTMLAnchorElement[] {
  const outboundLinks: HTMLAnchorElement[] = [];
  for (const link of links) {
    const linkURL = new URL(link.href);
    const https = linkURL.protocol == "https:";
    if (https && currentDomainURL.hostname != linkURL.hostname) {
      outboundLinks.push(link);
    }
  }
  return outboundLinks;
}
