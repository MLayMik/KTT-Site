import { queryOptions, useMutation, useQuery } from '@tanstack/react-query'
import { queryClient } from '../lib'
import {
  type AddressByIdParams,
  createAddress,
  deleteAddress,
  getAddressById,
  getAddresses,
} from './api'

const entity = 'address'
const Scopes = { All: 'all', ById: 'by-id' } as const

export const keys = {
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

export function useCreateAddress() {
  return useMutation({
    mutationFn: createAddress,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: keys.getAddresses() })
    },
  })
}

export function useDeleteAddress() {
  return useMutation({
    mutationFn: deleteAddress,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: keys.getAddresses() })
    },
  })
}
