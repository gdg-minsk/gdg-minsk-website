import { createMuiTheme } from '@material-ui/core/styles';
import palette from './palette';

const muiTheme = createMuiTheme({
    palette: {
        primary: {
            main: palette.brand.royalBlue,
        },
        secondary: {
            main: palette.font.nevada,
        },
        error: {
            main: '#fff',
        },
        background: {
            default: `#ff0000`,
        },
    },
    typography: {
        fontSize: 19,
    },
});

export default muiTheme;
