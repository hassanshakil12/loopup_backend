const REGEX = {
  AUTH: {
    USERNAME: {
      PATTERN: /^[a-zA-Z0-9_]{3,30}$/,
      MESSAGE:
        "Username must be between 3 and 30 characters long and can only contain letters, numbers, and underscores.",
    },
    PASSWORD: {
      PATTERN:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/,
      MESSAGE:
        "Password must be between 8 and 32 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    },
  },
};

module.exports = REGEX;
