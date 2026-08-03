/**
 * Blok Custom 3D Shapes: SILINDER (CYLINDER)
 */

// 1. Definisi Blok
Blockly.Blocks['shape_cylinder'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("buat silinder");
    this.appendValueInput("RADIUS_TOP")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("jari-jari atas");
    this.appendValueInput("RADIUS_BOTTOM")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("jari-jari bawah");
    this.appendValueInput("HEIGHT")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("tinggi");
    this.appendValueInput("COLOR")
        .setCheck("Colour")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("warna");
    this.setPreviousStatement(true, "3D_SHAPE");
    this.setNextStatement(true, "3D_SHAPE");
    this.setColour("#4C97FF");
    this.setTooltip("Membuat objek 3D Silinder atau Kerucut");
    this.setHelpUrl("");
  }
};

// 2. Generator Kode JavaScript (Three.js)
javascriptGenerator.forBlock['shape_cylinder'] = function(block, generator) {
  var rTop = generator.valueToCode(block, 'RADIUS_TOP', javascriptGenerator.ORDER_ATOMIC) || '5';
  var rBottom = generator.valueToCode(block, 'RADIUS_BOTTOM', javascriptGenerator.ORDER_ATOMIC) || '5';
  var height = generator.valueToCode(block, 'HEIGHT', javascriptGenerator.ORDER_ATOMIC) || '10';
  var color = generator.valueToCode(block, 'COLOR', javascriptGenerator.ORDER_ATOMIC) || "'#4caf50'";

  var code = `
(function() {
  const geom = new THREE.CylinderGeometry(${rTop}, ${rBottom}, ${height}, 32);
  const mat = new THREE.MeshStandardMaterial({ color: ${color}, roughness: 0.3 });
  const mesh = new THREE.Mesh(geom, mat);
  mesh.position.set(0, ${height} / 2, 0);
  sceneGroup.add(mesh);
})();
`;
  return code;
};
