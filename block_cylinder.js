/**
 * Custom Block: SILINDER (GeoBlock BBGTK DIY)
 */
Blockly.Blocks['shape_cylinder'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("buat silinder");
    this.appendValueInput("RADIUS_TOP")
        .setCheck("Number")
        .appendField("r-atas");
    this.appendValueInput("RADIUS_BOTTOM")
        .setCheck("Number")
        .appendField("r-bawah");
    this.appendValueInput("HEIGHT")
        .setCheck("Number")
        .appendField("tinggi");
    this.appendDummyInput()
        .appendField("posisi acuan")
        .appendField(new Blockly.FieldDropdown([
          ["titik pusat", "CENTER"],
          ["tepi", "CORNER"]
        ]), "ALIGN");
    this.setInputsInline(true);
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
  var align = block.getFieldValue('ALIGN');

  var code = `
(function() {
  const geom = new THREE.CylinderGeometry(${rTop}, ${rBottom}, ${height}, 32);
  const mat = new THREE.MeshStandardMaterial({ color: 0xC0C0C0, roughness: 0.4, metalness: 0.5 });
  const mesh = new THREE.Mesh(geom, mat);
  
  if ("${align}" === "CORNER") {
    const maxR = Math.max(${rTop}, ${rBottom});
    mesh.position.set(maxR, ${height} / 2, maxR);
  } else {
    mesh.position.set(0, 0, 0); // Default: Titik Pusat Masa (0,0,0)
  }
  
  sceneGroup.add(mesh);
})();
`;
  return code;
};
