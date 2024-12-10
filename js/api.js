const getDataUrl = 'https://29.javascript.htmlacademy.pro/kekstagram/data';
const postDataUrl = 'https://29.javascript.htmlacademy.pro/kekstagram';

const getData = () =>
  fetch(getDataUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch((error) => {
      throw new Error(error.message);
    });

const postData = (body) =>
  fetch(postDataUrl, {method: 'POST', body: body})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response;
    })
    .catch((error) => {
      throw new Error(error);
    });

export { getData, postData };
