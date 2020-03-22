const path = require("path");
const fs = require("fs");
const { mergeDeepLeft } = require("ramda");

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const storybookCfg = {
  module: {
    rules: [
      // {
      //   test: /\.(ts|tsx)$/,
      //   include: [resolveApp('src')],
      //   loaders: [
      //     {
      //       loader: require.resolve('babel-loader'),
      //       options: {
      //         presets: [['react-app', { flow: false, typescript: true }]],
      //       },
      //     },
      //     {
      //       // This is used to display TypeScript types under the "Docs" tab in Storybook.
      //       loader: require.resolve('react-docgen-typescript-loader'),
      //       options: {
      //         // Provide the path to your tsconfig.json so that your stories can
      //         // display types from outside each individual story.
      //         tsconfigPath: path.resolve(__dirname, '../tsconfig.json'),
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.(js|jsx)$/,
        include: [resolveApp("src"), resolveApp(".storybook")],

        loaders: [
          {
            loader: require.resolve("babel-loader"),
            options: {
              presets: [["react-app"]]
            }
          }
        ]
      },
      {
        test: /\.module\.scss$/,
        loaders: [
          require.resolve("style-loader"),
          {
            loader: require.resolve("css-loader"),
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: "[name]__[local]___[hash:base64:5]"
              }
            }
          },
          {
            loader: require.resolve("postcss-loader"),
            options: {
              ident: "postcss",
              plugins: () => [
                require("postcss-flexbugs-fixes"),
                require("postcss-preset-env")({
                  autoprefixer: {
                    flexbox: "no-2009"
                  },
                  stage: 3
                })
              ]
            }
          },
          {
            loader: require.resolve("sass-loader"),
            options: {
              importLoaders: 2,
              modules: true,
              localIdentName: "[name]__[local]___[hash:base64:5]"
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        exclude: /\.module\.scss$/,
        loaders: [
          require.resolve("style-loader"),
          {
            loader: require.resolve("css-loader"),
            options: {
              importLoaders: 1
            }
          },
          {
            loader: require.resolve("postcss-loader"),
            options: {
              ident: "postcss",
              plugins: () => [
                require("postcss-flexbugs-fixes"),
                require("postcss-preset-env")({
                  autoprefixer: {
                    flexbox: "no-2009"
                  },
                  stage: 3
                })
              ]
            }
          },
          {
            loader: require.resolve("sass-loader"),
            options: {
              importLoaders: 2
            }
          }
        ]
      },
      {
        test: /\.(svg|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/,
        loader: "file-loader",
        query: { name: "static/media/[name].[hash:8].[ext]" }
      },
      {
        test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
        loader: "url-loader",
        query: { limit: 10000, name: "static/media/[name].[hash:8].[ext]" }
      }
    ]
  }
};

module.exports = ({ config }) => {
  config.resolve.extensions.push(".ts", ".tsx", ".module.scss", ".scss");
  config.output.publicPath = process.env.PUBLIC_URL;

  return mergeDeepLeft(storybookCfg, config);
};
