const downloadImage = (url: string): Promise<Blob> =>
  new Promise((res, rej) => {
    const xhr = new XMLHttpRequest();

    xhr.responseType = 'blob';

    xhr.onload = () => {
      res(xhr.response);
    };

    xhr.open('GET', url);
    xhr.send();
  });

export default downloadImage;
