const ldap = require('ldapjs');

class AuthenticateUser {
  async authenticateUserLDAP(email: string, pass: string): Promise<object> {

    try {

      if (0 === pass.length) {
        throw new Error("Empty password");
      }

      const SUFFIX: string = 'DC=cnnbrasil,DC=com,DC=br';
      const userAdmin: string = email
      const passAdmin: string = pass;
      const client = ldap.createClient({
        url: ['ldap://10.111.140.3'],
        reconnect: true,
      });

      client.on('error', (err: any) => {
        console.debug('connection failed, retrying 1');
        client.destroy();
      });

      return new Promise((resolve, reject) => {

        client.bind(userAdmin, passAdmin, (err: any, res: any, next: any) => {

          if (err) {
            return resolve({ credential: false, status: 20232 });
          }

          const opts = {
            filter: `(&(userPrincipalName=*${email})(memberOf=CN=APP_VPN_YTIB,OU=SITE SP,OU=CNNBRASIL,DC=cnnbrasil,DC=com,DC=br))`,
            scope: 'sub',
          };

          client.search(SUFFIX, opts, (err: any, res: any, next: any) => {

            if (err) {
              return resolve({ credential: false, status: 20233 });
            }

            res.on('searchEntry', async (entry: any) => {
              return resolve({ credential: true, status: 201 });
            });

          });
          client.unbind();
        });
      });

    } catch (error) {
      return { error: 'password empty', status: 20231 }
    }
  }
}

export { AuthenticateUser }
