export const environment = {
  production: true,
  apiURL: 'https://th2x1qg93k.execute-api.eu-west-1.amazonaws.com/dev',
  s3Bucket: {
    access: {
      accessKeyId: 'AKIAIXP6QFULACATZBXA',
      secretAccessKey: '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',
      region: 'eu-west-1'
    },
    name: 'angular-instakilo'
  },
  cognitoConfig: {
    identityPoolId: 'eu-west-1_rQh6f5Zs5',
    region: 'eu-west-1',
    userPoolId: 'eu-west-1_rQh6f5Zs5',
    userPoolWebClientId: '3d74p8ojut8od9h11dlehnibin'
  }
};
