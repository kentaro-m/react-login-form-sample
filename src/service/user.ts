import unfetch from 'unfetch';

export const authenticate = async (email: string, password: string): Promise<Object> => {
  const response = await unfetch('https://reqres.in/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();

  if (response.status !== 200) {
    throw new Error(data.error)
  }

  return {
    status: response.status,
    data,
  };
};