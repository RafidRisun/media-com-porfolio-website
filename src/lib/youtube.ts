const youtubeHosts = new Set(["youtube.com", "www.youtube.com", "m.youtube.com"]);
const shortHosts = new Set(["youtu.be", "www.youtu.be"]);
const embedHosts = new Set(["youtube-nocookie.com", "www.youtube-nocookie.com"]);

function getYouTubeVideoId(link: string): string | null {
  let url: URL;
  try {
    url = new URL(link.trim());
  } catch {
    return null;
  }

  if (url.protocol !== "https:" && url.protocol !== "http:") return null;

  let videoId: string | null | undefined;
  if (shortHosts.has(url.hostname)) {
    videoId = url.pathname.match(/^\/([^/]+)\/?$/)?.[1];
  } else if (youtubeHosts.has(url.hostname)) {
    videoId = url.pathname === "/watch"
      ? url.searchParams.get("v")
      : url.pathname.match(/^\/(?:shorts|live|embed)\/([^/]+)\/?$/)?.[1];
  } else if (embedHosts.has(url.hostname)) {
    videoId = url.pathname.match(/^\/embed\/([^/]+)\/?$/)?.[1];
  }

  if (!videoId || !/^[A-Za-z0-9_-]{11}$/.test(videoId)) return null;

  return videoId;
}

export function getYouTubeEmbedUrl(link: string): string | null {
  const videoId = getYouTubeVideoId(link);
  return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}?playsinline=1&rel=0` : null;
}

export function getYouTubeThumbnailUrl(link: string): string | null {
  const videoId = getYouTubeVideoId(link);
  return videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : null;
}
