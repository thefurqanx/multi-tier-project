import axios from "axios";

export default axios.create({
  baseURL: "https://d3bjb94ee09h7w.cloudfront.net/api",
  headers: {
    "Content-type": "application/json"
  }
});
