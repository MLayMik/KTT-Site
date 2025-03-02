import { queryOptions, useMutation, useQuery } from '@tanstack/react-query'
import { queryClient } from '../lib'
import {
  createService,
  deleteService,
  getService,
  type GetServiceParams,
  getServices,
  updateService,
} from './api'

const entity = 'service'
const Scopes = { All: 'all', ById: 'by-id' } as const

const keys = {
  getServices: () => [{ entity, scope: Scopes.All }],
  getService: (
    params: GetServiceParams,
  ) => [{ entity, scope: Scopes.ById, ...params }],
} as const

export { keys as serviceKeys }

export function useServicesQuery() {
  return queryOptions({
    queryKey: keys.getServices(),
    queryFn: getServices,
  })
}

export function useServices() {
  return useQuery(useServicesQuery())
}

export function useServiceQuery(params: GetServiceParams) {
  return queryOptions({
    queryKey: keys.getService(params),
    queryFn: ({ queryKey: [{ id }] }) => getService({ id: id! }),
  })
}

export function useService(params: GetServiceParams) {
  return useQuery(useServiceQuery(params))
}

export function useCreateService() {
  return useMutation({
    mutationFn: createService,
  })
}

export function useUpdateService() {
  return useMutation({
    mutationFn: updateService,
  })
}

export function useDeleteService() {
  return useMutation({
    mutationFn: deleteService,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: keys.getServices() })
    },
  })
}
