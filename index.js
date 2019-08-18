
'use strict';

class HtmlWebpackStaticAssetsPlugin {
  constructor(htmlWebpackPlugin, options) {
    this.htmlWebpackPlugin = htmlWebpackPlugin;
    this.options = options;
  }

  throwError(message) {
    throw new Error(`html-webpack-static-assets-plugin: ${message}`);
  }

  logWarning(message) {
    console.warn(`html-webpack-static-assets-plugin: ${message}`);
  }

  apply(compiler) {

    compiler.hooks.compilation.tap(
      "HtmlWebpackStaticAssetsPlugin",
      compilation => {
        this.htmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync(
        "HtmlWebpackStaticAssetsPlugin",
          (data, cb) => {
            const { headTags, bodyTags } = this.options;

            if(!headTags && !bodyTags) {
              this.throwError("Provide headTags or bodyTags otherwise this plugin is useless. :(");
            }

            const { assets } = compilation;

            if (headTags) {
              data.headTags = this.getNewTagArray(data.headTags, headTags, assets);
            }

            if (bodyTags) {
              data.bodyTags = this.getNewTagArray(data.bodyTags, headTags, assets);
            }

            cb(null, data);
          }
        );
      }
    );
  }

  getNewTagArray(currentTagArray, optionsTags, assets){
    const newTagArray = [...currentTagArray];

    for (var filename in assets) {
      optionsTags.forEach(({ test, tagName, ...attributes }) => {

        if(test.constructor !== RegExp) {
          this.throwError("'test' option value needs to be a type of RegExp.");
        }

        if (test.test(filename)) {
          const newAttributes = {};
          const isItScriptTag = tagName === "script";

          if (isItScriptTag) {
            newAttributes.scr = filename;
          } else {
            newAttributes.href = filename;
          }

          const newTag = {
            tagName,
            voidTag: isItScriptTag,
            attributes: {
              ...newAttributes
            }
          };


          for (var attribute in attributes) {

            if (attribute === "type") {
              attributes[attribute] = attributes[attribute].replace(
                "[.ext]",
                filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2)
              );
            }

            newTag.attributes[attribute] = attributes[attribute];
          }

          newTagArray.push(newTag);
        }
      });
    }

    return newTagArray;
  }
}

const getNewTagArray = (currentTagArray, optionsTags, assets) => {

};

module.exports = HtmlWebpackStaticAssetsPlugin;
