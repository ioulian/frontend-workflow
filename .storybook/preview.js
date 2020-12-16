import './../src/demo/demo.scss'
import './../src/index.scss'
import './../src/index.ts'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  viewport: {
    viewports: {
      xs: {
        name: 'Bootstrap XS',
        styles: {
          width: '575px',
          height: '963px'
        },
      },
      sm: {
        name: 'Bootstrap SM',
        styles: {
          width: '767px',
          height: '963px'
        },
      },
      md: {
        name: 'Bootstrap MD',
        styles: {
          width: '991px',
          height: '963px'
        },
      },
      lg: {
        name: 'Bootstrap LG',
        styles: {
          width: '1199px',
          height: '963px'
        },
      },
      xl: {
        name: 'Bootstrap XL',
        styles: {
          width: '1399px',
          height: '963px'
        },
      },
      xxl: {
        name: 'Bootstrap XXL',
        styles: {
          width: '1680px',
          height: '963px'
        },
      }
    }
  }
}
