// @vitest-environment node
import { describe, expect, it } from "vitest";
import { getYouTubeEmbedUrl, getYouTubeThumbnailUrl } from "@/lib/youtube";

describe("getYouTubeEmbedUrl", () => {
  it.each([
    "https://youtube.com/watch?v=M7lc1UVf-VE",
    "https://www.youtube.com/watch?v=M7lc1UVf-VE&autoplay=1&start=30",
    "http://m.youtube.com/watch?feature=share&v=M7lc1UVf-VE",
    "https://youtu.be/M7lc1UVf-VE?si=share-code&t=30",
    "http://www.youtu.be/M7lc1UVf-VE",
    "https://www.youtube.com/shorts/M7lc1UVf-VE?feature=share",
    "https://youtube.com/live/M7lc1UVf-VE",
    "https://m.youtube.com/embed/M7lc1UVf-VE?autoplay=1",
    "https://youtube-nocookie.com/embed/M7lc1UVf-VE",
    "https://www.youtube-nocookie.com/embed/M7lc1UVf-VE?enablejsapi=1",
    "  https://www.youtube.com/watch?v=M7lc1UVf-VE  ",
  ])("normalizes supported links without preserving player parameters: %s", (link) => {
    expect(getYouTubeEmbedUrl(link)).toBe(
      "https://www.youtube-nocookie.com/embed/M7lc1UVf-VE?playsinline=1&rel=0",
    );
  });

  it("preserves valid ID characters and case", () => {
    expect(getYouTubeEmbedUrl("https://youtu.be/_AbCdEf-012")).toBe(
      "https://www.youtube-nocookie.com/embed/_AbCdEf-012?playsinline=1&rel=0",
    );
  });

  it.each([
    "",
    "   ",
    "not a URL",
    "M7lc1UVf-VE",
    "//youtube.com/watch?v=M7lc1UVf-VE",
    "javascript:alert('M7lc1UVf-VE')",
    "data:text/html,https://youtube.com/watch?v=M7lc1UVf-VE",
    "ftp://youtube.com/watch?v=M7lc1UVf-VE",
    "https://example.com/watch?v=M7lc1UVf-VE",
    "https://youtube.com.example.com/watch?v=M7lc1UVf-VE",
    "https://fake-youtube.com/watch?v=M7lc1UVf-VE",
    "https://music.youtube.com/watch?v=M7lc1UVf-VE",
    "https://youtube.com@evil.example/watch?v=M7lc1UVf-VE",
    "https://www.youtube-nocookie.com.example.com/embed/M7lc1UVf-VE",
    "https://youtube.com/watch",
    "https://youtube.com/watch?v=",
    "https://youtube.com/watch?v=M7lc1UVf-V",
    "https://youtube.com/watch?v=M7lc1UVf-VEE",
    "https://youtube.com/watch?v=M7lc1UVf-V!",
    "https://youtube.com/watch?v=M7lc1UVf%2FVE",
    "https://youtu.be/",
    "https://youtu.be/M7lc1UVf-VE/extra",
    "https://youtube.com/shorts/invalid",
    "https://youtube.com/live/M7lc1UVf-V!",
    "https://youtube.com/embed/M7lc1UVf-VEE",
    "https://youtube.com/channel/M7lc1UVf-VE",
    "https://youtube-nocookie.com/watch?v=M7lc1UVf-VE",
  ])("rejects unsupported or malformed links: %s", (link) => {
    expect(getYouTubeEmbedUrl(link)).toBeNull();
  });
});

describe("getYouTubeThumbnailUrl", () => {
  it.each([
    "https://www.youtube.com/watch?v=M7lc1UVf-VE",
    "https://youtu.be/M7lc1UVf-VE?si=share",
    "https://www.youtube.com/shorts/M7lc1UVf-VE",
  ])("uses the video's own thumbnail for %s", (link) => {
    expect(getYouTubeThumbnailUrl(link)).toBe("https://i.ytimg.com/vi/M7lc1UVf-VE/hqdefault.jpg");
  });

  it("does not generate a thumbnail for an invalid video link", () => {
    expect(getYouTubeThumbnailUrl("https://example.com/watch?v=M7lc1UVf-VE")).toBeNull();
  });
});
