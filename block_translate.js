/**
 * Custom Block: TRANSLASI (GeoBlock BBGTK DIY)
 */
Blockly.Blocks['transform_translate'] = {
  init: function() {
    this.appendDummyInput().appendField("translasikan");
    this.appendValueInput("X").setCheck("Number").appendField("X");
    this.appendValueInput("Y").setCheck("Number").appendField("Y");
    this.appendValueInput("Z").setCheck("Number").appendField("Z");
    this.appendStatementInput("OBJECTS").appendField("objek");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#FF9800");
    this.setTooltip("Menggeser posisi objek sejauh sumbu X, Y, Z");
  }
};

const genTranslate = javascript.javascriptGenerator || javascriptGenerator;

genTranslate.forBlock['transform_translate'] = function(block, generator) {
  const g = generator || genTranslate;
  var x = g.valueToCode(block, 'X', g.ORDER_ATOMIC) || '0';
  var y = g.valueToCode(block, 'Y', g.ORDER_ATOMIC) || '0';
  var z = g.valueToCode(block, 'Z', g.ORDER_ATOMIC) || '0';
  var statement = g.statementToCode(block, 'OBJECTS');

  return `
(function() {
  const subGroup = new THREE.Group();
  const parentGroup = sceneGroup;
  sceneGroup = subGroup;
  ${statement}
  sceneGroup = parentGroup;

  subGroup.position.set(Number(${x}), Number(${y}), Number(${z}));
  sceneGroup.add(subGroup);
})();
`;
};
