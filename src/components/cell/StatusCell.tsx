import { GridRenderCellParams } from '@mui/x-data-grid';

/**
 * container status
 * @param props status of booking
 * @returns cell table status
 */
export default function StatusCell( props: GridRenderCellParams<String> ) {
    return(
        <>
        {
            ( props.value === 'Booked') ? 
                <div className="bg-[#F5B8AD] p-2 rounded-md text-blue-600">
                    Booked
                </div> : null
        }
        {
            ( props.value === 'Checkin') ? 
            <div className="bg-[#39D139] p-2 rounded-md text-blue-600">
                Checkin
            </div> : null
        }
        {
            ( props.value === 'Checkout') ?
            <div className="bg-[#DEDBFD] p-2 rounded-md text-blue-600">
                Checkout
            </div> : null
        }
        </>
    )
}