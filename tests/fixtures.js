module.exports = {
  currentTagArrayFixture: [
    {
      tagName: "script",
      voidTag: true,
      attributes: {
        src: "filename.js"
      }
    }
  ],
  optionsTagsFixture: [
    {
      test: /\.woff/,
      tagName: "link",
      rel: "preload",
      as: "font",
      type: "font/[.ext]",
      crossorigin: true
    }
  ],
  assetsFixture: {
    "my_font.woff": {},
    "assets/my_font_2.woff": {}
  },
  newTagsArrayFixture: [
    {
      tagName: "script",
      voidTag: true,
      attributes: {
        src: "filename.js"
      }
    },
    {
      tagName: "link",
      voidTag: false,
      attributes: {
        href: "my_font.woff",
        rel: "preload",
        as: "font",
        type: "font/woff",
        crossorigin: true
      }
    },
    {
      tagName: "link",
      voidTag: false,
      attributes: {
        href: "assets/my_font_2.woff",
        rel: "preload",
        as: "font",
        type: "font/woff",
        crossorigin: true
      }
    }
  ]
};
