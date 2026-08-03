/**
 * Blok Custom 3D Shapes: BOLA (SPHERE)
 */

// 1. Definisi Blok
Blockly.Blocks['shape_sphere'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("buat bola");
    this.appendValueInput("RADIUS")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("jari-jari (r)");
    this.appendValueInput("COLOR")
        .setCheck("Colour")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("warna");
    this.setPreviousStatement(true, "3D_SHAPE");
    this.setNextStatement(true, "3D_SHAPE");
    this.setColour("#4C97FF");
    this.setTooltip("Membuat objek 3D Bola");
    this.setHelpUrl("");
  }
};

// 2. Generator Kode JavaScript (Three.js)
javascriptGenerator.forBlock['shape_sphere'] = function(block, generator) {
  var radius = generator.valueToCode(block, 'RADIUS', javascriptGenerator.ORDER_ATOMIC) || '5';
  var color = generator.valueToCode(block, 'COLOR', javascriptGenerator.ORDER_ATOMIC) || "'#ff4c4c'";

  var code = `
(function() {
  const geom = new THREE.SphereGeometry(${radius}, 32, 16);
  const mat = new THREE.MeshStandardMaterial({ color: ${color}, roughness: 0.3 });
  const mesh = new THREE.Mesh(geom, mat);
  mesh.position.set(0, ${radius}, 0);
  sceneGroup.add(mesh);
})();
`;
  return code;
};
