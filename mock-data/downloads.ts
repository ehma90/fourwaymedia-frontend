export const DOWNLOAD_CATEGORIES = ["Motion", "Design", "Video"] as const;

export type DownloadCategory = (typeof DOWNLOAD_CATEGORIES)[number];

export type DownloadedAsset = {
  id: string;
  title: string;
  category: DownloadCategory;
  thumbnailUrl?: string;
  downloadedAt: string;
  productHref: string;
  /** Signed or direct file URL when the download API exists */
  fileHref?: string;
};

/**
 * Replace with `/api/me/downloads` (or similar) when wired up.
 * Use an empty array to exercise the subscribed empty state.
 */
export const MOCK_DOWNLOADS: DownloadedAsset[] = [
  {
    id: "1",
    title: "Kinetic typography toolkit",
    category: "Motion",
    thumbnailUrl:
      "https://ik.imagekit.io/vp72mg6kz/Homepage/ff3db51ebb7041f1938635e394515c9299a8b3a.png",
    downloadedAt: "2026-04-10T14:30:00.000Z",
    productHref: "/shop",
  },
  {
    id: "2",
    title: "Social reel frames — neon set",
    category: "Design",
    thumbnailUrl:
      "https://ik.imagekit.io/vp72mg6kz/Homepage/72e6f08be6a6c56b05def63096110a3dd1c66bf8.jpg",
    downloadedAt: "2026-04-05T09:15:00.000Z",
    productHref: "/shop",
  },
  {
    id: "3",
    title: "Documentary title sequence",
    category: "Video",
    thumbnailUrl:
      "https://ik.imagekit.io/vp72mg6kz/Homepage/0a1850f1617c2e0d083a0a6ae9643a1a8f7c563a.jpg",
    downloadedAt: "2026-03-22T18:00:00.000Z",
    productHref: "/shop",
  },
];
