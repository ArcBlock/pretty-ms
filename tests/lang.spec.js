const prettyMilliseconds = require('../index');

test('prettify milliseconds', () => {
  expect(prettyMilliseconds(0, { locale: 'zh_CN' })).toEqual('0毫秒');
  expect(prettyMilliseconds(1, { locale: 'zh_CN' })).toEqual('1毫秒');
  expect(prettyMilliseconds(999, { locale: 'zh_CN' })).toEqual('999毫秒');
  expect(prettyMilliseconds(1000, { locale: 'zh_CN' })).toEqual('1秒');
  expect(prettyMilliseconds(1000 + 400, { locale: 'zh_CN' })).toEqual('1.4秒');
  expect(prettyMilliseconds(1000 * 2 + 400, { locale: 'zh_CN' })).toEqual('2.4秒');
  expect(prettyMilliseconds(1000 * 55, { locale: 'zh_CN' })).toEqual('55秒');
  expect(prettyMilliseconds(1000 * 67, { locale: 'zh_CN' })).toEqual('1分 7秒');
  expect(prettyMilliseconds(1000 * 60 * 5, { locale: 'zh_CN' })).toEqual('5分钟');
  expect(prettyMilliseconds(1000 * 60 * 67, { locale: 'zh_CN' })).toEqual('1小时 7分');
  expect(prettyMilliseconds(1000 * 60 * 60 * 12, { locale: 'zh_CN' })).toEqual('12小时');
  expect(prettyMilliseconds(1000 * 60 * 60 * 40, { locale: 'zh_CN' })).toEqual('1天 16小时');
  expect(prettyMilliseconds(1000 * 60 * 60 * 999, { locale: 'zh_CN' })).toEqual('41天 15小时');
  expect(prettyMilliseconds(1000 * 60 * 60 * 24 * 465, { locale: 'zh_CN' })).toEqual('1年 100天');
  expect(prettyMilliseconds(1000 * 60 * 67 * 24 * 465, { locale: 'zh_CN' })).toEqual('1年 154天 6小时');
  expect(prettyMilliseconds(119999, { locale: 'zh_CN' })).toEqual('1分 59.9秒');
  expect(prettyMilliseconds(120000, { locale: 'zh_CN' })).toEqual('2分钟');
});

test('have a compact option', () => {
  expect(prettyMilliseconds(1000 + 4, { compact: true, locale: 'zh_CN' })).toEqual('1秒');
  expect(prettyMilliseconds(1000 * 60 * 60 * 999, { compact: true, locale: 'zh_CN' })).toEqual('41天');
  expect(
    prettyMilliseconds(1000 * 60 * 60 * 24 * 465, {
      compact: true,
      locale: 'zh_CN',
    })
  ).toEqual('1年');
  expect(
    prettyMilliseconds(1000 * 60 * 67 * 24 * 465, {
      compact: true,
      locale: 'zh_CN',
    })
  ).toEqual('1年');
});

test('have a unitCount option', () => {
  expect(prettyMilliseconds(1000 * 60, { unitCount: 0, locale: 'zh_CN' })).toEqual('1分钟');
  expect(prettyMilliseconds(1000 * 60, { unitCount: 1, locale: 'zh_CN' })).toEqual('1分钟');
  expect(prettyMilliseconds(1000 * 60 * 67, { unitCount: 1, locale: 'zh_CN' })).toEqual('1小时');
  expect(prettyMilliseconds(1000 * 60 * 67, { unitCount: 2, locale: 'zh_CN' })).toEqual('1小时 7分');
  expect(
    prettyMilliseconds(1000 * 60 * 67 * 24 * 465, {
      unitCount: 1,
      locale: 'zh_CN',
    })
  ).toEqual('1年');
  expect(
    prettyMilliseconds(1000 * 60 * 67 * 24 * 465, {
      unitCount: 2,
      locale: 'zh_CN',
    })
  ).toEqual('1年 154天');
  expect(
    prettyMilliseconds(1000 * 60 * 67 * 24 * 465, {
      unitCount: 3,
      locale: 'zh_CN',
    })
  ).toEqual('1年 154天 6小时');
});

