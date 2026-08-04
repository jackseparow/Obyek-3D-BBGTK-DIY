/**
 * Custom Block: IRISAN (INTERSECTION)
 * GeoBlock BBGTK DIY
 */

Blockly.Blocks['csg_intersection'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("irisan");
    
    this.appendStatementInput("OBJECTS")
        .appendField("objek-objek");

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#E91E63");
    this.setTooltip("Mengambil area/volume berpotongan yang saling beririsan di antara objek-objek");
  }
};

javascript.javascriptGenerator.forBlock['csg_intersection'] = function(block, generator) {
  var statement = generator.statementToCode(block, 'OBJECTS');

  return `
(function() {
  const intersectGroup = new THREE.Group();
  const parentGroup = sceneGroup;
  sceneGroup = intersectGroup;
  ${statement}
  sceneGroup = parentGroup;
  sceneGroup.add(intersectGroup);
})();
`;
};
