const langs = new Map();

const registerLang = (locale, obj) => {
  langs.set(locale, obj);
};

const getLang = (locale = 'en_US') => langs.get(locale) || langs.get('en_US');

module.exports = {
  registerLang,
  getLang,
};
