import { queryOptions, useQuery } from '@tanstack/react-query'
import { type AddressByIdParams, getAddressById, getAddresses } from './api'

const entity = 'address'
const Scopes = { All: 'all', ById: 'by-id' } as const

const keys = {
  getAddresses: (
  ) => [{ entity, scope: Scopes.All }],
  byId: (
    params: AddressByIdParams,
  ) => [{ entity, scope: Scopes.ById, ...params }],
} as const

export function useAddressesQuery() {
  return queryOptions({
    queryKey: keys.getAddresses(),
    queryFn: getAddresses,
  })
}

export function useAddresses() {
  return useQuery(useAddressesQuery())
}

export function useAddressesByIdQuery(params: AddressByIdParams) {
  return queryOptions({
    queryKey: keys.byId(params),
    queryFn: ({ queryKey: [{ id }] }) => getAddressById({ id: id! }),
  })
}

export function useAddressById(params: AddressByIdParams) {
  return useQuery(useAddressesByIdQuery(params))
}
