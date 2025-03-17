export const RESPONSE_MESSAGES = {
  // Authentication-related messages
  AUTH: {
    VERIFIED_SUCCESS:
      "Your account has been successfully verified. You can now log in",
    ALREADY_VERIFIED: (userName: string) =>
      `Your account is already verified, ${userName}. You can proceed to log in.`,
    LOGIN_SUCCESS: "Login successful.",
    LOGIN_FAILED: "Invalid credentials. Please try again.",
    LOGOUT_SUCCESS: "Logout successful.",
    NO_TOKEN: "No token found in the request.",
    TOKEN_EXPIRED: "Token Expired",
    SESSION_EXPIRED: "Your session has expired. Please log in again.",
    ACCESS_DENIED: "Access denied. Insufficient permissions.",
    SESSION_REACHED:
      "Unable to create a new session. Please review your active sessions.",
  },

  // User-related messages
  USER: {
    CREATED: "User account created successfully.",
    UPDATED: "User details updated successfully.",
    DELETED: "User account deleted successfully.",
    NOT_FOUND: "User not found.",
    EMAIL_ALREADY_EXISTS: "Email is already in use.",
  },

  //Transaction-related messages
  TRANSACTION: {
    CREATED: "Transaction created successfully.",
    UPDATED: "Transaction details updated successfully.",
    SUCCESS: "Transaction completed successfully.",
    FAILED: "Transaction failed. Please try again.",
    PENDING: "Transaction is pending.",
    CANCELED: "Transaction has been canceled.",
    LIMIT_EXCEEDED: "Transaction limit exceeded.",
  },

  // Session-related messages
  SESSION: {
    CREATED: "Session Created.",
    DELETED: "Session deleted successfully.",
    NOT_FOUND: "Session not found.",
    SESSION_REACHED: "Unable to create a new session. Please review your active sessions.",
    SESSION_EXPIRED: "Your session has expired. Please log in again.",
    SESSION_LOCKED: "Your session is locked. Please contact support.",
  },

  // Account-related messages
  ACCOUNT: {
    CREATED: "Account created successfully.",
    UPDATED: "Account details updated successfully.",
    DELETED: "Account deleted successfully.",
    INSUFFICIENT_FUNDS: "Insufficient funds for this transaction.",
    NOT_FOUND: "Account not found.",
    ACCOUNT_LOCKED: "Your account is locked. Please contact support.",
  },

  // General error messages
  ERROR: {
    INTERNAL_SERVER_ERROR:
      "An unexpected error occurred. Please try again later.",
    BAD_REQUEST: "Invalid request. Please check your input.",
    NOT_FOUND: "The requested resource was not found.",
    UNAUTHORIZED: "You are not authorized to perform this action.",
    VALIDATION_FAILED: "Validation failed. Check the input data.",
  },
};
