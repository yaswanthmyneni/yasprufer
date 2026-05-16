import axios from "axios";

const getProblemById = async (id) => {
  const SERVER_URL =
    `${process.env.SERVER_URL}/problem/internal` ||
    `${process.env.SERVER_URL}/problem/internal`;

  try {
    const res = await axios.get(`${SERVER_URL}/${id}`, {
      withCredentials: true,
    });

    if (!res.data.success) {
      throw new Error(data.message);
    }

    return res.data.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export { getProblemById };
