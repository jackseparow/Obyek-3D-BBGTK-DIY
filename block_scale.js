/**
 * Custom Block: DILATASI / SKALA (GeoBlock BBGTK DIY)
 */
Blockly.Blocks['transform_scale'] = {
  init: function() {
    this.appendDummyInput().appendField("dilatasikan (skala)");
    this.appendValueInput("X").setCheck("Number").appendField("X");
    this.appendValueInput("Y").setCheck("Number").appendField("Y");
    this.appendValueInput("Z").setCheck("Number").appendField("Z");
    this.appendStatementInput("OBJECTS").appendField("objek");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#FF9800");
    this.setTooltip("Mengubah ukuran skala objek berdasarkan sumbu X, Y, Z");
  }
};

const genScale = javascript.javascriptGenerator || javascriptGenerator;

genScale.forBlock['transform_scale'] = function(block, generator) {
  const g = generator || genScale;
  var sx = g.valueToCode(block, 'X', g.ORDER_ATOMIC) || '1';
  var sy = g.valueToCode(block, 'Y', g.ORDER_ATOMIC) || '1';
  var sz = g.valueToCode(block, 'Z', g.ORDER_ATOMIC) || '1';
  var statement = g.statementToCode(block, 'OBJECTS');

  return `
(function() {
  const subGroup = new THREE.Group();
  const parentGroup = sceneGroup;
  sceneGroup = subGroup;
  ${statement}
  sceneGroup = parentGroup;

  subGroup.scale.set(Number(${sx}), Number(${sy}), Number(${sz}));
  sceneGroup.add(subGroup);
})();
`;
};
