/**
 * Blok Custom 3D Shapes: KUBUS (CUBE)
 */

// 1. Definisi Blok
Blockly.Blocks['shape_cube'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("buat kubus");
    this.appendValueInput("X")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("panjang X");
    this.appendValueInput("Y")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("lebar Y");
    this.appendValueInput("Z")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("tinggi Z");
    this.appendValueInput("COLOR")
        .setCheck("Colour")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("warna");
    this.setPreviousStatement(true, "3D_SHAPE");
    this.setNextStatement(true, "3D_SHAPE");
    this.setColour("#4C97FF");
    this.setTooltip("Membuat objek 3D Kubus / Balok");
    this.setHelpUrl("");
  }
};

// 2. Generator Kode JavaScript (Three.js)
javascriptGenerator.forBlock['shape_cube'] = function(block, generator) {
  var x = generator.valueToCode(block, 'X', javascriptGenerator.ORDER_ATOMIC) || '10';
  var y = generator.valueToCode(block, 'Y', javascriptGenerator.ORDER_ATOMIC) || '10';
  var z = generator.valueToCode(block, 'Z', javascriptGenerator.ORDER_ATOMIC) || '10';
  var color = generator.valueToCode(block, 'COLOR', javascriptGenerator.ORDER_ATOMIC) || "'#4c97ff'";

  var code = `
(function() {
  const geom = new THREE.BoxGeometry(${x}, ${z}, ${y});
  const mat = new THREE.MeshStandardMaterial({ color: ${color}, roughness: 0.3 });
  const mesh = new THREE.Mesh(geom, mat);
  mesh.position.set(0, ${z} / 2, 0);
  sceneGroup.add(mesh);
})();
`;
  return code;
};
