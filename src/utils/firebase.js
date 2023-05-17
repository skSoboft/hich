import dotenv from "dotenv";
import admin from "firebase-admin";
dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert({
    type: "service_account",
    project_id: "hich-92818",
    private_key_id: "89efc87c321e8e30c5c17f66be108b3b4d2dbed3",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDlDVIBhdNc504Q\nAOo8GbP4oiwXz71XyapDt7ZCB/LJkqeni84naL6sp19KzUZp0YRYOtKQQ75n65dk\nAYoy0I4UI6HfKPwx4WsibeYtU+L0zKlDFNtoOawfTEXkImZ/pZ10c0FJDzvDiVPE\n+NX/FQn/l2cWaH3nZyIeHpBewupZ88IwggQzfCo4X2DHOEFG3xgB7h5zwTdrMwHj\nSBIstN2wDtZRgNyTyBfE542SQkYsU2ae4Yctz64dJJearuFefxso1QzhJJa+HFdN\nc8TVj+NIEduISTuuFrTZyj3cghqcxEhz91a0Ce5Hrtaj6dGMpWIc7/TZa2q8xNGb\n2QZIA1hzAgMBAAECggEAHiiL1KF/O+tErvy/2pvzw1fvAE+c+ZMW9QWaXMVZJUtH\nAdt5kFzNRkRfWqT+kW5Bw7AzC0WwK1SswUEmphwpqOMsLArkcdjhV04rEWrLJjpQ\nSwHTBb0aOaC8TxZscoAm5C9MuEbmMo/BVN0CqCxn/Zw8uYmWkkJVDqwtjByT6LXc\n1T92i+OxxdnEsq7DsgA+E/A0GLVs/tPCFpdyEf6ZzKKtChyWXHqK9iZQjv2MaKoO\nnvMKvcSMdLep5oOVzHmyho9Th8NWL+Dja9fh2Lm1KbAEmJIHIqzVIBepRbE2fFl7\nBgFFsmjjcC9RZxVhLIHfyg8/b8T5BpeK4YbONmAKyQKBgQD9d5pxrACPKFyafY8u\nqEh1cWq9CrW6WAN0GSD8FG6E0m78AfPE8ltOAwVE6KU9rrMSqLe7zPqXn0OLbmBi\nEusKwJ7i6LMFdjxll5RmsEGFIa5ejbeSzoTWtBLvTY+nccgZM4yyjLukhl8Yavui\n8h/ywc2gmVZYaZ/EQsQGyfDc7QKBgQDnV0KoS23KbNqPF840gbG4EWji8NjEHvD8\n4joNxl9zrZQsaCB3RrwL3Y4vd0PAinz0uqF7XvRo9Y3IUYZaB/s3tXCx7vvRrquK\n671Rm6mgxW4hYMjKWNJIF4L+D2wUuEq7l/xn8CqaTMkBhpsqPu/BD93mv1fjfize\nzDsCe8e+3wKBgQCYMBYlpnb3fe6MPFOaWiSXj6/dLe8LogkAzo3FjacGTSuiWLG7\nUSGNZ7bkNyPwM1MGIxOeyWa1X0U5FN7+RAmofRtpdvr2jpWZEjhip/XPL/f4gfL1\nTNbp61lrIhDdIy5YI2GZW3LXSG8UxDevEN4p7j++7BKyJ0lsmAIHaX0byQKBgFwb\nPPnelkbrEhW4x6vWG1kK7XS1qchj/VTiCXUkjypyaLVJe+uhaQtcWdkCJiKJwPh7\nOgHxq2QCqEGiW9iKpvXmMolVekNgxQHZnBXa4S2WjaOScj9GH+r+GXRn1YNmYLLR\n73e+gmfOvJTz7+FhD3oRhCrz8d0shlbqf3AcskmHAoGBAIAM+BMlBhWxer5fHCvH\nHIkVtBd6NBhZRDY0rbC9kLualntM14K/p542ucfRDj2YnVXQT8nFspvBLBTvNMYk\nIOySSIJZnJRezmG55HhGam1qmcFYvhcGAtB2XFGgkvOoGXeUDnTnMlfmWCGa/q1b\nLwxCZj8PN7629Qo68uJRVrqI\n-----END PRIVATE KEY-----\n",
    client_email: "firebase-adminsdk-pl8y7@hich-92818.iam.gserviceaccount.com",
    client_id: "116669652104184537862",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-pl8y7%40hich-92818.iam.gserviceaccount.com",
    universe_domain: "googleapis.com",
  }),
  databaseURL: process.env.DATABASEURL,
});

export const adminAuth = admin.auth();
