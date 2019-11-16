# InstaKilo

### Cognito Sign Up Errors

- InvalidPasswordException: The password you have entered is invalid
    - Passwords must contain:
    - Lowercase letters
    - Uppercase letters
    - Numbers
    - Special characters

- InvalidUsernameException: The username you have entered is invalid
- InvalidEmailException: The email address you have entered is invalid
- UsernameExistsException: An account with that username already exists

### Cognito Confirm Sign Up Errors

- CodeMismatchException: The confirmation code you entered is incorrect
- NotAuthorizedException: This account has already been confirmed
- ExpiredCodeException: The confirmation code you entered has expired. Please request a new one

### Cognito Login Errors

- UserNotFoundException: The username you entered does not match any accounts in our system
- UserNotConfirmedException: You have not confirmed your account yet - Please check your email
- NotAuthorizedException: The password you entered is incorrect
