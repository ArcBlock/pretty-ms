const en_US = require('./lang/en');
const zh_CN = require('./lang/zh');

const { registerLang } = require('./lib/register_lang');
const prettyMilliseconds = require('./lib/parse_ms');

registerLang('en_US', en_US);
registerLang('zh_CN', zh_CN);

prettyMilliseconds.registerLang = registerLang;

module.exports = prettyMilliseconds;
