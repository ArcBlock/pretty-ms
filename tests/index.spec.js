const prettyMilliseconds = require('../index');

test('prettify milliseconds', () => {
  expect(prettyMilliseconds(0)).toEqual('0ms');
  expect(prettyMilliseconds(1)).toEqual('1ms');
  expect(prettyMilliseconds(999)).toEqual('999ms');
  expect(prettyMilliseconds(1000)).toEqual('1s');
  expect(prettyMilliseconds(1000 + 400)).toEqual('1.4s');
  expect(prettyMilliseconds(1000 * 2 + 400)).toEqual('2.4s');
  expect(prettyMilliseconds(1000 * 55)).toEqual('55s');
  expect(prettyMilliseconds(1000 * 67)).toEqual('1m 7s');
  expect(prettyMilliseconds(1000 * 60 * 5)).toEqual('5m');
  expect(prettyMilliseconds(1000 * 60 * 67)).toEqual('1h 7m');
  expect(prettyMilliseconds(1000 * 60 * 60 * 12)).toEqual('12h');
  expect(prettyMilliseconds(1000 * 60 * 60 * 40)).toEqual('1d 16h');
  expect(prettyMilliseconds(1000 * 60 * 60 * 999)).toEqual('41d 15h');
  expect(prettyMilliseconds(1000 * 60 * 60 * 24 * 465)).toEqual('1y 100d');
  expect(prettyMilliseconds(1000 * 60 * 67 * 24 * 465)).toEqual('1y 154d 6h');
  expect(prettyMilliseconds(119999)).toEqual('1m 59.9s');
  expect(prettyMilliseconds(120000)).toEqual('2m');
});

test('have a compact option', () => {
  expect(prettyMilliseconds(1000 + 4, { compact: true })).toEqual('1s');
  expect(prettyMilliseconds(1000 * 60 * 60 * 999, { compact: true })).toEqual('41d');
  expect(prettyMilliseconds(1000 * 60 * 60 * 24 * 465, { compact: true })).toEqual('1y');
  expect(prettyMilliseconds(1000 * 60 * 67 * 24 * 465, { compact: true })).toEqual('1y');
});

test('have a unitCount option', () => {
  expect(prettyMilliseconds(1000 * 60, { unitCount: 0 })).toEqual('1m');
  expect(prettyMilliseconds(1000 * 60, { unitCount: 1 })).toEqual('1m');
  expect(prettyMilliseconds(1000 * 60 * 67, { unitCount: 1 })).toEqual('1h');
  expect(prettyMilliseconds(1000 * 60 * 67, { unitCount: 2 })).toEqual('1h 7m');
  expect(prettyMilliseconds(1000 * 60 * 67 * 24 * 465, { unitCount: 1 })).toEqual('1y');
  expect(prettyMilliseconds(1000 * 60 * 67 * 24 * 465, { unitCount: 2 })).toEqual('1y 154d');
  expect(prettyMilliseconds(1000 * 60 * 67 * 24 * 465, { unitCount: 3 })).toEqual('1y 154d 6h');
});

test('have a secondsDecimalDigits option', () => {
  expect(prettyMilliseconds(10000)).toEqual('10s');
  expect(prettyMilliseconds(33333)).toEqual('33.3s');
  expect(prettyMilliseconds(999, { secondsDecimalDigits: 0 })).toEqual('999ms');
  expect(prettyMilliseconds(1000, { secondsDecimalDigits: 0 })).toEqual('1s');
  expect(prettyMilliseconds(1999, { secondsDecimalDigits: 0 })).toEqual('1s');
  expect(prettyMilliseconds(2000, { secondsDecimalDigits: 0 })).toEqual('2s');
  expect(prettyMilliseconds(33333, { secondsDecimalDigits: 0 })).toEqual('33s');
  expect(prettyMilliseconds(33333, { secondsDecimalDigits: 4 })).toEqual('33.3330s');
});

test('have a millisecondsDecimalDigits option', () => {
  expect(prettyMilliseconds(33.333)).toEqual('33ms');
  expect(prettyMilliseconds(33.333, { millisecondsDecimalDigits: 0 })).toEqual('33ms');
  expect(prettyMilliseconds(33.333, { millisecondsDecimalDigits: 4 })).toEqual('33.3330ms');
});

