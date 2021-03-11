module.exports = {
    css: {
      loaderOptions: {
        scss: {
            prependData: `
                @import "@/assets/sass/variables.scss";
                @import "@/assets/sass/functions.scss";
                @import "@/assets/sass/mixins.scss";
            `
        }
      }
    }
  };