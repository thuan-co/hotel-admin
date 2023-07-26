import { Box, Button, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'

type Props = {
    hotel: any,
    open: boolean,
    listHotels: any[],
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setListHotels: React.Dispatch<React.SetStateAction<any[]>>,
    setIsUpdateSuccess: React.Dispatch<React.SetStateAction<boolean | null>>
}
function UpdateHotelDialog( props: Props) {
    
    
    const { open, setOpen, hotel, listHotels, setListHotels, setIsUpdateSuccess } = props
    const nameRef = useRef<HTMLInputElement>(null)
    const addressRef = useRef<HTMLInputElement>(null)
    const cityRef = useRef<HTMLInputElement>(null)
    const typeRef = useRef<HTMLSelectElement>(null)
    const priceRef = useRef<HTMLInputElement>(null)
    const imgRef = useRef<HTMLInputElement>(null)
    const desRef = useRef<HTMLInputElement>(null)

    const handleUpdateHotel = () => {
        // setOpen(false)
        if (nameRef.current && addressRef.current 
            && cityRef.current && typeRef.current 
            && priceRef.current && imgRef.current 
            && desRef.current) {
            const tmp = imgRef.current.getElementsByTagName('textarea')[0]
                    .value.split('\n')
            // console.log(tmp)
            const dataBody = {
                id: hotel._id,
                name: nameRef.current
                    .getElementsByTagName('input')[0].value,
                address: addressRef.current
                    .getElementsByTagName('input')[0].value,
                city: cityRef.current.value,
                type: typeRef.current.value,
                price: priceRef.current.value,
                photos: tmp,
                desc: desRef.current
                .getElementsByTagName('textarea')[0].value
            }

            ;(async () => {
                try {
                    const res = await axios.post('http://localhost:5000/api/v1/admin/update-hotel', dataBody)
                    const data = res.data
                    const tmp = listHotels.filter( item => item.id !== hotel._id)
                    tmp.push(data)
                    setListHotels(tmp)
                    setOpen(false)
                    setIsUpdateSuccess(true)
                } catch(error:any) {
                    console.log(error.response.data)
                }               
            })()
        }    
    }
    
    return (
        <Dialog open={open} onClose={() => { setOpen(false) }}>
            <DialogTitle className='text-center'>Cập nhật khách sạn {hotel.name}</DialogTitle>
            <DialogContent className=''>
                <Box
                    component="form"
                    className='relative'
                    sx={{
                        '& .MuiTextField-root': { mb: 1},
                        paddingTop: '4px'
                    }}
                >
                    <TextField defaultValue={hotel.name} name='name' 
                        variant='outlined' label='Hotel name' size='small'
                        className='w-full mb-4' ref={nameRef} 
                    />
                    <TextField name='address' ref={addressRef}
                        variant='outlined' label='Address' size='small'
                        className='w-full mb-4' defaultValue={hotel.address}
                    />
                    <div className='grid grid-cols-3 items-center gap-2 max-w-full relative'>
                        {/* City */}
                        <div>
                            <label htmlFor="city-update">City</label>
                            <input type="text" name="city" id='city-update' 
                                className='w-full mb-4 p-2 border-2 border-slate-400' 
                                defaultValue={hotel.city} ref={cityRef}
                            />
                            
                        </div>
                        {/* Type */}
                        <select className='h-10 border-2 border-slate-400' defaultValue={hotel.type} ref={typeRef}>
                            <option value={''}>
                                <>Select Type</>
                            </option>
                            <option value="hotel">Hotel</option>
                            <option value="motel">Motel</option>
                            <option value="resort">Resort</option>
                        </select>
                        {/* Price */}
                        <div>
                            <label htmlFor="price-update" >Price</label>
                            <input type="number" name="price" id='price-update' ref={priceRef}
                                defaultValue={hotel.cheapestPrice} className='w-full mb-4 p-2 border-2 border-slate-400'
                            />
                        </div>
                    </div>
                    <TextField name='images' multiline rows={5}
                        variant='outlined' label='Images' ref={imgRef}
                        className='w-full mb-2' defaultValue={(Boolean(hotel.photos)) ? hotel.photos.join('\n') : null}
                    />
                    <TextField name='desc' multiline rows={5}
                        variant='outlined' label='Description' ref={desRef}
                        className='w-full mb-4' defaultValue={hotel.desc}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' color='error' onClick={() => { setOpen(false) }}>Cancel</Button>
                <Button variant='contained' color='primary' onClick={handleUpdateHotel}>Update</Button>
            </DialogActions>
        </Dialog>
    )
}
export default UpdateHotelDialog