test('have a keepDecimalsOnWholeSeconds option', () => {
  expect(
    prettyMilliseconds(1000 * 33, {
      secondsDecimalDigits: 2,
      keepDecimalsOnWholeSeconds: true,
    })
  ).toEqual('33.00s');
  expect(
    prettyMilliseconds(1000 * 33.00004, {
      secondsDecimalDigits: 2,
      keepDecimalsOnWholeSeconds: true,
    })
  ).toEqual('33.00s');
});

test('have a verbose option', () => {
  const fn = (milliseconds) => prettyMilliseconds(milliseconds, { verbose: true });

  expect(fn(0)).toEqual('0 milliseconds');
  expect(fn(0.1)).toEqual('1 millisecond');
  expect(fn(1)).toEqual('1 millisecond');
  expect(fn(1000)).toEqual('1 second');
  expect(fn(1000 + 400)).toEqual('1.4 seconds');
  expect(fn(1000 * 2 + 400)).toEqual('2.4 seconds');
  expect(fn(1000 * 5)).toEqual('5 seconds');
  expect(fn(1000 * 55)).toEqual('55 seconds');
  expect(fn(1000 * 67)).toEqual('1 minute 7 seconds');
  expect(fn(1000 * 60 * 5)).toEqual('5 minutes');
  expect(fn(1000 * 60 * 67)).toEqual('1 hour 7 minutes');
  expect(fn(1000 * 60 * 60 * 12)).toEqual('12 hours');
  expect(fn(1000 * 60 * 60 * 40)).toEqual('1 day 16 hours');
  expect(fn(1000 * 60 * 60 * 999)).toEqual('41 days 15 hours');
  expect(fn(1000 * 60 * 60 * 24 * 465)).toEqual('1 year 100 days');
  expect(fn(1000 * 60 * 67 * 24 * 465)).toEqual('1 year 154 days 6 hours');
});

test('have a separateMilliseconds option', () => {
  expect(prettyMilliseconds(1100, { separateMilliseconds: false })).toEqual('1.1s');
  expect(prettyMilliseconds(1100, { separateMilliseconds: true })).toEqual('1s 100ms');
});

test('have a formatSubMilliseconds option', () => {
  expect(prettyMilliseconds(0.4, { formatSubMilliseconds: true })).toEqual('400µs');
  expect(prettyMilliseconds(0.123571, { formatSubMilliseconds: true })).toEqual('123µs 571ns');
  expect(prettyMilliseconds(0.123456789, { formatSubMilliseconds: true })).toEqual('123µs 456ns');
  expect(
    prettyMilliseconds(60 * 60 * 1000 + 23 * 1000 + 433 + 0.123456, {
      formatSubMilliseconds: true,
    })
  ).toEqual('1h 23s 433ms 123µs 456ns');
});

test('work with verbose and compact options', () => {
  const fn = (milliseconds) =>
    prettyMilliseconds(milliseconds, {
      verbose: true,
      compact: true,
    });

  expect(fn(1000)).toEqual('1 second');
  expect(fn(1000 + 400)).toEqual('1 second');
  expect(fn(1000 * 2 + 400)).toEqual('2 seconds');
  expect(fn(1000 * 5)).toEqual('5 seconds');
  expect(fn(1000 * 55)).toEqual('55 seconds');
  expect(fn(1000 * 67)).toEqual('1 minute');
  expect(fn(1000 * 60 * 5)).toEqual('5 minutes');
  expect(fn(1000 * 60 * 67)).toEqual('1 hour');
  expect(fn(1000 * 60 * 60 * 12)).toEqual('12 hours');
  expect(fn(1000 * 60 * 60 * 40)).toEqual('1 day');
  expect(fn(1000 * 60 * 60 * 999)).toEqual('41 days');
  expect(fn(1000 * 60 * 60 * 24 * 465)).toEqual('1 year');
  expect(fn(1000 * 60 * 67 * 24 * 750)).toEqual('2 years');
});

test('work with verbose and unitCount options', () => {
  expect(prettyMilliseconds(1000 * 60, { verbose: true, unitCount: 1 })).toEqual('1 minute');
  expect(prettyMilliseconds(1000 * 60 * 67, { verbose: true, unitCount: 1 })).toEqual('1 hour');
  expect(prettyMilliseconds(1000 * 60 * 67, { verbose: true, unitCount: 2 })).toEqual('1 hour 7 minutes');
  expect(
    prettyMilliseconds(1000 * 60 * 67 * 24 * 465, {
      verbose: true,
      unitCount: 1,
    })
  ).toEqual('1 year');
  expect(
    prettyMilliseconds(1000 * 60 * 67 * 24 * 465, {
      verbose: true,
      unitCount: 2,
    })
  ).toEqual('1 year 154 days');
  expect(
    prettyMilliseconds(1000 * 60 * 67 * 24 * 465, {
      verbose: true,
      unitCount: 3,
    })
  ).toEqual('1 year 154 days 6 hours');
});

