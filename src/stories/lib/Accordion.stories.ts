export default {
  title: 'Base Components/Accordion',
  argTypes: {},
}

const Template = () => {
  return `
<div class="fw-accordion" data-close-others="true">
  <div class="fw-accordion__item">
    <h4>
      <button id="demo-accordion-1-toggle" class="fw-accordion__item__header fw-expandable__toggle">
        <span>Click to expand 1</span>
      </button>
    </h4>
    <div id="demo-accordion-1-content" class="fw-expandable__content-wrapper">
      <div class="fw-accordion__item__content fw-expandable__content">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eleifend venenatis
          viverra. Sed ac turpis eu elit molestie malesuada at at nulla. Etiam ac interdum odio.
          Pellentesque id ornare ex, id vulputate lectus. Praesent et interdum elit, nec sagittis nisl.
          Aliquam vel hendrerit urna.
        </p>
        <p><label for="input-1">Form input 1</label><input id="input-1" type="text" /></p>
        <p><label for="input-2">Form input 2</label><input id="input-2" type="text" /></p>
        <p><label for="input-3">Form input 3</label><input id="input-3" type="text" /></p>
        <p>
          Quisque tincidunt euismod placerat. Fusce aliquet blandit scelerisque. Donec ut ipsum a neque
          condimentum ornare. Sed porta massa sit amet tincidunt blandit. Nullam ultricies lectus ac
          vestibulum semper. Nunc cursus finibus mi. Vestibulum elit purus, imperdiet in ornare eu,
          accumsan at metus. Curabitur vel metus at ipsum congue volutpat ac vitae purus.
        </p>
      </div>
    </div>
  </div>
  <div class="fw-accordion__item">
    <h4>
      <button id="demo-accordion-2-toggle" class="fw-accordion__item__header fw-expandable__toggle">
        <span>Click to expand 2</span>
      </button>
    </h4>
    <div id="demo-accordion-2-content" class="fw-expandable__content-wrapper">
      <div class="fw-accordion__item__content fw-expandable__content">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eleifend venenatis
          viverra. Sed ac turpis eu elit molestie malesuada at at nulla. Etiam ac interdum odio.
          Pellentesque id ornare ex, id vulputate lectus. Praesent et interdum elit, nec sagittis nisl.
          Aliquam vel hendrerit urna.
        </p>
        <p>
          Quisque scelerisque leo sit amet magna lobortis dictum. Quisque cursus, augue a interdum
          volutpat, felis mi ullamcorper diam, nec venenatis lacus ipsum id odio. Vestibulum ante ipsum
          primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec a elementum justo.
          Vestibulum in pulvinar tellus. Suspendisse dictum massa et tortor mollis mattis. Quisque
          blandit dapibus orci, eu pharetra leo iaculis non.
        </p>
        <p>
          Quisque tincidunt euismod placerat. Fusce aliquet blandit scelerisque. Donec ut ipsum a neque
          condimentum ornare. Sed porta massa sit amet tincidunt blandit. Nullam ultricies lectus ac
          vestibulum semper. Nunc cursus finibus mi. Vestibulum elit purus, imperdiet in ornare eu,
          accumsan at metus. Curabitur vel metus at ipsum congue volutpat ac vitae purus.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eleifend venenatis
          viverra. Sed ac turpis eu elit molestie malesuada at at nulla. Etiam ac interdum odio.
          Pellentesque id ornare ex, id vulputate lectus. Praesent et interdum elit, nec sagittis nisl.
          Aliquam vel hendrerit urna.
        </p>
      </div>
    </div>
  </div>
  <div class="fw-accordion__item">
    <h4>
      <button id="demo-accordion-3-toggle" class="fw-accordion__item__header fw-expandable__toggle">
        <span>Click to expand 3</span>
      </button>
    </h4>
    <div id="demo-accordion-3-content" class="fw-expandable__content-wrapper">
      <div class="fw-accordion__item__content fw-expandable__content">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eleifend venenatis
          viverra. Sed ac turpis eu elit molestie malesuada at at nulla. Etiam ac interdum odio.
          Pellentesque id ornare ex, id vulputate lectus. Praesent et interdum elit, nec sagittis nisl.
          Aliquam vel hendrerit urna.
        </p>

        <p>
          Quisque scelerisque leo sit amet magna lobortis dictum. Quisque cursus, augue a interdum
          volutpat, felis mi ullamcorper diam, nec venenatis lacus ipsum id odio. Vestibulum ante ipsum
          primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec a elementum justo.
          Vestibulum in pulvinar tellus. Suspendisse dictum massa et tortor mollis mattis. Quisque
          blandit dapibus orci, eu pharetra leo iaculis non.
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
</div>
`
}

export const Default = Template.bind({})
Default.args = {}

Default.story = {
  parameters: {
    storySource: {
      source: `<div class="fw-accordion" data-close-others="true">
  <div class="fw-accordion__item">
    <h4>
      <button id="demo-accordion-1-toggle" class="fw-accordion__item__header fw-expandable__toggle">
        <span>Toggle 1</span>
      </button>
    </h4>
    <div id="demo-accordion-1-content" class="fw-expandable__content-wrapper">
      <div class="fw-accordion__item__content fw-expandable__content">
        <p>...</p>
      </div>
    </div>
  </div>
  <div class="fw-accordion__item">
    <h4>
      <button id="demo-accordion-2-toggle" class="fw-accordion__item__header fw-expandable__toggle">
        <span>Toggle 2</span>
      </button>
    </h4>
    <div id="demo-accordion-2-content" class="fw-expandable__content-wrapper">
      <div class="fw-accordion__item__content fw-expandable__content">
        <p>...</p>
      </div>
    </div>
  </div>
  <div class="fw-accordion__item">
    <h4>
      <button id="demo-accordion-3-toggle" class="fw-accordion__item__header fw-expandable__toggle">
        <span>Toggle 3</span>
      </button>
    </h4>
    <div id="demo-accordion-3-content" class="fw-expandable__content-wrapper">
      <div class="fw-accordion__item__content fw-expandable__content">
        <p>...</p>
      </div>
    </div>
  </div>
</div>`,
    },
  },
}
