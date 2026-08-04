/**
 * Custom Block: GABUNGAN (UNION)
 * GeoBlock BBGTK DIY
 */

Blockly.Blocks['csg_union'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("gabungan");
    
    this.appendStatementInput("OBJECTS")
        .appendField("objek-objek");

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#E91E63");
    this.setTooltip("Menggabungkan beberapa objek menjadi satu kesatuan objek solid");
  }
};

javascript.javascriptGenerator.forBlock['csg_union'] = function(block, generator) {
  var statement = generator.statementToCode(block, 'OBJECTS');

  return `
(function() {
  const unionGroup = new THREE.Group();
  const parentGroup = sceneGroup;
  sceneGroup = unionGroup;
  ${statement}
  sceneGroup = parentGroup;
  sceneGroup.add(unionGroup);
})();
`;
};