test('work with verbose and secondsDecimalDigits options', () => {
  const fn = (milliseconds) =>
    prettyMilliseconds(milliseconds, {
      verbose: true,
      secondsDecimalDigits: 4,
    });

  expect(fn(1000)).toEqual('1 second');
  expect(fn(1000 + 400)).toEqual('1.4000 seconds');
  expect(fn(1000 * 2 + 400)).toEqual('2.4000 seconds');
  expect(fn(1000 * 5 + 254)).toEqual('5.2540 seconds');
  expect(fn(33333)).toEqual('33.3330 seconds');
});

test('work with verbose and millisecondsDecimalDigits options', () => {
  const fn = (milliseconds) =>
    prettyMilliseconds(milliseconds, {
      verbose: true,
      millisecondsDecimalDigits: 4,
    });

  expect(fn(1)).toEqual('1.0000 millisecond');
  expect(fn(1 + 0.4)).toEqual('1.4000 milliseconds');
  expect(fn(1 * 2 + 0.4)).toEqual('2.4000 milliseconds');
  expect(fn(1 * 5 + 0.254)).toEqual('5.2540 milliseconds');
  expect(fn(33.333)).toEqual('33.3330 milliseconds');
});

test('work with verbose and formatSubMilliseconds options', () => {
  expect(prettyMilliseconds(0.4, { formatSubMilliseconds: true, verbose: true })).toEqual('400 microseconds');
  expect(
    prettyMilliseconds(0.123571, {
      formatSubMilliseconds: true,
      verbose: true,
    })
  ).toEqual('123 microseconds 571 nanoseconds');
  expect(
    prettyMilliseconds(0.123456789, {
      formatSubMilliseconds: true,
      verbose: true,
    })
  ).toEqual('123 microseconds 456 nanoseconds');
  expect(prettyMilliseconds(0.001, { formatSubMilliseconds: true, verbose: true })).toEqual('1 microsecond');
});

test('compact option overrides unitCount option', () => {
  expect(
    prettyMilliseconds(1000 * 60 * 67 * 24 * 465, {
      verbose: true,
      compact: true,
      unitCount: 1,
    })
  ).toEqual('1 year');
  expect(
    prettyMilliseconds(1000 * 60 * 67 * 24 * 465, {
      verbose: true,
      compact: true,
      unitCount: 2,
    })
  ).toEqual('1 year');
  expect(
    prettyMilliseconds(1000 * 60 * 67 * 24 * 465, {
      verbose: true,
      compact: true,
      unitCount: 3,
    })
  ).toEqual('1 year');
});

test('work with separateMilliseconds and formatSubMilliseconds options', () => {
  expect(
    prettyMilliseconds(1010.340067, {
      separateMilliseconds: true,
      formatSubMilliseconds: true,
    })
  ).toEqual('1s 10ms 340µs 67ns');
  expect(
    prettyMilliseconds(60 * 1000 + 34 + 0.000005, {
      separateMilliseconds: true,
      formatSubMilliseconds: true,
    })
  ).toEqual('1m 34ms 5ns');
});

test('properly rounds milliseconds with secondsDecimalDigits', () => {
  const fn = (milliseconds) =>
    prettyMilliseconds(milliseconds, {
      verbose: true,
      secondsDecimalDigits: 0,
    });
  expect(fn(3 * 60 * 1000)).toEqual('3 minutes');
  expect(fn(3 * 60 * 1000 - 1)).toEqual('2 minutes 59 seconds');
  expect(fn(365 * 24 * 3600 * 1e3)).toEqual('1 year');
  expect(fn(365 * 24 * 3600 * 1e3 - 1)).toEqual('364 days 23 hours 59 minutes 59 seconds');
  expect(fn(24 * 3600 * 1e3)).toEqual('1 day');
  expect(fn(24 * 3600 * 1e3 - 1)).toEqual('23 hours 59 minutes 59 seconds');
  expect(fn(3600 * 1e3)).toEqual('1 hour');
  expect(fn(3600 * 1e3 - 1)).toEqual('59 minutes 59 seconds');
  expect(fn(2 * 3600 * 1e3)).toEqual('2 hours');
  expect(fn(2 * 3600 * 1e3 - 1)).toEqual('1 hour 59 minutes 59 seconds');
});

