export default {
  title: 'Base Components/Social Share',
  argTypes: {},
}

const Template = () => {
  return `
<p>
  By using correct social sharer links, you can modify the default behavior to show a popup with the
  sharer.
</p>
<p>In case the JS is disabled, the user navigates to the url of the sharer.</p>
<p>
  Here is the
  <a
    href="https://github.com/bradvin/social-share-urls"
    target="_blank"
    rel="noopener noreferrer"
    class="has-link-underline"
    >list of the social sharer links</a
  >.
</p>
<p>
  <a
    href="https://www.facebook.com/sharer.php?u=https%3A%2F%2Ftrusting-perlman-3c2ee5.netlify.com"
    class="js-social-share has-link-underline"
    target="_blank"
    rel="noopener noreferrer"
    >Share this page on facebook</a
  >
  or
  <a
    href="https://twitter.com/intent/tweet?url=https%3A%2F%2Ftrusting-perlman-3c2ee5.netlify.com"
    class="js-social-share has-link-underline"
    target="_blank"
    rel="noopener noreferrer"
    >Share this page on twitter</a
  >
</p>
<p>
  Some browsers have already a
  <a
    href="https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share"
    target="_blank"
    rel="noopener noreferrer"
    >native Share API</a
  >
  implemented. You can have a button (or a link) that opens a native share dialog on mobile browsers.
</p>
<p>
  <button
    class="btn btn-primary js-social-share-native"
    data-share-title="Frontend Workflow demo"
    data-share-text="This page contains demo data for the Frontend Workflow"
    data-share-url="https://trusting-perlman-3c2ee5.netlify.com"
  >
    Open share dialog
  </button>
</p>
<p>
  Note: As only mobile browsers currently support that feature, you should hide the button on desktop
  browsers.
</p>
`
}

export const Default = Template.bind({})
Default.args = {}
