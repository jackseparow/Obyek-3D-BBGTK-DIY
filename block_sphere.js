/**
 * Custom Block: BOLA (GeoBlock BBGTK DIY)
 */
Blockly.Blocks['shape_sphere'] = {
  init: function() {
    this.appendValueInput("RADIUS")
        .setCheck("Number")
        .appendField("buat bola  jari-jari (r)");
    this.setInputsInline(true); // Memanjang ke kanan
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#4C97FF");
    this.setTooltip("Membuat objek 3D Bola");
  }
};

const genSphere = javascript.javascriptGenerator || javascriptGenerator;
genSphere.forBlock['shape_sphere'] = function(block, generator) {
  const g = generator || genSphere;
  var radius = g.valueToCode(block, 'RADIUS', g.ORDER_ATOMIC) || '5';

  var code = `
(function() {
  const geom = new THREE.SphereGeometry(${radius}, 32, 16);
  const mat = new THREE.MeshStandardMaterial({ color: 0xC0C0C0, roughness: 0.4, metalness: 0.5 });
  const mesh = new THREE.Mesh(geom, mat);
  mesh.position.set(0, ${radius}, 0);
  sceneGroup.add(mesh);
})();
`;
  return code;
};
