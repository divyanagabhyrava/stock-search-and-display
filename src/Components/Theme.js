import { createMuiTheme } from '@material-ui/core/styles';

const appBlue = "#263e8f"
const appRed = "#c32822"
const appWhite = "#ffffff"
const appGrey = "#bebebe"

export default createMuiTheme ({
    palette: {
        common: {
            blue: `${appBlue}`,
            red:  `${appRed}`
        },
        primary: {
            main: `${appBlue}`
        },
        white: {
            main: `${appWhite}`
        },
        secondary: {
            main: `${appRed}`
        },
        grey: {
            main: `${appGrey}`
        }
    },
    typography: {
        h3: {
            fontWeight: 300
        }
    }
});
