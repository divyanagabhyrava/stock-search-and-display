import axios from 'axios';

export const getSymbols = () => {
  const URL = `https://hiring-project-307416.uk.r.appspot.com/api/v1/symbols`;
  return axios(URL, {
    method: 'GET',
    headers: {
        'api-key': '8675309-divya'
    },
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};