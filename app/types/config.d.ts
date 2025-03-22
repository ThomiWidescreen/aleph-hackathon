declare module "*/@config.json" {
  const config: {
    app: {
      name: string;
      description: string;
    };
    screens: {
      welcome: {
        title: string;
        placeholders: {
          name: string;
          description: string;
          button: string;
        };
      };
      feed: {
        title: string;
      };
      search: {
        title: string;
        placeholders: {
          search: string;
          filters: string;
        };
      };
      bottomNav: {
        items: {
          name: string;
          route: string;
        }[];
      };
    };
  };
  export default config;
} 