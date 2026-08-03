/**
 * Custom Block: KUBUS (GeoBlock BBGTK DIY)
 */
Blockly.Blocks['shape_cube'] = {
  init: function() {
    this.appendValueInput("X")
        .setCheck("Number")
        .appendField("buat kubus  panjang X");
    this.appendValueInput("Y")
        .setCheck("Number")
        .appendField("lebar Y");
    this.appendValueInput("Z")
        .setCheck("Number")
        .appendField("tinggi Z");
    this.setInputsInline(true); // Memanjang ke kanan
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#4C97FF");
    this.setTooltip("Membuat objek 3D Kubus / Balok");
  }
};

const genCube = javascript.javascriptGenerator || javascriptGenerator;
genCube.forBlock['shape_cube'] = function(block, generator) {
  const g = generator || genCube;
  var x = g.valueToCode(block, 'X', g.ORDER_ATOMIC) || '10';
  var y = g.valueToCode(block, 'Y', g.ORDER_ATOMIC) || '10';
  var z = g.valueToCode(block, 'Z', g.ORDER_ATOMIC) || '10';

  var code = `
(function() {
  const geom = new THREE.BoxGeometry(${x}, ${z}, ${y});
  const mat = new THREE.MeshStandardMaterial({ color: 0xC0C0C0, roughness: 0.4, metalness: 0.5 });
  const mesh = new THREE.Mesh(geom, mat);
  mesh.position.set(0, ${z} / 2, 0);
  sceneGroup.add(mesh);
})();
`;
  return code;
};
