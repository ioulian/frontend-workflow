export default {
  title: 'Base Components/Tabs',
  argTypes: {},
}

const Template = () => {
  return `
<div class="demo-tabs">
  <div class="fw-tablist">
    <div aria-controls="apple">Apple</div>
    <div aria-controls="orange">Orange</div>
    <div aria-controls="pear">Pear</div>
  </div>

  <div id="apple">
    An apple is a sweet, edible fruit produced by an apple tree (Malus domestica). Apple trees are
    cultivated worldwide and are the most widely grown species in the genus Malus. The tree originated
    in Central Asia, where its wild ancestor, Malus sieversii, is still found today. Apples have been
    grown for thousands of years in Asia and Europe and were brought to North America by European
    colonists. Apples have religious and mythological significance in many cultures, including Norse,
    Greek and European Christian tradition.
  </div>
  <div id="orange">
    The orange is the fruit of the citrus species Citrus × sinensis in the family Rutaceae, native to
    China. It is also called sweet orange, to distinguish it from the related Citrus × aurantium,
    referred to as bitter orange. The sweet orange reproduces asexually (apomixis through nucellar
    embryony); varieties of sweet orange arise through mutations.
  </div>
  <div id="pear">
    The pear tree and shrub are a species of genus Pyrus /ˈpaɪrəs/, in the family Rosaceae, bearing the
    pomaceous fruit of the same name. Several species of pear are valued for their edible fruit and
    juices while others are cultivated as trees.
  </div>
</div>
`
}

export const Default = Template.bind({})
Default.args = {}
