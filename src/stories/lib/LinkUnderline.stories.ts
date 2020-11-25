export default {
  title: 'Base Components/Link underline',
  argTypes: {},
}

const Template = () => {
  return `
<p>
  You can hover
  <a
    href="https://github.com/ioulian/frontend-workflow"
    target="_blank"
    rel="noopener noreferrer"
    class="has-link-underline"
    >this link</a
  >
  to see the animation.
  <a
    href="https://github.com/ioulian/frontend-workflow"
    target="_blank"
    rel="noopener noreferrer"
    class="has-link-underline"
    >It also works with multi-line links. Just check this out! This is a very long link and it wraps and
    animates perfectly!</a
  >
</p>
<p>
  <a
    href="https://github.com/ioulian/frontend-workflow"
    target="_blank"
    rel="noopener noreferrer"
    class="has-demo-link-underline"
    >You can also apply different style of the link, by default it will use the same color of the
    link.</a
  >
</p>
`
}

export const Default = Template.bind({})
Default.args = {}
