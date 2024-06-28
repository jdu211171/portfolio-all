
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    components: {
        MuiButton: {

        },
        MuiTextField: {
            defaultProps: {
                size: 'small', // Default size for MuiTextField
            },
        },
    },
});

export default theme;
