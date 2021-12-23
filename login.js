const webIntegrationId = "NCw8LIg8NEt5fCtbTsREFtGa49U60tl2";
        function login() {
          function isLoggedIn() {
            return fetch('https://ewdg25ot2lurgg6.eu.qlikcloud.com/api/v1/users/me', {
              method: 'GET',
              mode: 'cors',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
                'qlik-web-integration-id': 'NCw8LIg8NEt5fCtbTsREFtGa49U60tl2',
              },
            }).then(response => {
              return response.status === 200;
            });
          }
          return isLoggedIn().then(loggedIn => {
            if (!loggedIn) {
              // check login
                window.location.href = "https://ewdg25ot2lurgg6.eu.qlikcloud.com/login?qlik-web-integration-id=" + webIntegrationId + "&returnto=" + location.href;
              throw new Error('not logged in');
            }
          });
        }
        login()