export interface IRoomRequest {
  name: string
  code: string
  description: string
  capacity: number
}

export interface IRoomResponse {
  name: string
  description?: string
  capacity: number
}

export interface IRoomBookRequest {
  bookingStart: number[]
  bookingEnd: number[]
  title: string
  purpose: string
}
