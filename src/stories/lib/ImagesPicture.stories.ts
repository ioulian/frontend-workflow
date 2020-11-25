export default {
  title: 'Base Components/Lazy Loaded Images/Picture',
  argTypes: {},
}

/* eslint-disable global-require, @typescript-eslint/no-var-requires */
const Template = () => {
  return `
<p>
  <span class="demo-image">
    <picture width="960" height="640" intrinsicsize="960 x 640">
      <source
        media="print"
        data-srcset="${require('../../demo/media/responsive-images/picture/test_landscape_1-1x.jpg') as string}"
      />

      <source
        media="(max-width: 480px)"
        data-srcset="${require('../../demo/media/responsive-images/picture/test_landscape_1-1x.jpg') as string}"
      />

      <source
        media="(max-width: 640px)"
        data-srcset="${require('../../demo/media/responsive-images/picture/test_landscape_1-2x.jpg') as string}"
      />

      <source
        media="(max-width: 1024px)"
        data-srcset="${require('../../demo/media/responsive-images/picture/test_landscape_1-4x.jpg') as string}"
      />

      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
        data-src="${require('../../demo/media/responsive-images/picture/test_landscape_1-4x.jpg') as string}"
        alt="Nymphenburg Castle in Munich during sunset"
        class="fw-lazy-load fw-lazy-load--opacity"
        width="960"
        height="640"
        intrinsicsize="960 x 640"
      />
    </picture>
  </span>

  <small>Images from:
    <a href="https://responsiveimages.org" target="_blank" rel="noopener noreferrer">https://responsiveimages.org</a>
  </small>
</p>
`
}

export const Default = Template.bind({})
Default.args = {}
