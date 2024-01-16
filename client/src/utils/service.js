export const baseUrl = "http://localhost:3000/api/v1";

export const postRequest = async (url, body) => {
  console.log("body", body);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  const data = await response.json();
  console.log("Response from server:", response);

  if (!response.ok) {
    let message;

    if (data?.message) {
      message = data.message;
    } else {
      message = data;
    }
    return { error: true, message };
  }

  return data;
};

export const getRequest = async (url, headers = {}) => {
  const response = await fetch(url, { headers });
  const data = await response.json();

  if (!response.ok) {
    let message = "Terjadi kesalahan...";

    if (data?.message) {
      message = data.message;
    }

    return { error: true, message };
  }

  return data;
};

export const putFormDataRequest = async (url, formData, headers = {}) => {
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      ...headers,
    },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    let message;

    if (data?.message) {
      message = data.message;
    } else {
      message = data;
    }

    return { error: true, message };
  }

  return data;
};
