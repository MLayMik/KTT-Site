import { z } from 'zod'
import { type ApiEndpointsAndSchemas, client } from '../lib'
import { normalizeAddress } from './normalizers'
import { addressSchema } from './types'

const endpoints = {
  getAddress: {
    url: '/api/addresses',
    method: 'get',
    schema: z.array(addressSchema),
  },
  byId: {
    url: ({ id }: AddressByIdParams) => `/api/${id}`,
    method: 'get',
    schema: addressSchema,
  },
  create: {
    url: '/api/addresses',
    method: 'post',
    schema: addressSchema,
  },
  delete: {
    url: ({ id }: DeleteAddressParams) => `/api/addresses/${id}`,
    method: 'delete',
  },
} satisfies ApiEndpointsAndSchemas

export interface AddressByIdParams { id: number }

export async function getAddresses() {
  const { url, method, schema } = endpoints.getAddress
  const data = await client[method](url, schema)

  return data.map(normalizeAddress)
}

export async function getAddressById({ id }: AddressByIdParams) {
  const { url, method, schema } = endpoints.byId
  const data = await client[method](url({ id }), schema)

  return normalizeAddress(data)
}

export interface CreateAddressParams {
  address: string
  address_url: string
}

export async function createAddress(
  { address, address_url }: CreateAddressParams,
) {
  const { url, method, schema } = endpoints.create
  const data = await client[method](url, { address, address_url }, schema)
  return normalizeAddress(data)
}

export interface DeleteAddressParams { id: number }
export async function deleteAddress({ id }: DeleteAddressParams) {
  const { url, method } = endpoints.delete
  await client[method](url({ id }))
  return 'deleted'
}
