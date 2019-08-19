const HtmlWebpackStaticAssetsPlugin = require("../index");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("./webpackConfig");
const {
  currentTagArrayFixture,
  assetsFixture,
  optionsTagsFixture,
  newTagsArrayFixture
} = require("./fixtures");

describe("HtmlWebpackStaticAssetsPlugin", () => {
  it("Should return error if HtmlWebpackPlugin is missing", async () => {
    try {
      const stats = await webpack([]);
      const output = stats.toJson();
    } catch (err) {
      expect(err).toEqual(
        Error(
          "html-webpack-static-assets-plugin: Provide HtmlWebpackPlugin reference as a first parameter"
        )
      );
    }
  });

  it("Should return error if options are missing", async () => {
    try {
      const stats = await webpack([HtmlWebpackPlugin]);
      const output = stats.toJson();
    } catch (err) {
      expect(err).toEqual(
        Error("html-webpack-static-assets-plugin: Provide options.")
      );
    }
  });

  it("Should return error if options headTags and bodyTags are missing", async () => {
    try {
      const stats = await webpack([HtmlWebpackPlugin, {}]);
      const output = stats.toJson();
    } catch (err) {
      expect(err).toEqual(
        Error(
          "html-webpack-static-assets-plugin: Provide headTags or bodyTags otherwise this plugin is useless. :("
        )
      );
    }
  });

  it("getNewTagArray() should returns proper values", () => {
    const htmlWebpackStaticAssetsPlugin = new HtmlWebpackStaticAssetsPlugin();

    const newTagArray = htmlWebpackStaticAssetsPlugin.getNewTagArray(
      currentTagArrayFixture,
      optionsTagsFixture,
      assetsFixture
    );

    expect(newTagArray).toEqual(newTagsArrayFixture);
  });

  it("getNewTagArray() should returns proper values", () => {
    const htmlWebpackStaticAssetsPlugin = new HtmlWebpackStaticAssetsPlugin();
    try {
      const newTagArray = htmlWebpackStaticAssetsPlugin.getNewTagArray(
        currentTagArrayFixture,
        [
          {
            test: ""
          }
        ],
        assetsFixture
      );
    } catch (err) {
      expect(err).toEqual(
        Error(
          "html-webpack-static-assets-plugin: 'test' option value needs to be a type of RegExp."
        )
      );
    }
  });

  it("getNewTagArray() should returns proper values", () => {
    const htmlWebpackStaticAssetsPlugin = new HtmlWebpackStaticAssetsPlugin();
    try {
      const newTagArray = htmlWebpackStaticAssetsPlugin.getNewTagArray(
        currentTagArrayFixture,
        [
          {
            test: /\.woff/,
            tagName: null
          }
        ],
        assetsFixture
      );
    } catch (err) {
      expect(err).toEqual(
        Error("html-webpack-static-assets-plugin: 'tagName' is required!")
      );
    }
  });
});
