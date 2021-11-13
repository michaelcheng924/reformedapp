import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Root: {
        path: "root",
        screens: {
          Catechisms: "Catechisms",
          Confessions: "Confessions",
          Settings: "Settings",
          About: "About",
        },
      },
    },
  },
};