test('have a secondsDecimalDigits option', () => {
  expect(prettyMilliseconds(10000, { locale: 'zh_CN' })).toEqual('10秒');
  expect(prettyMilliseconds(33333, { locale: 'zh_CN' })).toEqual('33.3秒');
  expect(prettyMilliseconds(999, { secondsDecimalDigits: 0, locale: 'zh_CN' })).toEqual('999毫秒');
  expect(prettyMilliseconds(1000, { secondsDecimalDigits: 0, locale: 'zh_CN' })).toEqual('1秒');
  expect(prettyMilliseconds(1999, { secondsDecimalDigits: 0, locale: 'zh_CN' })).toEqual('1秒');
  expect(prettyMilliseconds(2000, { secondsDecimalDigits: 0, locale: 'zh_CN' })).toEqual('2秒');
  expect(prettyMilliseconds(33333, { secondsDecimalDigits: 0, locale: 'zh_CN' })).toEqual('33秒');
  expect(prettyMilliseconds(33333, { secondsDecimalDigits: 4, locale: 'zh_CN' })).toEqual('33.3330秒');
});

test('have a millisecondsDecimalDigits option', () => {
  expect(prettyMilliseconds(33.333, { locale: 'zh_CN' })).toEqual('33毫秒');
  expect(
    prettyMilliseconds(33.333, {
      millisecondsDecimalDigits: 0,
      locale: 'zh_CN',
    })
  ).toEqual('33毫秒');
  expect(
    prettyMilliseconds(33.333, {
      millisecondsDecimalDigits: 4,
      locale: 'zh_CN',
    })
  ).toEqual('33.3330毫秒');
});

test('have a keepDecimalsOnWholeSeconds option', () => {
  expect(
    prettyMilliseconds(1000 * 33, {
      secondsDecimalDigits: 2,
      keepDecimalsOnWholeSeconds: true,
      locale: 'zh_CN',
    })
  ).toEqual('33.00秒');
  expect(
    prettyMilliseconds(1000 * 33.00004, {
      secondsDecimalDigits: 2,
      keepDecimalsOnWholeSeconds: true,
      locale: 'zh_CN',
    })
  ).toEqual('33.00秒');
});

test('have a verbose option', () => {
  const fn = (milliseconds) => prettyMilliseconds(milliseconds, { verbose: true, locale: 'zh_CN' });

  expect(fn(0)).toEqual('0毫秒');
  expect(fn(0.1)).toEqual('1毫秒');
  expect(fn(1)).toEqual('1毫秒');
  expect(fn(1000)).toEqual('1秒');
  expect(fn(1000 + 400)).toEqual('1.4秒');
  expect(fn(1000 * 2 + 400)).toEqual('2.4秒');
  expect(fn(1000 * 5)).toEqual('5秒');
  expect(fn(1000 * 55)).toEqual('55秒');
  expect(fn(1000 * 67)).toEqual('1分 7秒');
  expect(fn(1000 * 60 * 5)).toEqual('5分钟');
  expect(fn(1000 * 60 * 67)).toEqual('1小时 7分');
  expect(fn(1000 * 60 * 60 * 12)).toEqual('12小时');
  expect(fn(1000 * 60 * 60 * 40)).toEqual('1天 16小时');
  expect(fn(1000 * 60 * 60 * 999)).toEqual('41天 15小时');
  expect(fn(1000 * 60 * 60 * 24 * 465)).toEqual('1年 100天');
  expect(fn(1000 * 60 * 67 * 24 * 465)).toEqual('1年 154天 6小时');
});

test('have a separateMilliseconds option', () => {
  expect(prettyMilliseconds(1100, { separateMilliseconds: false, locale: 'zh_CN' })).toEqual('1.1秒');
  expect(prettyMilliseconds(1100, { separateMilliseconds: true, locale: 'zh_CN' })).toEqual('1秒 100毫秒');
});

test('have a formatSubMilliseconds option', () => {
  expect(prettyMilliseconds(0.4, { formatSubMilliseconds: true, locale: 'zh_CN' })).toEqual('400微秒');
  expect(
    prettyMilliseconds(0.123571, {
      formatSubMilliseconds: true,
      locale: 'zh_CN',
    })
  ).toEqual('123微秒 571纳秒');
  expect(
    prettyMilliseconds(0.123456789, {
      formatSubMilliseconds: true,
      locale: 'zh_CN',
    })
  ).toEqual('123微秒 456纳秒');
  expect(
    prettyMilliseconds(60 * 60 * 1000 + 23 * 1000 + 433 + 0.123456, {
      formatSubMilliseconds: true,
      locale: 'zh_CN',
    })
  ).toEqual('1小时 23秒 433毫秒 123微秒 456纳秒');
});

