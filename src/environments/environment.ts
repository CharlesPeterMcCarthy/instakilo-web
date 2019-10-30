export const environment = {
  production: false,
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
    identityPoolId: 'eu-west-1_6V0H7YYlb',
    region: 'eu-west-1',
    userPoolId: 'eu-west-1_6V0H7YYlb',
    userPoolWebClientId: '6ahriip0la2v4gall49m3sddo3'
  }
};
