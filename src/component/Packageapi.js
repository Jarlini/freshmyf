const API_URL = '/api/packages';

export const getPackages = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const addPackage = async (pkg) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(pkg)
  });
  return response.json();
};

export const updatePackage = async (id, pkg) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(pkg)
  });
  return response.json();
};

export const deletePackage = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
  return response.json();
};
