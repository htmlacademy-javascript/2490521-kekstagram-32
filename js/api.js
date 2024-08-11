const BASE_SERVER_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';
const Route = {
  GET: `${BASE_SERVER_URL}/data`,
  POST: `${BASE_SERVER_URL}`,
};

const getData = () => fetch(Route.GET)
  .then((response) => response.json());

const sendData = (body) => fetch (Route.POST,
  {
    method: 'POST',
    body,
  },
);
export {getData, sendData};
