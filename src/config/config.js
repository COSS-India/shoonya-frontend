// CRA reads REACT_APP_* at compile/start time. Default suits local npm start; Docker passes the real API URL.
const backendBaseUrl =
  process.env.REACT_APP_APIGW_BASE_URL || "http://localhost:8000";

const configs = {
  BASE_URL: backendBaseUrl,
  BASE_URL_AUTO: backendBaseUrl,
};

export default configs;
//http://20.51.211.111:8000
//https://backend.shoonya.ai4bharat.org/
// https://backend.dev2.shoonya.ai4bharat.org
//https://backend.prod2.shoonya.ai4bharat.org
