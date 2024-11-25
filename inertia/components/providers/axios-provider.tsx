import React, { createContext, useContext } from 'react'
import axios, { AxiosInstance } from 'axios'

const AxiosContext = createContext<AxiosInstance | null>(null)

export const axiosInstance = axios.create({
  baseURL: '/api/',
})

export const AxiosProvider = ({ children }: { children: React.ReactNode }) => {
  // Attach request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      return config
    },
    (error) => {
      // Handle request errors (e.g., network issues, invalid configs)
      console.error('Request error:', error)
      return Promise.reject(error)
    }
  )

  // Attach response interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      // Successfully received response
      return response.data
    },
    (error) => {
      // Handle errors from server responses
      if (error.response) {
        return Promise.reject(error.response.data)
      }
      return Promise.reject(error) // Always reject to propagate the error
    }
  )

  return <AxiosContext.Provider value={axiosInstance}>{children}</AxiosContext.Provider>
}

// Custom hook to access the Axios instance
export const useAxios = () => {
  const context = useContext(AxiosContext)
  if (!context) {
    throw new Error('useAxios must be used within an AxiosProvider')
  }
  return context
}
