import type { z } from 'zod'
import type { addressSchema } from './types'
import { API_URL } from '@/shared/config'
import { faker as f } from '@faker-js/faker'
import { http, HttpResponse } from 'msw'

interface AddressCreate {
  address: string
  address_url: string
}

let curId = 0
export function makeAddressesSchemaMock(): z.infer<typeof addressSchema> {
  return {
    id: curId++,
    address: f.address.city(),
    address_url: f.internet.url(),
  }
}

const addresses = Array.from({ length: 5 }, () => makeAddressesSchemaMock())

export const addresshandlers = [
  http.get(`${API_URL}/api/addresses`, () => {
    return HttpResponse.json(addresses)
  }),
  http.get(`${API_URL}/api/addresses/:id`, ({ params }) => {
    const { id } = params
    if (addresses.findIndex(address => address.id === +id!) === -1) {
      const item = addresses.find(address => address.id === addresses[0].id)!
      return HttpResponse.json(item)
    }
    else {
      const item = addresses.find(address => address.id === +id!)
      return HttpResponse.json(item)
    }
  }),
  http.post(`${API_URL}/api/addresses`, async ({ request }) => {
    const body = await request.json() as AddressCreate

    const newAddress = {
      id: addresses.length + 1,
      ...body,
    }

    addresses.push(newAddress)
    return HttpResponse.json(newAddress, { status: 200 })
  }),
  http.delete(`${API_URL}/api/addresses/:id`, ({ params }) => {
    const { id } = params

    const index = addresses.findIndex(address => address.id === +id!)
    if (index === -1) {
      return HttpResponse.json({ error: 'Address not found' }, { status: 404 })
    }

    addresses.splice(index, 1)
    return HttpResponse.json({ message: 'Delete successfully' }, { status: 200 })
  }),
]
