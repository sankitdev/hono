type ResponseMessages = {
  AUTH: Record<string, string>;
  USER: Record<string, string>;
  ACCOUNT: Record<string, string>;
  TRANSACTION: Record<string, string>;
  ERROR: Record<string, string>;
};

export const RESPONSE_MESSAGES: ResponseMessages = {
  // Authentication-related messages
  AUTH: {
    LOGIN_SUCCESS: "Login successful.",
    LOGIN_FAILED: "Invalid credentials. Please try again.",
    LOGOUT_SUCCESS: "Logout successful.",
    TOKEN_EXPIRED: "Your session has expired. Please log in again.",
    ACCESS_DENIED: "Access denied. Insufficient permissions.",
  },

  // User-related messages
  USER: {
    CREATED: "User account created successfully.",
    UPDATED: "User details updated successfully.",
    DELETED: "User account deleted successfully.",
    NOT_FOUND: "User not found.",
    EMAIL_ALREADY_EXISTS: "Email is already in use.",
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

  // Transaction-related messages
  TRANSACTION: {
    SUCCESS: "Transaction completed successfully.",
    FAILED: "Transaction failed. Please try again.",
    PENDING: "Transaction is pending.",
    CANCELED: "Transaction has been canceled.",
    LIMIT_EXCEEDED: "Transaction limit exceeded.",
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
