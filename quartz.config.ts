import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "mirror gallery",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "quartz.jzhao.xyz",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Merriweather",
        body: "Merriweather",
        code: "JetBrains Mono",
      },
      colors: {
        lightMode: {
          light: "#fbf1c7",        // gruvbox light bg
          lightgray: "#ebdbb2",    // gruvbox light1
          gray: "#928374",         // gruvbox gray
          darkgray: "#3c3836",     // gruvbox dark1
          dark: "#282828",         // gruvbox dark bg
          secondary: "#b57614",    // gruvbox yellow-dark
          tertiary: "#427b58",     // gruvbox green-dark
          highlight: "rgba(181, 118, 20, 0.15)",
        },
        darkMode: {
          light: "#282828",        // gruvbox dark bg
          lightgray: "#3c3836",    // gruvbox dark1
          gray: "#928374",         // gruvbox gray
          darkgray: "#bdae93",     // gruvbox light3
          dark: "#ebdbb2",         // gruvbox light1
          secondary: "#d79921",    // gruvbox yellow
          tertiary: "#8ec07c",     // gruvbox aqua
          highlight: "rgba(215, 153, 33, 0.15)",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
