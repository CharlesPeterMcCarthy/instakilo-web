/*
  Copy and paste this template into the environment.ts and environment.prod.ts
  Fill in the values.
*/

export const environment = {
  production: true,
  apiURL: '{{ API_URL }}',
  s3Bucket: {
    access: {
      accessKeyId: '{{ ACCESS_KEY_ID }}',
      secretAccessKey: '{{ SECRET_ACCESS_KEY }}',
      region: '{{ REGION }}'
    },
    name: '{{ BUCKET_NAME }}'
  },
  cognitoConfig: {
    identityPoolId: '{{ IDENTITY_POOL_ID }}',
    region: '{{ REGION }}',
    userPoolId: '{{ USER_POOL_ID }}',
    userPoolWebClientId: '{{ CLIENT_ID }}'
  }
};
