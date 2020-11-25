export default {
  title: 'Base Components/Lazy Loaded Images/Image',
  argTypes: {},
}

/* eslint-disable global-require, @typescript-eslint/no-var-requires */
const Template = () => {
  return `
<p>
  <span class="demo-image">
    <img
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
      class="fw-lazy-load fw-lazy-load--opacity"
      data-src="${require('../../demo/media/responsive-images/img/yacht_race-desktop.jpg') as string}"
      alt="A very exciting yacht race."
      width="1280"
      height="852"
      intrinsicsize="1280 x 852"
    />
  </span>
  <small>Images from:
    <a href="https://responsiveimages.org" target="_blank" rel="noopener noreferrer">https://responsiveimages.org</a>
  </small>
</p>
`
}

export const Default = Template.bind({})
Default.args = {}
