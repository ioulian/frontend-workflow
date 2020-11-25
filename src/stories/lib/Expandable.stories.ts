export default {
  title: 'Base Components/Expandable',
  argTypes: {
    label: {control: 'text'},
  },
}

const Template = ({label}: any) => {
  return `
<div class="fw-expandable">
  <h4>
    <button id="demo-expandable-toggle" class="fw-expandable__toggle">
      <span> ${label as string}</span>
    </button>
  </h4>
  <div id="demo-expandable-content" class="fw-expandable__content-wrapper">
    <div class="fw-expandable__content">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eleifend venenatis viverra.
        Sed ac turpis eu elit molestie malesuada at at nulla. Etiam ac interdum odio. Pellentesque id
        ornare ex, id vulputate lectus. Praesent et interdum elit, nec sagittis nisl. Aliquam vel
        hendrerit urna.
      </p>
      <p><input type="text" /></p>
      <p><input type="text" /></p>
      <p><input type="text" /></p>
      <p>
        Quisque scelerisque leo sit amet magna lobortis dictum. Quisque cursus, augue a interdum
        volutpat, felis mi ullamcorper diam, nec venenatis lacus ipsum id odio. Vestibulum ante ipsum
        primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec a elementum justo.
        Vestibulum in pulvinar tellus. Suspendisse dictum massa et tortor mollis mattis. Quisque blandit
        dapibus orci, eu pharetra leo iaculis non.
      </p>
      <p>
        Quisque tincidunt euismod placerat. Fusce aliquet blandit scelerisque. Donec ut ipsum a neque
        condimentum ornare. Sed porta massa sit amet tincidunt blandit. Nullam ultricies lectus ac
        vestibulum semper. Nunc cursus finibus mi. Vestibulum elit purus, imperdiet in ornare eu,
        accumsan at metus. Curabitur vel metus at ipsum congue volutpat ac vitae purus.
      </p>
    </div>
  </div>
</div>
`
}

export const Default = Template.bind({})
Default.args = {
  label: 'Accordion title example',
}
