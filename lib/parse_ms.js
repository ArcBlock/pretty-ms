const parseMilliseconds = require('parse-ms');
const { getLang: getLocale } = require('./register_lang');

const pluralize = (word, count) => (count === 1 ? word : `${word}s`);

const SECOND_ROUNDING_EPSILON = 0.0000001;

module.exports = (milliseconds, options = {}) => {
  if (!Number.isFinite(milliseconds)) {
    throw new TypeError('Expected a finite number');
  }

  if (options.colonNotation) {
    options.compact = false;
    options.formatSubMilliseconds = false;
    options.separateMilliseconds = false;
    options.verbose = false;
  }

  if (options.compact) {
    options.secondsDecimalDigits = 0;
    options.millisecondsDecimalDigits = 0;
  }

  const locale = getLocale(options.locale);
  const result = [];

  const floorDecimals = (value, decimalDigits) => {
    const flooredInterimValue = Math.floor(value * 10 ** decimalDigits + SECOND_ROUNDING_EPSILON);
    const flooredValue = Math.round(flooredInterimValue) / 10 ** decimalDigits;
    return flooredValue.toFixed(decimalDigits);
  };

  const add = (value, unit, valueToString) => {
    if (
      (result.length === 0 || !options.colonNotation) &&
      value === 0 &&
      !(options.colonNotation && unit === 'minute')
    ) {
      return;
    }

    const { long } = locale[unit] || getLocale('en_US')[unit];
    const { short } = locale[unit] || getLocale('en_US')[unit];

    let valueString = (valueToString || value || '0').toString();
    let prefix;
    let suffix;
    if (options.colonNotation) {
      prefix = result.length > 0 ? ':' : '';
      suffix = '';
      const wholeDigits = valueString.includes('.') ? valueString.split('.')[0].length : valueString.length;
      const minLength = result.length > 0 ? 2 : 1;
      valueString = '0'.repeat(Math.max(0, minLength - wholeDigits)) + valueString;
    } else {
      prefix = '';
      if (options.locale === 'zh_CN') {
        if (Object.values(parsed).filter((x) => x > 0).length > 1) {
          if (!parsed.days && !parsed.hours && parsed.minutes && options.compact) {
            suffix = long;
          } else {
            suffix = short;
          }
        } else if (parsed.minutes) {
          suffix = long;
        } else {
          suffix = short;
        }
      } else {
        suffix = options.verbose ? ` ${pluralize(long, value)}` : short;
      }
    }

    result.push(prefix + valueString + suffix);
  };

  const parsed = parseMilliseconds(milliseconds);

  add(Math.trunc(parsed.days / 365), 'year');
  add(parsed.days % 365, 'day');
  add(parsed.hours, 'hour');
  add(parsed.minutes, 'minute');

  if (
    options.separateMilliseconds ||
    options.formatSubMilliseconds ||
    (!options.colonNotation && milliseconds < 1000)
  ) {
    add(parsed.seconds, 'second');
    if (options.formatSubMilliseconds) {
      add(parsed.milliseconds, 'millisecond');
      add(parsed.microseconds, 'microsecond');
      add(parsed.nanoseconds, 'nanosecond');
    } else {
      const millisecondsAndBelow = parsed.milliseconds + parsed.microseconds / 1000 + parsed.nanoseconds / 1e6;

      const millisecondsDecimalDigits =
        typeof options.millisecondsDecimalDigits === 'number' ? options.millisecondsDecimalDigits : 0;

      const roundedMiliseconds =
        millisecondsAndBelow >= 1 ? Math.round(millisecondsAndBelow) : Math.ceil(millisecondsAndBelow);

      const millisecondsString = millisecondsDecimalDigits
        ? millisecondsAndBelow.toFixed(millisecondsDecimalDigits)
        : roundedMiliseconds;

      add(Number.parseFloat(millisecondsString, 10), 'millisecond', millisecondsString);
    }
  } else {
    const seconds = (milliseconds / 1000) % 60;
    const secondsDecimalDigits = typeof options.secondsDecimalDigits === 'number' ? options.secondsDecimalDigits : 1;
    const secondsFixed = floorDecimals(seconds, secondsDecimalDigits);
    const secondsString = options.keepDecimalsOnWholeSeconds ? secondsFixed : secondsFixed.replace(/\.0+$/, '');
    add(Number.parseFloat(secondsString, 10), 'second', secondsString);
  }

  if (result.length === 0) {
    const longUnit = (locale.millisecond || getLocale('en_US').millisecond).long;
    const shortUnit = (locale.millisecond || getLocale('en_US').millisecond).short;

    if (options.locale === 'zh_CN') {
      return `0${options.verbose ? `${longUnit}` : shortUnit}`;
    }

    return `0${options.verbose ? ` ${longUnit}s` : shortUnit}`;
  }

  if (options.compact) {
    return result[0];
  }

  if (typeof options.unitCount === 'number') {
    const separator = options.colonNotation ? '' : ' ';
    return result.slice(0, Math.max(options.unitCount, 1)).join(separator);
  }

  return options.colonNotation ? result.join('') : result.join(' ');
};
