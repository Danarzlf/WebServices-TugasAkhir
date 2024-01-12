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

export const putRequest = async (url, body) => {
  console.log("body", body);
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body), // Ubah objek body menjadi string JSON
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
