import axios from "axios"
import getApiBase from "./getApiBase"
import getDefaultHeaders from "./getDefaultHeaders"

const axiosClient = axios.create({
  baseURL: getApiBase(),
  headers: getDefaultHeaders(),
})

export default function getApiClient() {
  return axiosClient
}