test('work with verbose and compact options', () => {
  const fn = (milliseconds) =>
    prettyMilliseconds(milliseconds, {
      verbose: true,
      compact: true,
      locale: 'zh_CN',
    });

  expect(fn(1000)).toEqual('1秒');
  expect(fn(1000 + 400)).toEqual('1秒');
  expect(fn(1000 * 2 + 400)).toEqual('2秒');
  expect(fn(1000 * 5)).toEqual('5秒');
  expect(fn(1000 * 55)).toEqual('55秒');
  expect(fn(1000 * 67)).toEqual('1分钟');
  expect(fn(1000 * 60 * 5)).toEqual('5分钟');
  expect(fn(1000 * 60 * 67)).toEqual('1小时');
  expect(fn(1000 * 60 * 60 * 12)).toEqual('12小时');
  expect(fn(1000 * 60 * 60 * 40)).toEqual('1天');
  expect(fn(1000 * 60 * 60 * 999)).toEqual('41天');
  expect(fn(1000 * 60 * 60 * 24 * 465)).toEqual('1年');
  expect(fn(1000 * 60 * 67 * 24 * 750)).toEqual('2年');
});

test('work with verbose and unitCount options', () => {
  expect(
    prettyMilliseconds(1000 * 60, {
      verbose: true,
      unitCount: 1,
      locale: 'zh_CN',
    })
  ).toEqual('1分钟');
  expect(
    prettyMilliseconds(1000 * 60 * 67, {
      verbose: true,
      unitCount: 1,
      locale: 'zh_CN',
    })
  ).toEqual('1小时');
  expect(
    prettyMilliseconds(1000 * 60 * 67, {
      verbose: true,
      unitCount: 2,
      locale: 'zh_CN',
    })
  ).toEqual('1小时 7分');
  expect(
    prettyMilliseconds(1000 * 60 * 67 * 24 * 465, {
      verbose: true,
      unitCount: 1,
      locale: 'zh_CN',
    })
  ).toEqual('1年');
  expect(
    prettyMilliseconds(1000 * 60 * 67 * 24 * 465, {
      verbose: true,
      unitCount: 2,
      locale: 'zh_CN',
    })
  ).toEqual('1年 154天');
  expect(
    prettyMilliseconds(1000 * 60 * 67 * 24 * 465, {
      verbose: true,
      unitCount: 3,
      locale: 'zh_CN',
    })
  ).toEqual('1年 154天 6小时');
});

test('work with verbose and secondsDecimalDigits options', () => {
  const fn = (milliseconds) =>
    prettyMilliseconds(milliseconds, {
      verbose: true,
      secondsDecimalDigits: 4,
      locale: 'zh_CN',
    });

  expect(fn(1000)).toEqual('1秒');
  expect(fn(1000 + 400)).toEqual('1.4000秒');
  expect(fn(1000 * 2 + 400)).toEqual('2.4000秒');
  expect(fn(1000 * 5 + 254)).toEqual('5.2540秒');
  expect(fn(33333)).toEqual('33.3330秒');
});

test('work with verbose and millisecondsDecimalDigits options', () => {
  const fn = (milliseconds) =>
    prettyMilliseconds(milliseconds, {
      verbose: true,
      millisecondsDecimalDigits: 4,
      locale: 'zh_CN',
    });

  expect(fn(1)).toEqual('1.0000毫秒');
  expect(fn(1 + 0.4)).toEqual('1.4000毫秒');
  expect(fn(1 * 2 + 0.4)).toEqual('2.4000毫秒');
  expect(fn(1 * 5 + 0.254)).toEqual('5.2540毫秒');
  expect(fn(33.333)).toEqual('33.3330毫秒');
});

