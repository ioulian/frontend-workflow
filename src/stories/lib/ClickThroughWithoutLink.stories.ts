export default {
  title: 'Base Components/ClickThrough/Without Link',
  argTypes: {},
}

const Template = () => {
  return `
<div
  class="js-clickthrough"
  data-href="https://google.be"
  data-target="_blank"
  tabindex="0"
  role="link"
>
  <p>
    This text doesn't have a link inside, but you can define it with data attributes.
  </p>
</div>
`
}

export const Default = Template.bind({})
Default.args = {}

Default.story = {
  parameters: {
    storySource: {
      source: `<div class="js-clickthrough" data-href="#" data-target="_blank" tabindex="0" role="link">
  ...
</div>`,
    },
  },
}
