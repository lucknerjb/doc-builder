function hbsHelpers(hbs) {
  hbs.registerHelper("json", function(value) {
      return JSON.stringify(value);
  });
}

module.exports = hbsHelpers;
