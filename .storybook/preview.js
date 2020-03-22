import { addDecorator, addParameters } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";
import centered from "@storybook/addon-centered/react";

addDecorator(centered);
addDecorator(withA11y);

addParameters({
  backgrounds: [
    { name: "light", value: "#eff0f9", default: true },
    { name: "dark", value: "#392b64" }
  ]
});
