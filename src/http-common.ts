import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5181/api",
  headers: {
    "Content-type": "application/json",
  },
});
