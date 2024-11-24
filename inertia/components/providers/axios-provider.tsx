import React, { createContext, useContext } from 'react'
import axios, { AxiosInstance } from 'axios'

const AxiosContext = createContext<null | AxiosInstance>(null)

export const axiosInstance = axios.create({
  baseURL: '/api/',
})

export const AxiosProvider = ({ children }: { children: React.ReactNode }) => {
  // Request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      // Add authorization token to headers if available
      const token = localStorage.getItem('token') // Assuming you store token in local storage
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      // Handle the request error
      return Promise.reject(error)
    }
  )

  // Response interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      // Handle the response error globally
      if (error.response) {
        console.error('API error:', error.response.data)
        // Here you can add custom error handling
        // e.g., redirect to login if unauthorized
      }
      return Promise.reject(error)
    }
  )

  return <AxiosContext.Provider value={axiosInstance}>{children}</AxiosContext.Provider>
}

// Custom hook to use Axios instance
export const useAxios = () => {
  const context = useContext(AxiosContext)
  if (!context) {
    throw new Error('useAxios must be used within an AxiosProvider')
  }
  return context
}
