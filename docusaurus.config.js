// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { themes } = require("prism-react-renderer")
const lightCodeTheme = themes.github
const darkCodeTheme = themes.dracula

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "小刻的吃蘑菇日记",
  tagline: "抓住她！",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://enraged-dun-cookie-development-team.github.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",
  trailingSlash: false,
  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "Enraged-Dun-Cookie-Development-Team", // Usually your GitHub org/user name.
  projectName: "Ceobe-Canteen-Blog", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "zh-Hans",
    locales: ["zh-Hans"],
  },
  staticDirectories: ["static"],

  markdown: {
    mermaid: true,
  },
  themes: ["@docusaurus/theme-mermaid"],

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/Enraged-Dun-Cookie-Development-Team/Ceobe-Canteen-Blog/blob/main/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/Enraged-Dun-Cookie-Development-Team/Ceobe-Canteen-Blog/blob/main/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: "小刻食堂日记",
        logo: {
          alt: "Ceobe Canteen Blog Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "tutorialSidebar",
            position: "left",
            label: "文档",
          },
          { to: "/blog", label: "博客", position: "left" },
          {
            href: "https://github.com/Enraged-Dun-Cookie-Development-Team",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "日记",
            items: [
              {
                label: "文档",
                to: "/docs/intro",
              },
              {
                label: "博客",
                to: "/blog",
              },
            ],
          },
          {
            title: "项目",
            items: [
              {
                label: "Dun-Cookie-Vue",
                href: "https://github.com/Enraged-Dun-Cookie-Development-Team/Dun-Cookie-Vue",
              },
              {
                label: "Ceobe-Canteen-Serve",
                href: "https://github.com/Enraged-Dun-Cookie-Development-Team/Ceobe-Canteen-Serve",
              },
              {
                label: "Ceobe-Canteen-Admin",
                href: "https://github.com/Enraged-Dun-Cookie-Development-Team/Ceobe-Canteen-Admin",
              },
            ],
          },
          {
            title: "更多",
            items: [
              {
                label: "官网",
                href: "https://www.ceobecanteen.top",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Enraged-Dun-Cookie-Development-Team, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: [
          "json",
          "diff",
          "bash",
          "go",
          "python",
          "rust",
          "toml",
        ],
      },
    }),
}

module.exports = config
