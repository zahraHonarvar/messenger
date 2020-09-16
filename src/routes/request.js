export const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export function get(url) {
  return new Promise(resolve => {
    fetch(`${baseUrl}/${url}`)
      .then(x => x.json())
      .then(resolve);
  });
}


