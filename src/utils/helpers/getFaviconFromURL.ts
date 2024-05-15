export default function getFaviconFromURL(url: string): string {
  const urlObj = new URL("https://www.google.com/s2/favicons?sz=32");
  urlObj.searchParams.set("domain", url);
  return urlObj.toString();
}
