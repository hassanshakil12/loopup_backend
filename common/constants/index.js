exports.ENUMS = Object.freeze({
  PROFILE: {
    GENDER: {
      MALE: "male",
      FEMALE: "female",
      OTHER: "other",
    },
    ADDRESS_TYPE: {
      HOME: "home",
      WORK: "work",
      OTHER: "other",
    },
  },
});

exports.MESSAGE = {
  error: {
    auth: {
      forbidden: "Forbidden",
      invalidHeader: "Invalid authorization header",
      invalidToken: "Invalid authentication token",
      blockedUser: "User is blocked",
      invalidCredentials: "Invalid credentials",
    },
    server: {
      routeNotFound: "Route not found",
    },
    user: {
      notFound: "User not found",
      emailNotFound: "Email not found",
      usernameNotFound: "Username not found",
      emailAlreadyExists: "Email already exists",
      usernameAlreadyExists: "Username already exists",
    },
    profile: {
      notFound: "Profile not found",
      alreadyExists: "Profile already exists",
    },
    setting: {
      notFound: "Setting not found",
      alreadyExists: "Setting already exists",
    },
  },
};

exports.MODELS = Object.freeze({
  USER: "User",
  PROFILE: "Profile",
  SETTING: "Setting",
});

exports.REGEX = {
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
