const { CognitoIdentityProviderClient, InitiateAuthCommand, SignUpCommand, AdminConfirmSignUpCommand } = require('@aws-sdk/client-cognito-identity-provider');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { Admin, Staff, Recruiter, Student } = require('../models');

const cognitoClient = new CognitoIdentityProviderClient({ region: process.env.AWS_REGION });

class AuthService {
  static async login(email, password, res) {
    const secretHash = crypto.createHmac('sha256', process.env.COGNITO_CLIENT_SECRET)
      .update(email + process.env.COGNITO_CLIENT_ID)
      .digest('base64');

    const params = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: process.env.COGNITO_CLIENT_ID,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
        SECRET_HASH: secretHash,
      },
    };
    try {
      const command = new InitiateAuthCommand(params);
      const response = await cognitoClient.send(command);
      console.log(response)
      const idToken = response.AuthenticationResult.IdToken;
      const decodedToken = jwt.decode(idToken);

      const userType = decodedToken['custom:userType'];
      const userId = decodedToken['sub'];
      console.log("userType", userType)
      console.log("userId", userId)
      // Set the JWT token and userType as cookies
      res.cookie('token', idToken, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(Date.now() + parseInt(process.env.JWT_EXPIRATION) * 60 * 60 * 1000),
      });

      res.cookie('userType', userType, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(Date.now() + parseInt(process.env.JWT_EXPIRATION) * 60 * 60 * 1000),
      });

      return { userType, userData: { id: userId, email } };
    } catch (error) {
      console.error("Error during login:", error);
      throw new Error('Invalid credentials');
    }
  }

  static async signUp(email, password, userType, additionalAttributes = {}) {
    const secretHash = crypto.createHmac('sha256', process.env.COGNITO_CLIENT_SECRET)
      .update(email + process.env.COGNITO_CLIENT_ID)
      .digest('base64');

    const params = {
      ClientId: process.env.COGNITO_CLIENT_ID,
      Username: email,
      Password: password,
      SecretHash: secretHash,
      UserAttributes: [
        { Name: 'email', Value: email },
        { Name: 'custom:userType', Value: userType },
        ...Object.keys(additionalAttributes).map(key => ({ Name: key, Value: additionalAttributes[key] })),
      ],
    };

    try {
      const command = new SignUpCommand(params);
      await cognitoClient.send(command);

      // Automatically confirm the user (optional, depending on your use case)
      const confirmParams = {
        UserPoolId: process.env.COGNITO_USER_POOL_ID,
        Username: email,
      };
      const confirmCommand = new AdminConfirmSignUpCommand(confirmParams);
      await cognitoClient.send(confirmCommand);

      return { message: 'User registered successfully' };
    } catch (error) {
      console.error("Error during sign up:", error);
      throw new Error('Error registering user: ' + error.message);
    }
  }

  static async logout(res) {
    // Clear cookies by setting them to empty and setting expiry in the past
    res.clearCookie('token', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(0),
    });
    res.clearCookie('userType', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(0),
    });
  }
}

module.exports = AuthService;
