import { Alert, Collapse, IconButton} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
  


const SaveAlert = (props: any): JSX.Element => {

    const {text, stateVar, stateSet} = props


    return (
        <Collapse in={stateVar}>
            <Alert
                severity="error"
                action={
                <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        stateSet(false);
                    }}
                >
                    <CloseIcon fontSize="inherit" />
                </IconButton>
                }
                sx={{}}
            >
               {text}
            </Alert>
        </Collapse>
    )
}

export default SaveAlert