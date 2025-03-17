import axios from "axios"

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_PUBLIC_URL || "https://twitter-ieea.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  }
})

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token")
      window.location.reload()
    }
  return Promise.reject(error)
  }
)

export default apiClient
