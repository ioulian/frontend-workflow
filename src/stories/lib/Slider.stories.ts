export default {
  title: 'Base Components/Slider',
  argTypes: {},
}

const Template = () => {
  return `
<div class="swiper-container fw-slider">
  <div class="swiper-wrapper">
    <div class="swiper-slide">Slide 1</div>
    <div class="swiper-slide">Slide 2</div>
    <div class="swiper-slide">Slide 3</div>
  </div>
  <div class="swiper-button-prev"></div>
  <div class="swiper-button-next"></div>
</div>
`
}

export const Default = Template.bind({})
Default.args = {}

Default.story = {
  parameters: {
    storySource: {
      source: `<div class="swiper-container fw-slider">
  <div class="swiper-wrapper">
    <div class="swiper-slide">...</div>
    <div class="swiper-slide">...</div>
    <div class="swiper-slide">...</div>
    ...
  </div>
  <div class="swiper-button-prev"></div>
  <div class="swiper-button-next"></div>
</div>`,
    },
  },
}
