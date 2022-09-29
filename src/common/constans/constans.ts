/**
 * Constants message
 */
export const MESSAGES = {
  /**
   * common messages
   */
  EXPIRES_IN: '3600s',
  CODE_ALREADY_EXIST: '23505',
  CODE_ROLE: '22P02',
  CODE_NOT_NULL: '23502',
  CODE_NOT_DELETE: '23503',
  VALIDATE_MESSAGE: 'message',
  INTERNAL_SERVER_ERROR: 'There is internal server, Please try again',
  NOT_FOUND: 'No data found',
  DELETE_SUCCESS: 'Deleted successfully',
  UPDATE_SUCCESS: 'Updated successfully',

  /**
   * User contstans
   */
  USER_NOT_FOUND: 'User not found',
  PROFILE_NOT_FOUND: 'Profile not found',
  USER_CREATE: 'User created',
  EMAIL_EXIST: 'Email exists',
  EMAIL_NOT_NULL: 'Email should not be null',
  AUTH_FAILED: 'Invalid credentials',
  USER_INVALID_ROLE: 'Invalid input value for role enum',
  USER_FETCH_SUCCESS: 'Users fetched successfully',

  /**
   * Book constants
   */
  BOOK_NOT_FOUND: 'Book not found',
  BOOK_NAME_EXIST: 'Book name already exists',
  BOOK_NOT_NULL: 'Book name should not be null',
  BOOK_ADDED_SUCCESS: 'Book addedd successfully',
  BOOK_SALE: 'Book sale successfully',
  BOOK_NOT_AVAILABLE: 'Book not available',

  /**
   * Author constants
   */
  AUTHOR_NOT_FOUND: 'Author not found',
  AUTHOR_NAME_EXIST: 'Author name already exists',
  AUTHOR_NOT_NULL: 'Author name should not be null',
  AUTHOR_NOT_DELETE:
    'Delete on table Author violates foreign key constraint on table book',
  AUTHOR_ADDED_SUCCESS: 'Author addedd successfully',
  AUTHOR_NOT_AVAILABLE: 'Author not available',
};
