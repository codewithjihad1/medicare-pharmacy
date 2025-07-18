import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from './useAuth'
import axiosInstance from '../api/axiosInstance'


const useRole = () => {
  const { user, loading } = useAuth()
  const { data: role, isLoading } = useQuery({
    queryKey: ['role', user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const response = await axiosInstance.get(`/role/${user?.email}`)
      return response.data
    }
  })


  return { role, isLoading }
}

export default useRole
