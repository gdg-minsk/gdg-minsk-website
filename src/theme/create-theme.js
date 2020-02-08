import { createMuiTheme } from '@material-ui/core/styles';
import palette from './palette';
import mixins from './mixins';

const createTheme = () => {
    const muiTheme = createMuiTheme({
        palette: {
            primary: {
                main: palette.brand.royalBlue,
            },
        },
    });

    return {
        ...muiTheme,
        mixins: {
            ...mixins,
        },
        palette: {
            ...palette,
        },
    };
};

export default createTheme;
