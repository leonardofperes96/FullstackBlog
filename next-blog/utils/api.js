export const post = async (url, obj) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};
