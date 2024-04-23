const CONFIG = {
  // profile setting (required)
  profile: {
    name: "share-CV",
    image: "/avatar.svg", // If you want to create your own notion avatar, check out https://notion-avatar.vercel.app
    role: "HR",
    bio: "For resume creation, please visit share-CV",
    email: "",
    linkedin: "",
    github: "duchuykg",
    instagram: "",
  },
  projects: [
    {
      name: `share-CV`,
      href: "https://github.com/MauDucKG/share-CV",
    },
  ],
  // blog setting (required)
  blog: {
    title: "share-CV",
    description: "Welcome to share-CV!",
  },

  // CONFIG configration (required)
  link: "https://share-cv.vercel.app",
  since: 2023, // If leave this empty, current year will be used.
  lang: "en-US", // ['en-US', 'zh-CN', 'zh-HK', 'zh-TW', 'ja-JP', 'es-ES', 'ko-KR']
  ogImageGenerateURL: "https://og-image-korean.vercel.app", // The link to generate OG image, don't end with a slash

  // notion configuration (required)
  notionConfig: {
    pageId: process.env.NOTION_PAGE_ID,
  },

  // plugin configuration (optional)
  googleAnalytics: {
    enable: true,
    config: {
      measurementId: process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID || "",
    },
  },
  googleSearchConsole: {
    enable: true,
    config: {
      siteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
    },
  },
  utterances: {
    enable: true,
    config: {
      repo: "MauDucKG/share-CV" ||"",
      "issue-term": "og:title",
      label: "💬 Utterances",
      clientId: "3a0867acc92f99838faf", // Client ID của ứng dụng OAuth của bạn
      clientSecret: "8e90a246f0ae25c90c0d4b3c2f3ab631144c40ef",
    },
  },
  cusdis: {
    enable: false,
    config: {
      host: "https://cusdis.com",
      appid: "1e62f627-b1ae-450a-b217-5fee1b1958a1", 
    },
  },
  isProd: process.env.VERCEL_ENV === "production", // distinguish between development and production environment (ref: https://vercel.com/docs/environment-variables#system-environment-variables)
  revalidateTime: 21600 * 7, // revalidate time for [slug], index
}

module.exports = { CONFIG }
