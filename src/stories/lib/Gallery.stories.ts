export default {
  title: 'Base Components/Gallery',
  argTypes: {},
}

/* eslint-disable global-require, @typescript-eslint/no-var-requires */
const Template = () => {
  return `
<a
  href="${require('../../demo/media/responsive-images/picture/test_landscape_1-4x.jpg') as string}"
  data-fancybox="demo-gallery"
>
  <img
    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
    data-src="${require('../../demo/media/responsive-images/picture/test_landscape_1-4x.jpg') as string}"
    alt="Nymphenburg Castle in Munich during sunset"
    class="fw-lazy-load fw-lazy-load--opacity"
    width="960"
    height="640"
    intrinsicsize="960 x 640"
/></a>
<a
  href="${require('../../demo/media/responsive-images/img/yacht_race-desktop.jpg') as string}"
  data-fancybox="demo-gallery"
>
  <img
    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
    data-src="${require('../../demo/media/responsive-images/img/yacht_race-desktop.jpg') as string}"
    class="fw-lazy-load fw-lazy-load--opacity"
    alt="A very exciting yacht race."
    width="1280"
    height="852"
    intrinsicsize="1280 x 852"
/></a>
`
}

export const Default = Template.bind({})
Default.args = {}

Default.story = {
  parameters: {
    storySource: {
      source: `<a href="image-1.jpg" data-fancybox="demo-gallery">
  <img src="image-1-small.jpg" alt="" />
</a>
<a href="image-2.jpg" data-fancybox="demo-gallery">
  <img src="image-2-small.jpg" alt="" />
</a>`,
    },
  },
}
