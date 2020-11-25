export default {
  title: 'Base Components/SameHeight',
  argTypes: {},
}

const Template = () => {
  return `
<div
  class="same-height-example js-sameheight"
  data-child-selector=".js-sameheight__child"
  data-per-row="true"
  data-height-attribute="height"
>
  <div class="same-height-example__item js-sameheight__child">
    <div class="py-2 px-3">
      First column First column First column First column First column First column First column First
      column
    </div>
  </div>
  <div class="same-height-example__item js-sameheight__child">
    <div class="py-2 px-3">Second column Second column Second column</div>
  </div>
  <div class="same-height-example__item js-sameheight__child">
    <div class="py-2 px-3">Third column Third column Third column Third column Third column</div>
  </div>
  <div class="same-height-example__item js-sameheight__child">
    <div class="py-2 px-3">Fourth column Fourth lumn</div>
  </div>
</div>
`
}

export const Default = Template.bind({})
Default.args = {}
