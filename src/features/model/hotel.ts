export interface HotelDto {
    name: string,
    id: string
}
export interface NewHotelDto {
    name: string,
    city: string,
    distance: string,
    desc: string,
    photos: string[],
    rooms: string[],
    type: string,
    address: string,
    cheapestPrice: number,
    featured: boolean,
    rating: number
}
export interface ResponseRoom {
    title: string,
    id: string
}
export interface ResponseNewHotel {
    message: string,
    hotelId: string,
    hotelName: string,
    rooms: ResponseRoom[],
}
export interface RoomDto {
    id: string,
    title: string,
    price: number,
    desc: string,
    roomNumbers: number[],
    maxPeople: number,
    hotelId: string
}
export interface MessageCreateRoom {
    message: string,
    error: boolean
}
export interface ListHotelResponse {
    id: string, 
    name: string, 
    type: string, 
    city: string
}

