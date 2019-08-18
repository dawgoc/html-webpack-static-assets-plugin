<h2 align="center">Install</h2>

```bash
  npm i --save-dev html-webpack-static-assets-plugin
```

```bash
  yarn add --dev html-webpack-static-assets-plugin
```


This is an extenstion of [HtmlWebpackPlugin](http://webpack.js.org/) (version 4+ required!) that allows you to extend a list of tags (head and body) created by HtmlWebpackPlugin.
This plugin needs to be added after HtmlWebpackPlugin.

F.E preload fonts with a hashes in filename.

**webpack.config.js**
```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackStaticAssetsPlugin = require("html-webpack-static-assets-plugin");

module.exports = {
  [...], // Other options
  plugins: [
   new HtmlWebpackPlugin(),
   new HtmlWebpackStaticAssetsPlugin(HtmlWebpackPlugin, {
      headTags: [
        {
          test: /\.woff/,
          tagName: "link",
          rel: "preload",
          as: "font",
          type: "font/[.ext]",
          crossorigin: true
        }
      ]
    }),
  ]
}
```

This will generate a file `index.html`:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Webpack App</title>
    <link href="your_font_file_name.e233e73e5a234da8c6c66016c0c6c597.woff" rel="preload" as="font" type="font/woff" crossorigin>
    <link href="assets/your_font_file_name_2.47dcabd1d0b56f2718585fc6691c5d9e.woff" rel="preload" as="font" type="font/woff" crossorigin>
  </head>
  <body>
    <script src="index_bundle.js"></script>
  </body>
</html>
```

<h2 align="center">Options</h2>


| name     | type  | Default | Description                                |
|----------|-------|---------|--------------------------------------------|
| bodyTags | array | []      | A list of tags to be added to the body tag |
| headTags | array | []      | A list of tags to be added to the head tag |    


<h2 align="center">Single Tag Options</h2>

This is just overview. You are able to add any type of tag attribute. 

| name        | type    | Required | Description                                                     |
|-------------|---------|----------|-----------------------------------------------------------------|
| test        | RegExp  | yes      | RegExp to search for a files                                     |
| tagName     | String  | yes      | The name of the tag to be created                               |
| rel         | String  | no       | "rel" attribute                                                 |
| as          | String  | no       | "as" attribute                                                  |
| type        | String  | no       | "type" attribute ([.ext] will be converted to a file extension) |
| crossorigin | Boolean | no       | "crossorigin" attribute                                         |

