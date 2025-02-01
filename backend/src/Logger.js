const { format } = require('date-fns');

const LogLevel = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  FATAL: 4,
};
class Logger {
  static COLORS = {
    RESET: '\x1b[0m',
    GRAY: '\x1b[90m',
    BLUE: '\x1b[34m',
    YELLOW: '\x1b[33m',
    RED: '\x1b[31m',
    BOLD: '\x1b[1m'
  };

  constructor(options = {}) {
    this.level = options.level ?? LogLevel.INFO;
    this.useTimestamp = options.timestamp ?? true;
    this.useColors = options.colors ?? true;
    this.prefix = options.prefix ?? '';
    this.outputToFile = options.outputToFile ?? false;
    this.logFilePath = options.logFilePath ?? 'app.log';
  }

  getTimestamp() {
    return format(new Date(), 'yyyy-MM-dd HH:mm:ss');
  }

  formatMessage(level, message) {
    const parts = [];
    
    if (this.useTimestamp) {
      parts.push(`[${this.getTimestamp()}]`);
    }

    if (this.prefix) {
      parts.push(`[${this.prefix}]`);
    }

    parts.push(`[${level}]`);
    parts.push(message);

    return parts.join(' ');
  }

  debug(message, ...args) {
    if (this.level <= LogLevel.DEBUG) {
      const formattedMessage = this.formatMessage('DEBUG', message);
      if (this.useColors) {
        console.debug(`${Logger.COLORS.GRAY}${formattedMessage}${Logger.COLORS.RESET}`, ...args);
      } else {
        console.debug(formattedMessage, ...args);
      }
      
    }
  }

  info(message, ...args) {
    if (this.level <= LogLevel.INFO) {
      const formattedMessage = this.formatMessage('INFO', message);
      if (this.useColors) {
        console.info(`${Logger.COLORS.BLUE}${formattedMessage}${Logger.COLORS.RESET}`, ...args);
      } else {
        console.info(formattedMessage, ...args);
      }
     
    }
  }

  warn(message, ...args) {
    if (this.level <= LogLevel.WARN) {
      const formattedMessage = this.formatMessage('WARN', message);
      if (this.useColors) {
        console.warn(`${Logger.COLORS.YELLOW}${formattedMessage}${Logger.COLORS.RESET}`, ...args);
      } else {
        console.warn(formattedMessage, ...args);
      }

    }
  }

  error(message, error, ...args) {
    if (this.level <= LogLevel.ERROR) {
      const formattedMessage = this.formatMessage('ERROR', message);
      if (this.useColors) {
        console.error(`${Logger.COLORS.RED}${formattedMessage}${Logger.COLORS.RESET}`, ...args);
        if (error) {
          console.error(`${Logger.COLORS.RED}${error.stack}${Logger.COLORS.RESET}`);
        }
      } else {
        console.error(formattedMessage, ...args);
        if (error) {
          console.error(error.stack);
        }
      }
    }
  }

  fatal(message, error, ...args) {
    if (this.level <= LogLevel.FATAL) {
      const formattedMessage = this.formatMessage('FATAL', message);
      if (this.useColors) {
        console.error(`${Logger.COLORS.RED}${Logger.COLORS.BOLD}${formattedMessage}${Logger.COLORS.RESET}`, ...args);
        if (error) {
          console.error(`${Logger.COLORS.RED}${Logger.COLORS.BOLD}${error.stack}${Logger.COLORS.RESET}`);
        }
      } else {
        console.error(formattedMessage, ...args);
        if (error) {
          console.error(error.stack);
        }
      }
    }
  }

  setLevel(level) {
    this.level = level;
  }

  setPrefix(prefix) {
    this.prefix = prefix;
  }

  enableTimestamp() {
    this.useTimestamp = true;
  }

  disableTimestamp() {
    this.useTimestamp = false;
  }

  enableColors() {
    this.useColors = true;
  }

  disableColors() {
    this.useColors = false;
  }
}

module.exports = { Logger, LogLevel}