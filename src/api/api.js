import axios from "axios";

//ref: https://stackoverflow.com/a/33507729/8666088
export default axios.create({
  baseURL: "https://inventory-theicthub.herokuapp.com/api/v1/",
});