test('`colonNotation` option', () => {
  // Default formats
  expect(prettyMilliseconds(1000, { colonNotation: true })).toEqual('0:01');
  expect(prettyMilliseconds(1543, { colonNotation: true })).toEqual('0:01.5');
  expect(prettyMilliseconds(1000 * 60, { colonNotation: true })).toEqual('1:00');
  expect(prettyMilliseconds(1000 * 90, { colonNotation: true })).toEqual('1:30');
  expect(prettyMilliseconds(95543, { colonNotation: true })).toEqual('1:35.5');
  expect(prettyMilliseconds(1000 * 60 * 10 + 543, { colonNotation: true })).toEqual('10:00.5');
  expect(
    prettyMilliseconds(1000 * 60 * 59 + 1000 * 59 + 543, {
      colonNotation: true,
    })
  ).toEqual('59:59.5');
  expect(
    prettyMilliseconds(1000 * 60 * 60 * 15 + 1000 * 60 * 59 + 1000 * 59 + 543, {
      colonNotation: true,
    })
  ).toEqual('15:59:59.5');

  // Together with `secondsDecimalDigits`
  expect(prettyMilliseconds(999, { colonNotation: true, secondsDecimalDigits: 0 })).toEqual('0:00');
  expect(prettyMilliseconds(999, { colonNotation: true, secondsDecimalDigits: 1 })).toEqual('0:00.9');
  expect(prettyMilliseconds(999, { colonNotation: true, secondsDecimalDigits: 2 })).toEqual('0:00.99');
  expect(prettyMilliseconds(999, { colonNotation: true, secondsDecimalDigits: 3 })).toEqual('0:00.999');
  expect(prettyMilliseconds(1000, { colonNotation: true, secondsDecimalDigits: 0 })).toEqual('0:01');
  expect(prettyMilliseconds(1000, { colonNotation: true, secondsDecimalDigits: 1 })).toEqual('0:01');
  expect(prettyMilliseconds(1000, { colonNotation: true, secondsDecimalDigits: 2 })).toEqual('0:01');
  expect(prettyMilliseconds(1000, { colonNotation: true, secondsDecimalDigits: 3 })).toEqual('0:01');
  expect(prettyMilliseconds(1001, { colonNotation: true, secondsDecimalDigits: 0 })).toEqual('0:01');
  expect(prettyMilliseconds(1001, { colonNotation: true, secondsDecimalDigits: 1 })).toEqual('0:01');
  expect(prettyMilliseconds(1001, { colonNotation: true, secondsDecimalDigits: 2 })).toEqual('0:01');
  expect(prettyMilliseconds(1001, { colonNotation: true, secondsDecimalDigits: 3 })).toEqual('0:01.001');
  expect(prettyMilliseconds(1543, { colonNotation: true, secondsDecimalDigits: 0 })).toEqual('0:01');
  expect(prettyMilliseconds(1543, { colonNotation: true, secondsDecimalDigits: 1 })).toEqual('0:01.5');
  expect(prettyMilliseconds(1543, { colonNotation: true, secondsDecimalDigits: 2 })).toEqual('0:01.54');
  expect(prettyMilliseconds(1543, { colonNotation: true, secondsDecimalDigits: 3 })).toEqual('0:01.543');
  expect(prettyMilliseconds(95543, { colonNotation: true, secondsDecimalDigits: 0 })).toEqual('1:35');
  expect(prettyMilliseconds(95543, { colonNotation: true, secondsDecimalDigits: 1 })).toEqual('1:35.5');
  expect(prettyMilliseconds(95543, { colonNotation: true, secondsDecimalDigits: 2 })).toEqual('1:35.54');
  expect(prettyMilliseconds(95543, { colonNotation: true, secondsDecimalDigits: 3 })).toEqual('1:35.543');
  expect(
    prettyMilliseconds(1000 * 60 * 10 + 543, {
      colonNotation: true,
      secondsDecimalDigits: 3,
    })
  ).toEqual('10:00.543');
  expect(
    prettyMilliseconds(1000 * 60 * 60 * 15 + 1000 * 60 * 59 + 1000 * 59 + 543, {
      colonNotation: true,
      secondsDecimalDigits: 3,
    })
  ).toEqual('15:59:59.543');

  // Together with `keepDecimalsOnWholeSeconds`
  expect(
    prettyMilliseconds(999, {
      colonNotation: true,
      secondsDecimalDigits: 0,
      keepDecimalsOnWholeSeconds: true,
    })
  ).toEqual('0:00');
  expect(
    prettyMilliseconds(999, {
      colonNotation: true,
      secondsDecimalDigits: 1,
      keepDecimalsOnWholeSeconds: true,
    })
  ).toEqual('0:00.9');
  expect(
    prettyMilliseconds(999, {
      colonNotation: true,
      secondsDecimalDigits: 2,
      keepDecimalsOnWholeSeconds: true,
    })
  ).toEqual('0:00.99');
  expect(
    prettyMilliseconds(999, {
      colonNotation: true,
      secondsDecimalDigits: 3,
      keepDecimalsOnWholeSeconds: true,
    })
  ).toEqual('0:00.999');
  expect(
    prettyMilliseconds(1000, {
      colonNotation: true,
      keepDecimalsOnWholeSeconds: true,
    })
  ).toEqual('0:01.0');
  expect(
    prettyMilliseconds(1000, {
      colonNotation: true,
      secondsDecimalDigits: 0,
      keepDecimalsOnWholeSeconds: true,
    })
  ).toEqual('0:01');
  expect(
    prettyMilliseconds(1000, {
      colonNotation: true,
      secondsDecimalDigits: 1,
      keepDecimalsOnWholeSeconds: true,
    })
  ).toEqual('0:01.0');
  expect(
    prettyMilliseconds(1000, {
      colonNotation: true,
      secondsDecimalDigits: 3,
      keepDecimalsOnWholeSeconds: true,
    })
  ).toEqual('0:01.000');
  expect(
    prettyMilliseconds(1000 * 90, {
      colonNotation: true,
      keepDecimalsOnWholeSeconds: true,
    })
  ).toEqual('1:30.0');
  expect(
    prettyMilliseconds(1000 * 90, {
      colonNotation: true,
      secondsDecimalDigits: 3,
      keepDecimalsOnWholeSeconds: true,
    })
  ).toEqual('1:30.000');
  expect(
    prettyMilliseconds(1000 * 60 * 10, {
      colonNotation: true,
      secondsDecimalDigits: 3,
      keepDecimalsOnWholeSeconds: true,
    })
  ).toEqual('10:00.000');

  // Together with `unitCount`
  expect(
    prettyMilliseconds(1000 * 90, {
      colonNotation: true,
      secondsDecimalDigits: 0,
      unitCount: 1,
    })
  ).toEqual('1');
  expect(
    prettyMilliseconds(1000 * 90, {
      colonNotation: true,
      secondsDecimalDigits: 0,
      unitCount: 2,
    })
  ).toEqual('1:30');
  expect(
    prettyMilliseconds(1000 * 60 * 90, {
      colonNotation: true,
      secondsDecimalDigits: 0,
      unitCount: 3,
    })
  ).toEqual('1:30:00');
  expect(
    prettyMilliseconds(95543, {
      colonNotation: true,
      secondsDecimalDigits: 1,
      unitCount: 1,
    })
  ).toEqual('1');
  expect(
    prettyMilliseconds(95543, {
      colonNotation: true,
      secondsDecimalDigits: 1,
      unitCount: 2,
    })
  ).toEqual('1:35.5');
  expect(
    prettyMilliseconds(95543 + 1000 * 60 * 60, {
      colonNotation: true,
      secondsDecimalDigits: 1,
      unitCount: 3,
    })
  ).toEqual('1:01:35.5');

  // Make sure incompatible options fall back to `colonNotation`
  expect(
    prettyMilliseconds(1000 * 60 * 59 + 1000 * 59 + 543, {
      colonNotation: true,
      formatSubMilliseconds: true,
    })
  ).toEqual('59:59.5');
  expect(
    prettyMilliseconds(1000 * 60 * 59 + 1000 * 59 + 543, {
      colonNotation: true,
      separateMilliseconds: true,
    })
  ).toEqual('59:59.5');
  expect(
    prettyMilliseconds(1000 * 60 * 59 + 1000 * 59 + 543, {
      colonNotation: true,
      verbose: true,
    })
  ).toEqual('59:59.5');
  expect(
    prettyMilliseconds(1000 * 60 * 59 + 1000 * 59 + 543, {
      colonNotation: true,
      compact: true,
    })
  ).toEqual('59:59.5');
});
