/**
 * Created by Sulaiman on 2/10/2016.
 */

var winston = require('winston');
var fs = require('fs');
var logger;
var logDir = __dirname+'/repo';
var env = 'development';

if ( !fs.existsSync( logDir ) ) {
    // Create the directory if it does not exist
    fs.mkdirSync( logDir );
}

var customLevels = {
    levels: {
        debug: 0,
        info: 1,
        warn: 2,
        error: 3
    },
    colors: {
        debug: 'blue',
        info: 'green',
        warn: 'yellow',
        error: 'red'
    }
};

logger = new(winston.Logger)({
    levels: customLevels.levels,
    transports: [
        // setup console logging
        new(winston.transports.Console)({
            level: 'info',
            level: 'error',// Only write logs of info level or higher
            levels: customLevels.levels,
            colorize: true
        }),
        // setup logging to file
        new(winston.transports.File)({
            level: 'info',
            level: 'error',
            filename: logDir + '/logs.log',
            maxsize: 1024 * 1024 * 10, // 10MB
            levels: customLevels.levels
        }),
    ]
});

winston.addColors(customLevels.colors);
module.exports = logger;
/*
var Logging = function() {
    var loggers = {};

    // always return the singleton instance, if it has been initialised once already.
    if (Logging.prototype._singletonInstance) {
        return Logging.prototype._singletonInstance;
    }

    this.getLogger = function(name) {
        return loggers[name];
    }

    Logging.prototype.get = this.getLogger;

    loggers['project-debug.log'] = logger;
    //loggers['project-data.log'] = datalogger;

    Logging.prototype._singletonInstance = this;
};

new Logging(); // I decided to force instantiation of the singleton logger here

logger.info('Logging set up OK!');

module.exports = Logging;*/
