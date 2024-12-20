import type { ServicesByIdParams } from './api'
import { queryOptions, useQuery } from '@tanstack/react-query'
import { getServiceById, getServices } from './api'

const entity = 'service'
const Scopes = { All: 'all', ById: 'by-id' } as const

const keys = {
  getServices: (
  ) => [{ entity, scope: Scopes.All }],
  byId: (
    params: ServicesByIdParams,
  ) => [{ entity, scope: Scopes.ById, ...params }],
} as const

export function useServicesQuery() {
  return queryOptions({
    queryKey: keys.getServices(),
    queryFn: getServices,
  })
}

export function useServices() {
  return useQuery(useServicesQuery())
}

export function useServiceByIdQuery(params: ServicesByIdParams) {
  return queryOptions({
    queryKey: keys.byId(params),
    queryFn: ({ queryKey: [{ id }] }) => getServiceById({ id: id! }),
  })
}

export function useServiceById(params: ServicesByIdParams) {
  return useQuery(useServiceByIdQuery(params))
}
