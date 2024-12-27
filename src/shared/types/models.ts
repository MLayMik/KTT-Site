export interface Address {
  id: number
  address: string
  addressUrl: string
}
export interface Services {
  id: number
  date: Date
  scene: string | null
  microphones: string | null
  voiceoverZoom: string | null
  administrator: string | null
}

export interface FriendlyMeeting {
  id: number
  date: Date
  description: string
  inviting: string
  address: string
  addressUrl: string
}

export interface MinistryMeeting {
  id: number
  date: Date
  leader?: string | null
  address?: string | null
  addressUrl?: string | null
  friendlyMeeting?: FriendlyMeeting | null
}

export interface MeetingStatus {
  id: number
  title: string
}

export interface Meeting {
  id: number
  date: Date
  leading: string
  speaker?: string | null
  speechTitle?: string | null
  leadWt?: string | null
  reader?: string | null
  closingPrayer?: string | null
  specialProgram?: string | null
  address?: Address | null
  status?: MeetingStatus
  ministryMeeting?: MinistryMeeting | null
  serviceId?: number | null
  service?: Services | null
}

export interface DataResponse<T> {
  message: string
  data?: T
}
