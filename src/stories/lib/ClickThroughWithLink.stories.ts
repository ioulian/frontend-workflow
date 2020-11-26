export default {
  title: 'Base Components/ClickThrough/With Link',
  argTypes: {},
}

const Template = () => {
  return `
<div class="js-clickthrough">
  <p>
    This is a normal text, but if you click on the parent (or this text), you'll navigate to this
    <a
      href="https://google.be"
      class="js-clickthrough__to has-link-underline"
      target="_blank"
      rel="noopener noreferrer"
      >link</a
    >.
  </p>
</div>
`
}

export const Default = Template.bind({})
Default.args = {}

Default.story = {
  parameters: {
    storySource: {
      source: `<div class="js-clickthrough">
  ...
  <a href="#" class="js-clickthrough__to" target="_blank" rel="noopener noreferrer">link</a>
</div>`,
    },
  },
}
