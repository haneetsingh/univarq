import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Univarq",
    short_name: "Univarq",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0f14",
    theme_color: "#c08a3e",
    icons: [
      { src: "/brand/favicon-32.png", sizes: "32x32", type: "image/png" },
      { src: "/brand/favicon-180.png", sizes: "180x180", type: "image/png" },
      { src: "/brand/favicon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
