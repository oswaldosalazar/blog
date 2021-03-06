var lock = new Auth0Lock('{{env.AUTH0_CLIENT_ID}}', '{{env.AUTH0_DOMAIN}}', {
  auth: {
    redirectUrl: '{{env.AUTH0_CALLBACK_URL}}',
    responseType: 'code',
    params: {
      scope: 'openid name email picture' // Learn about scopes: https://auth0.com/docs/scopes
    }
  }
})
lock.show();
