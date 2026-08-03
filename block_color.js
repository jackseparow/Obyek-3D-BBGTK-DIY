Blockly.Blocks['transform_color'] = {
  init: function() {
    this.appendDummyInput().appendField("ubah warna");
    this.appendValueInput("COLOR").setCheck("Colour");
    this.appendValueInput("OPACITY").setCheck("Number").appendField("transparansi (%)");
    this.appendStatementInput("OBJECTS").appendField("objek");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#FF9800");
  }
};

javascript.javascriptGenerator.forBlock['transform_color'] = function(block, generator) {
  var color = generator.valueToCode(block, 'COLOR', generator.ORDER_ATOMIC) || "'#ff0000'";
  var opacity = generator.valueToCode(block, 'OPACITY', generator.ORDER_ATOMIC) || '0';
  var statement = generator.statementToCode(block, 'OBJECTS');

  return `
(function() {
  const subGroup = new THREE.Group();
  const parentGroup = sceneGroup;
  sceneGroup = subGroup;
  ${statement}
  sceneGroup = parentGroup;

  const alpha = 1 - (Math.min(Math.max(Number(${opacity}), 0), 100) / 100);

  subGroup.traverse(child => {
    if (child.isMesh) {
      child.material = child.material.clone();
      child.material.color.setStyle(${color});
      if (alpha < 1) {
        child.material.transparent = true;
        child.material.opacity = alpha;
      }
    }
  });

  sceneGroup.add(subGroup);
})();
`;
};
