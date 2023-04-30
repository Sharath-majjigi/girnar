import { useState } from 'react';

const BASE_API_ENDPOINT='http://18.139.85.219:8088/api/v1';
const NEW_TOKEN_API_ENDPOINT = BASE_API_ENDPOINT + '/user/refresh-token';

function useUpsertData(
  type,
  resource,
  data,
) {
  const [response, setResponse] = useState({ status: 0, message: '' });
  const URL = BASE_API_ENDPOINT + resource;

  const postData = async (access_token, refresh_token) => {
    try {
      const initial_res = await fetch(URL, {
        method: type,
        headers: {
          'Authorization':` Bearer ${access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (initial_res.status === 202) {
        setResponse({ status: 202, message: 'Accepted' });
      } else if (initial_res.status === 200) {
        setResponse({ status: 200, message: 'Success' });
      } else {
        const new_response = await fetch(NEW_TOKEN_API_ENDPOINT, {
          headers: {
            'Authorization':` Bearer ${refresh_token}`
          }
        });

        if (new_response.status === 200) {
          const { access_token: new_token } = await new_response.json();

          const user = localStorage.getItem('kisanFeedsUser');
          const kisanFeedsUser = JSON.parse(!user);
          localStorage.setItem('kisanFeedsUser', JSON.stringify({
            ...kisanFeedsUser,
            access_token: new_token,
          }));

          const final_response = await fetch(URL, {
            method: type,
            headers: {
              'Authorization': `Bearer ${access_token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });

          if (final_response.status === 202) {
            setResponse({ status: 202, message: 'Accepted' });
          } else if (final_response.status === 200) {
            setResponse({ status: 200, message: 'Success' });
          } else {
            setResponse({ status: 500, message: 'Error creating resource' });
          }
        } else {
          setResponse({ status: 401, message: 'Push to login' });
        }
      }
    } catch (error) {
      setResponse({ status: 500, message: 'Error creating resource' });
    }
  };

  const user = localStorage.getItem('kisanFeedsUser');

  if (user) {
    const { access_token, refresh_token } = JSON.parse(user);
    postData(access_token, refresh_token);
  } else {
    setResponse({ status: 401, message: 'Push to login' });
  }
}

export default useUpsertData;