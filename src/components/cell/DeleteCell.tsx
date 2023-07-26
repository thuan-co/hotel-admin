import { Button } from '@mui/material';
import { GridRenderCellParams } from '@mui/x-data-grid';

/**
 * Cell action delete in table hotels list
 * @param props ID: Hotel in list
 */
export default function DeleteCell( props: GridRenderCellParams<String> ) {

    // const id = props.value

    return (
        <Button variant='outlined' color='error' size='small' onClick={()=>{
            console.log("ID: ", props.value);
            
        }}>
            Delete
        </Button>
    );
};