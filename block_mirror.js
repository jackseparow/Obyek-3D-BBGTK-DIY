/**
 * Custom Block: PENCERMINAN (GeoBlock BBGTK DIY)
 */

// 1. Pencerminan terhadap Bidang Utama (XY, XZ, YZ)
Blockly.Blocks['transform_mirror_plane'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("cerminkan terhadap bidang")
        .appendField(new Blockly.FieldDropdown([
          ["XY (Sumbu Z dibalik)", "XY"],
          ["XZ (Sumbu Y dibalik)", "XZ"],
          ["YZ (Sumbu X dibalik)", "YZ"]
        ]), "PLANE");
    this.appendStatementInput("OBJECTS").appendField("objek");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#FF9800");
    this.setTooltip("Mencerminkan objek terhadap bidang koordinat XY, XZ, atau YZ");
  }
};

// 2. Pencerminan Terhadap Koordinat (x,y,z) & Rotasi
Blockly.Blocks['transform_mirror_point_rotate'] = {
  init: function() {
    this.appendDummyInput().appendField("cerminkan terhadap koordinat");
    this.appendValueInput("POS_X").setCheck("Number").appendField("x");
    this.appendValueInput("POS_Y").setCheck("Number").appendField("y");
    this.appendValueInput("POS_Z").setCheck("Number").appendField("z");
    this.appendValueInput("ANGLE").setCheck("Number").appendField("dan rotasikan (°)");
    this.appendStatementInput("OBJECTS").appendField("objek");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#FF9800");
    this.setTooltip("Mencerminkan objek terhadap titik (x,y,z) lalu memutarnya");
  }
};

const genMirror = javascript.javascriptGenerator || javascriptGenerator;

genMirror.forBlock['transform_mirror_plane'] = function(block, generator) {
  var plane = block.getFieldValue('PLANE');
  var statement = generator.statementToCode(block, 'OBJECTS');

  return `
(function() {
  const subGroup = new THREE.Group();
  const parentGroup = sceneGroup;
  sceneGroup = subGroup;
  ${statement}
  sceneGroup = parentGroup;

  if ("${plane}" === "XY") subGroup.scale.z *= -1;
  if ("${plane}" === "XZ") subGroup.scale.y *= -1;
  if ("${plane}" === "YZ") subGroup.scale.x *= -1;

  sceneGroup.add(subGroup);
})();
`;
};

genMirror.forBlock['transform_mirror_point_rotate'] = function(block, generator) {
  const g = generator || genMirror;
  var px = g.valueToCode(block, 'POS_X', g.ORDER_ATOMIC) || '0';
  var py = g.valueToCode(block, 'POS_Y', g.ORDER_ATOMIC) || '0';
  var pz = g.valueToCode(block, 'POS_Z', g.ORDER_ATOMIC) || '0';
  var angle = g.valueToCode(block, 'ANGLE', g.ORDER_ATOMIC) || '0';
  var statement = g.statementToCode(block, 'OBJECTS');

  return `
(function() {
  const subGroup = new THREE.Group();
  const parentGroup = sceneGroup;
  sceneGroup = subGroup;
  ${statement}
  sceneGroup = parentGroup;

  const center = new THREE.Vector3(Number(${px}), Number(${py}), Number(${pz}));
  const rad = (Number(${angle}) * Math.PI) / 180;

  // Refleksi terhadap titik pusat (x,y,z) -> Geser, Balik Skala (-1,-1,-1), Geser Kembali
  subGroup.position.sub(center);
  subGroup.scale.set(-1, -1, -1);
  subGroup.rotation.z += rad;
  subGroup.position.add(center);

  sceneGroup.add(subGroup);
})();
`;
};
