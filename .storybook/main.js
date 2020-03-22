module.exports = {
  stories: ["../src/**/*.stories.tsx"],
  addons: [
    "@storybook/addon-actions/register",
    "@storybook/addon-viewport/register",
    "@storybook/addon-a11y/register",
    "@storybook/addon-backgrounds/register",
    {
      name: "@storybook/addon-docs/preset",
      options: {
        configureJSX: true
      }
    },
    "@storybook/preset-typescript"
  ]
};
