export default {
  title: 'Base Components/Masonry (Colcade)',
  argTypes: {},
}

const Template = () => {
  return `
<p>
  <a href="https://github.com/desandro/colcade" target="_blank" rel="noopener noreferrer">Colcade</a> is
  a new library form the maker of Masonry library. It's lightweight (but has a bit less options). This
  is a wrapper around it.
</p>
<div class="container">
  <div class="row fw-colcade">
    <div class="col-6 fw-colcade__grid-col"></div>
    <div class="col-6 fw-colcade__grid-col"></div>
    <div class="fw-colcade__grid-item">
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
        class="fw-lazy-load fw-lazy-load--opacity"
        data-src="https://picsum.photos/460/500"
        alt="Sample Colcade image 1"
        width="460"
        height="500"
        intrinsicsize="460 x 500"
      />
    </div>
    <div class="fw-colcade__grid-item">
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
        class="fw-lazy-load fw-lazy-load--opacity"
        data-src="https://picsum.photos/460/400"
        alt="Sample Colcade image 2"
        width="460"
        height="400"
        intrinsicsize="460 x 400"
      />
    </div>
    <div class="fw-colcade__grid-item">
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
        class="fw-lazy-load fw-lazy-load--opacity"
        data-src="https://picsum.photos/460/300"
        alt="Sample Colcade image 3"
        width="460"
        height="300"
        intrinsicsize="460 x 300"
      />
    </div>
    <div class="fw-colcade__grid-item">
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
        class="fw-lazy-load fw-lazy-load--opacity"
        data-src="https://picsum.photos/460/700"
        alt="Sample Colcade image 4"
        width="460"
        height="700"
        intrinsicsize="460 x 700"
      />
    </div>
    <div class="fw-colcade__grid-item">
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
        class="fw-lazy-load fw-lazy-load--opacity"
        data-src="https://picsum.photos/460/420"
        alt="Sample Colcade image 5"
        width="460"
        height="420"
        intrinsicsize="460 x 420"
      />
    </div>
  </div>
</div>
`
}

export const Default = Template.bind({})
Default.args = {}
