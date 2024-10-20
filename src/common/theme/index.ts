import { Noto_Sans } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const notoSans = Noto_Sans({
  weight: ['300', '400', '500', '700'],
  subsets: [
    'cyrillic-ext',
    'cyrillic',
    'devanagari',
    'greek-ext',
    'greek',
    'vietnamese',
    'latin-ext',
    'latin'
  ],
  display: 'swap'
});

const theme = createTheme({
  palette: {
    mode: 'light'
  },
  typography: {
    fontFamily: notoSans.style.fontFamily,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          fontSize: '16px',
          height: '100%',
          body: {
            lineHeight: 1.15,
            letterSpacing: '-0.5px',
            height: '100%',
            color: '#000000',
            h1: { margin: 0 },
            h2: { margin: 0, lineHeight: '160%' },
            h3: { margin: 0 },
            h4: { margin: 0 },
            h5: { margin: 0 },
            h6: { margin: 0 },
            p: { margin: 0, lineHeight: '160%' },
            pre: {
              fontFamily: notoSans.style.fontFamily
            },
            a: {
              textDecoration: 'none',
              cursor: 'pointer',
              color: '#000000'
            },
            button: {
              fontFamily: notoSans.style.fontFamily,
              cursor: 'pointer',
              border: ' 0 none',
              background: 'transparent',
              padding: 0,
              lineHeight: '160%',
              fontSize: '1rem'
            },
            input: {
              fontFamily: notoSans.style.fontFamily,
              ':focus': { outline: 0 },
              '::placeholder': {
                color: '#9a9cb5',
                opacity: 1
              }
            },
            textarea: {
              fontFamily: notoSans.style.fontFamily,
              ':focus': { outline: 0 },
              '::placeholder': {
                color: '#9a9cb5',
                opacity: 1
              }
            },
            code: {
              fontFamily: notoSans.style.fontFamily,
              fontSize: '1rem'
            },
            kbd: {
              fontFamily: notoSans.style.fontFamily,
              fontSize: '1rem'
            },
            samp: {
              fontFamily: notoSans.style.fontFamily,
              fontSize: '1rem'
            },
            sub: {
              bottom: '-0.25rem'
            },
            sup: {
              top: '-0.5rem'
            },
            fieldset: {
              padding: '0.35rem 0.75rem 0.625rem'
            },
            em: {
              fontStyle: 'normal'
            },
            ul: {
              listStyleType: 'none',
              padding: 0,
              margin: 0,
              lineHeight: '160%'
            },
            ol: {
              listStyleType: 'none',
              padding: 0,
              margin: 0,
              lineHeight: '160%'
            },
            dl: {
              margin: 0,
              dd: {
                margin: 0
              }
            },
            address: {
              lineHeight: '160%',
              letterSpacing: 0
            }
          }
        }
      }
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: 'h2',
          h2: 'h2',
          h3: 'h2',
          h4: 'h2',
          h5: 'h2',
          h6: 'h2',
          subtitle1: 'h2',
          subtitle2: 'h2',
          body1: 'span',
          body2: 'span'
        }
      }
    },
    MuiLink: {
      defaultProps: {
        underline: 'none'
      },
      styleOverrides: {
        root: {
          color: '#000000'
        }
      }
    },
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === 'info' && {
            backgroundColor: '#60a5fa'
          })
        })
      }
    }
  }
});

export default theme;