test('work with verbose and formatSubMilliseconds options', () => {
  expect(
    prettyMilliseconds(0.4, {
      formatSubMilliseconds: true,
      verbose: true,
      locale: 'zh_CN',
    })
  ).toEqual('400微秒');
  expect(
    prettyMilliseconds(0.123571, {
      formatSubMilliseconds: true,
      verbose: true,
      locale: 'zh_CN',
    })
  ).toEqual('123微秒 571纳秒');
  expect(
    prettyMilliseconds(0.123456789, {
      formatSubMilliseconds: true,
      verbose: true,
      locale: 'zh_CN',
    })
  ).toEqual('123微秒 456纳秒');
  expect(
    prettyMilliseconds(0.001, {
      formatSubMilliseconds: true,
      verbose: true,
      locale: 'zh_CN',
    })
  ).toEqual('1微秒');
});

test('compact option overrides unitCount option', () => {
  expect(
    prettyMilliseconds(1000 * 60 * 67 * 24 * 465, {
      verbose: true,
      compact: true,
      unitCount: 1,
      locale: 'zh_CN',
    })
  ).toEqual('1年');
  expect(
    prettyMilliseconds(1000 * 60 * 67 * 24 * 465, {
      verbose: true,
      compact: true,
      unitCount: 2,
      locale: 'zh_CN',
    })
  ).toEqual('1年');
  expect(
    prettyMilliseconds(1000 * 60 * 67 * 24 * 465, {
      verbose: true,
      compact: true,
      unitCount: 3,
      locale: 'zh_CN',
    })
  ).toEqual('1年');
});

test('work with separateMilliseconds and formatSubMilliseconds options', () => {
  expect(
    prettyMilliseconds(1010.340067, {
      separateMilliseconds: true,
      formatSubMilliseconds: true,
      locale: 'zh_CN',
    })
  ).toEqual('1秒 10毫秒 340微秒 67纳秒');
  expect(
    prettyMilliseconds(60 * 1000 + 34 + 0.000005, {
      separateMilliseconds: true,
      formatSubMilliseconds: true,
      locale: 'zh_CN',
    })
  ).toEqual('1分 34毫秒 5纳秒');
});

