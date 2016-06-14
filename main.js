const chalk      = require('chalk'),
      dateformat = require('dateformat'),
      _          = require("lodash");

module.exports = (keyword, enableTimestamp = true) => {

	if (typeof process.env.LOGAR_KEYWORD !== 'undefined') {
		keyword = process.env.LOGAR_KEYWORD;
	}

	function getTimestamp() {
		return '[' + chalk.grey(dateformat(new Date(), 'HH:MM:ss')) + ']';
	}

	function baseLog(isError) {
		if (enableTimestamp) {
			var time = getTimestamp();
			process.stdout.write(time + ' ');
		}

		if (isError) {
			process.stdout.write(chalk.bold.red(keyword + ' error: '));
		} else {
			process.stdout.write(chalk.bold.cyan(keyword + ': '));
		}
	}

	var logar = {
		//info
		i: (...args) => {
			baseLog();
			args[0] = chalk.yellow(args[0]);
			if (args.length > 1) {
				for (arg in args) {
					//skip the first entry
					if (arg !== 0) {
						args[arg] = chalk.green(args[arg]);
					}
				}
			}

			console.log.apply(console, args);
			return this;
		},

		//error
		e: (e) => {
			baseLog(true);
			console.error(e);
			return this;
		},

		success: (...args) => {
			baseLog();
			args[0] = chalk.bold.green("✓ " + args[0]);
			if (args.length > 1) {
				args[1] = chalk.yellow(args[1]);
			}
			console.log.apply(console, args);
			return this;
		},

		warn: (...args) => {
			baseLog();
			args[0] = chalk.bgYellow.red(" ❗ " + args[0] + " ");
			if (args.length > 1) {
				args[1] = chalk.yellow(args[1]);
			}
			console.log.apply(console, args);
			return this;
		},

		nl: () => {
			process.stdout.write("\n");
		},

		ll: (...args) => {
			baseLog();
			args[0] = chalk.bold.grey(args[0]);

			if (args.length > 1) {
				args[1] = chalk.grey(args[1]);
			}
			console.log.apply(console, args);
			return this;
		},

		loading: (message) => {

			var i               = 0;
			var loadingInterval = setInterval(function () {
				process.stdout.cursorTo(0);
				process.stdout.clearLine();
				baseLog();
				i        = (i + 1) % 4;
				var dots = new Array(i + 1).join(".");
				process.stdout.write(chalk.green(message + dots)); // write text
			}, 200);

			return function (completeMessage, err) {
				clearInterval(loadingInterval);
				process.stdout.cursorTo(0); // move cursor to beginning of line
				process.stdout.clearLine(); // clear current text

				if (completeMessage && !err) {
					logar.success(completeMessage);
				} else if (completeMessage && err) {
					logar.e(completeMessage);
					if (err !== true) {
						logar.e(err);
					}
				}

				return true;
			};
		}
	};

	return logar;
};
