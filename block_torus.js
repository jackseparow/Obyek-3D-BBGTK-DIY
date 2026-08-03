/**
 * Custom Block: TORUS / DONAT (GeoBlock BBGTK DIY)
 */
Blockly.Blocks['shape_torus'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("buat torus");
    this.appendValueInput("RADIUS")
        .setCheck("Number")
        .appendField("r-utama");
    this.appendValueInput("TUBE")
        .setCheck("Number")
        .appendField("r-tabung");
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
    this.setTooltip("Membuat objek 3D Torus / Donat");
  }
};

const genTorus = javascript.javascriptGenerator || javascriptGenerator;
genTorus.forBlock['shape_torus'] = function(block, generator) {
  const g = generator || genTorus;
  var radius = g.valueToCode(block, 'RADIUS', g.ORDER_ATOMIC) || '8';
  var tube = g.valueToCode(block, 'TUBE', g.ORDER_ATOMIC) || '3';
  var align = block.getFieldValue('ALIGN');

  var code = `
(function() {
  const geom = new THREE.TorusGeometry(${radius}, ${tube}, 16, 100);
  const mat = new THREE.MeshStandardMaterial({ color: 0xC0C0C0, roughness: 0.4, metalness: 0.5 });
  const mesh = new THREE.Mesh(geom, mat);
  mesh.rotation.x = Math.PI / 2; // Berbaring sejajar bidang XZ
  
  if ("${align}" === "CORNER") {
    const outerR = Number(${radius}) + Number(${tube});
    mesh.position.set(outerR, ${tube}, outerR);
  } else {
    mesh.position.set(0, 0, 0); // Default: Titik Pusat Masa (0,0,0)
  }
  
  sceneGroup.add(mesh);
})();
`;
  return code;
};