test('`colonNotation` option', () => {
  // Default formats
  expect(prettyMilliseconds(1000, { colonNotation: true, locale: 'zh_CN' })).toEqual('0:01');
  expect(prettyMilliseconds(1543, { colonNotation: true, locale: 'zh_CN' })).toEqual('0:01.5');
  expect(prettyMilliseconds(1000 * 60, { colonNotation: true, locale: 'zh_CN' })).toEqual('1:00');
  expect(prettyMilliseconds(1000 * 90, { colonNotation: true, locale: 'zh_CN' })).toEqual('1:30');
  expect(prettyMilliseconds(95543, { colonNotation: true, locale: 'zh_CN' })).toEqual('1:35.5');
  expect(
    prettyMilliseconds(1000 * 60 * 10 + 543, {
      colonNotation: true,
      locale: 'zh_CN',
    })
  ).toEqual('10:00.5');
  expect(
    prettyMilliseconds(1000 * 60 * 59 + 1000 * 59 + 543, {
      colonNotation: true,
      locale: 'zh_CN',
    })
  ).toEqual('59:59.5');
  expect(
    prettyMilliseconds(1000 * 60 * 60 * 15 + 1000 * 60 * 59 + 1000 * 59 + 543, {
      colonNotation: true,
      locale: 'zh_CN',
    })
  ).toEqual('15:59:59.5');

  // Together with `secondsDecimalDigits`
  expect(
    prettyMilliseconds(999, {
      colonNotation: true,
      secondsDecimalDigits: 0,
      locale: 'zh_CN',
    })
  ).toEqual('0:00');
  expect(
    prettyMilliseconds(999, {
      colonNotation: true,
      secondsDecimalDigits: 1,
      locale: 'zh_CN',
    })
  ).toEqual('0:00.9');
  expect(
    prettyMilliseconds(999, {
      colonNotation: true,
      secondsDecimalDigits: 2,
      locale: 'zh_CN',
    })
  ).toEqual('0:00.99');
  expect(
    prettyMilliseconds(999, {
      colonNotation: true,
      secondsDecimalDigits: 3,
      locale: 'zh_CN',
    })
  ).toEqual('0:00.999');
  expect(
    prettyMilliseconds(1000, {
      colonNotation: true,
      secondsDecimalDigits: 0,
      locale: 'zh_CN',
    })
  ).toEqual('0:01');
  expect(
    prettyMilliseconds(1000, {
      colonNotation: true,
      secondsDecimalDigits: 1,
      locale: 'zh_CN',
    })
  ).toEqual('0:01');
  expect(
    prettyMilliseconds(1000, {
      colonNotation: true,
      secondsDecimalDigits: 2,
      locale: 'zh_CN',
    })
  ).toEqual('0:01');
  expect(
    prettyMilliseconds(1000, {
      colonNotation: true,
      secondsDecimalDigits: 3,
      locale: 'zh_CN',
    })
  ).toEqual('0:01');
  expect(
    prettyMilliseconds(1001, {
      colonNotation: true,
      secondsDecimalDigits: 0,
      locale: 'zh_CN',
    })
  ).toEqual('0:01');
  expect(
    prettyMilliseconds(1001, {
      colonNotation: true,
      secondsDecimalDigits: 1,
      locale: 'zh_CN',
    })
  ).toEqual('0:01');
  expect(
    prettyMilliseconds(1001, {
      colonNotation: true,
      secondsDecimalDigits: 2,
      locale: 'zh_CN',
    })
  ).toEqual('0:01');
  expect(
    prettyMilliseconds(1001, {
      colonNotation: true,
      secondsDecimalDigits: 3,
      locale: 'zh_CN',
    })
  ).toEqual('0:01.001');
  expect(
    prettyMilliseconds(1543, {
      colonNotation: true,
      secondsDecimalDigits: 0,
      locale: 'zh_CN',
    })
  ).toEqual('0:01');
  expect(
    prettyMilliseconds(1543, {
      colonNotation: true,
      secondsDecimalDigits: 1,
      locale: 'zh_CN',
    })
  ).toEqual('0:01.5');
  expect(
    prettyMilliseconds(1543, {
      colonNotation: true,
      secondsDecimalDigits: 2,
      locale: 'zh_CN',
    })
  ).toEqual('0:01.54');
  expect(
    prettyMilliseconds(1543, {
      colonNotation: true,
      secondsDecimalDigits: 3,
      locale: 'zh_CN',
    })
  ).toEqual('0:01.543');
  expect(
    prettyMilliseconds(95543, {
      colonNotation: true,
      secondsDecimalDigits: 0,
      locale: 'zh_CN',
    })
  ).toEqual('1:35');
  expect(
    prettyMilliseconds(95543, {
      colonNotation: true,
      secondsDecimalDigits: 1,
      locale: 'zh_CN',
    })
  ).toEqual('1:35.5');
  expect(
    prettyMilliseconds(95543, {
      colonNotation: true,
      secondsDecimalDigits: 2,
      locale: 'zh_CN',
    })
  ).toEqual('1:35.54');
  expect(
    prettyMilliseconds(95543, {
      colonNotation: true,
      secondsDecimalDigits: 3,
      locale: 'zh_CN',
    })
  ).toEqual('1:35.543');
  expect(
    prettyMilliseconds(1000 * 60 * 10 + 543, {
      colonNotation: true,
      secondsDecimalDigits: 3,
      locale: 'zh_CN',
    })
  ).toEqual('10:00.543');
  expect(
    prettyMilliseconds(1000 * 60 * 60 * 15 + 1000 * 60 * 59 + 1000 * 59 + 543, {
      colonNotation: true,
      secondsDecimalDigits: 3,
      locale: 'zh_CN',
    })
  ).toEqual('15:59:59.543');

  // Together with `keepDecimalsOnWholeSeconds`
  expect(
    prettyMilliseconds(999, {
      colonNotation: true,
      secondsDecimalDigits: 0,
      keepDecimalsOnWholeSeconds: true,
      locale: 'zh_CN',
    })
  ).toEqual('0:00');
  expect(
    prettyMilliseconds(999, {
      colonNotation: true,
      secondsDecimalDigits: 1,
      keepDecimalsOnWholeSeconds: true,
      locale: 'zh_CN',
    })
  ).toEqual('0:00.9');
  expect(
    prettyMilliseconds(999, {
      colonNotation: true,
      secondsDecimalDigits: 2,
      keepDecimalsOnWholeSeconds: true,
      locale: 'zh_CN',
    })
  ).toEqual('0:00.99');
  expect(
    prettyMilliseconds(999, {
      colonNotation: true,
      secondsDecimalDigits: 3,
      keepDecimalsOnWholeSeconds: true,
      locale: 'zh_CN',
    })
  ).toEqual('0:00.999');
  expect(
    prettyMilliseconds(1000, {
      colonNotation: true,
      keepDecimalsOnWholeSeconds: true,
      locale: 'zh_CN',
    })
  ).toEqual('0:01.0');
  expect(
    prettyMilliseconds(1000, {
      colonNotation: true,
      secondsDecimalDigits: 0,
      keepDecimalsOnWholeSeconds: true,
      locale: 'zh_CN',
    })
  ).toEqual('0:01');
  expect(
    prettyMilliseconds(1000, {
      colonNotation: true,
      secondsDecimalDigits: 1,
      keepDecimalsOnWholeSeconds: true,
      locale: 'zh_CN',
    })
  ).toEqual('0:01.0');
  expect(
    prettyMilliseconds(1000, {
      colonNotation: true,
      secondsDecimalDigits: 3,
      keepDecimalsOnWholeSeconds: true,
      locale: 'zh_CN',
    })
  ).toEqual('0:01.000');
  expect(
    prettyMilliseconds(1000 * 90, {
      colonNotation: true,
      keepDecimalsOnWholeSeconds: true,
      locale: 'zh_CN',
    })
  ).toEqual('1:30.0');
  expect(
    prettyMilliseconds(1000 * 90, {
      colonNotation: true,
      secondsDecimalDigits: 3,
      keepDecimalsOnWholeSeconds: true,
      locale: 'zh_CN',
    })
  ).toEqual('1:30.000');
  expect(
    prettyMilliseconds(1000 * 60 * 10, {
      colonNotation: true,
      secondsDecimalDigits: 3,
      keepDecimalsOnWholeSeconds: true,
      locale: 'zh_CN',
    })
  ).toEqual('10:00.000');

  // Together with `unitCount`
  expect(
    prettyMilliseconds(1000 * 90, {
      colonNotation: true,
      secondsDecimalDigits: 0,
      unitCount: 1,
      locale: 'zh_CN',
    })
  ).toEqual('1');
  expect(
    prettyMilliseconds(1000 * 90, {
      colonNotation: true,
      secondsDecimalDigits: 0,
      unitCount: 2,
      locale: 'zh_CN',
    })
  ).toEqual('1:30');
  expect(
    prettyMilliseconds(1000 * 60 * 90, {
      colonNotation: true,
      secondsDecimalDigits: 0,
      unitCount: 3,
      locale: 'zh_CN',
    })
  ).toEqual('1:30:00');
  expect(
    prettyMilliseconds(95543, {
      colonNotation: true,
      secondsDecimalDigits: 1,
      unitCount: 1,
      locale: 'zh_CN',
    })
  ).toEqual('1');
  expect(
    prettyMilliseconds(95543, {
      colonNotation: true,
      secondsDecimalDigits: 1,
      unitCount: 2,
      locale: 'zh_CN',
    })
  ).toEqual('1:35.5');
  expect(
    prettyMilliseconds(95543 + 1000 * 60 * 60, {
      colonNotation: true,
      secondsDecimalDigits: 1,
      unitCount: 3,
      locale: 'zh_CN',
    })
  ).toEqual('1:01:35.5');

  // Make sure incompatible options fall back to `colonNotation`
  expect(
    prettyMilliseconds(1000 * 60 * 59 + 1000 * 59 + 543, {
      colonNotation: true,
      formatSubMilliseconds: true,
      locale: 'zh_CN',
    })
  ).toEqual('59:59.5');
  expect(
    prettyMilliseconds(1000 * 60 * 59 + 1000 * 59 + 543, {
      colonNotation: true,
      separateMilliseconds: true,
      locale: 'zh_CN',
    })
  ).toEqual('59:59.5');
  expect(
    prettyMilliseconds(1000 * 60 * 59 + 1000 * 59 + 543, {
      colonNotation: true,
      verbose: true,
      locale: 'zh_CN',
    })
  ).toEqual('59:59.5');
  expect(
    prettyMilliseconds(1000 * 60 * 59 + 1000 * 59 + 543, {
      colonNotation: true,
      compact: true,
      locale: 'zh_CN',
    })
  ).toEqual('59:59.5');
});
