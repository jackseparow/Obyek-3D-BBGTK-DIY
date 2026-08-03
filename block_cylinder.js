/**
 * Custom Block: SILINDER (GeoBlock BBGTK DIY)
 */
Blockly.Blocks['shape_cylinder'] = {
  init: function() {
    this.appendValueInput("RADIUS_TOP")
        .setCheck("Number")
        .appendField("buat silinder  r-atas");
    this.appendValueInput("RADIUS_BOTTOM")
        .setCheck("Number")
        .appendField("r-bawah");
    this.appendValueInput("HEIGHT")
        .setCheck("Number")
        .appendField("tinggi");
    this.setInputsInline(true); // Memanjang ke kanan
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#4C97FF");
    this.setTooltip("Membuat objek 3D Silinder atau Kerucut");
  }
};

const genCylinder = javascript.javascriptGenerator || javascriptGenerator;
genCylinder.forBlock['shape_cylinder'] = function(block, generator) {
  const g = generator || genCylinder;
  var rTop = g.valueToCode(block, 'RADIUS_TOP', g.ORDER_ATOMIC) || '5';
  var rBottom = g.valueToCode(block, 'RADIUS_BOTTOM', g.ORDER_ATOMIC) || '5';
  var height = g.valueToCode(block, 'HEIGHT', g.ORDER_ATOMIC) || '10';

  var code = `
(function() {
  const geom = new THREE.CylinderGeometry(${rTop}, ${rBottom}, ${height}, 32);
  const mat = new THREE.MeshStandardMaterial({ color: 0xC0C0C0, roughness: 0.4, metalness: 0.5 });
  const mesh = new THREE.Mesh(geom, mat);
  mesh.position.set(0, ${height} / 2, 0);
  sceneGroup.add(mesh);
})();
`;
  return code;
};
