/**
 * Custom Block: ROTASI (GeoBlock BBGTK DIY)
 */

// 1. Rotasi Sumbu X, Y, Z
Blockly.Blocks['transform_rotate'] = {
  init: function() {
    this.appendDummyInput().appendField("rotasikan");
    this.appendValueInput("X").setCheck("Number").appendField("X (°)");
    this.appendValueInput("Y").setCheck("Number").appendField("Y (°)");
    this.appendValueInput("Z").setCheck("Number").appendField("Z (°)");
    this.appendStatementInput("OBJECTS").appendField("objek");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#FF9800");
    this.setTooltip("Memutar objek berdasarkan sudut derajat sumbu X, Y, Z");
  }
};

// 2. Rotasi Mengitari Titik Koordinat Tertentu (Fancy Rotate)
Blockly.Blocks['transform_rotate_around_point'] = {
  init: function() {
    this.appendDummyInput().appendField("rotasikan sebesar");
    this.appendValueInput("ANGLE").setCheck("Number").appendField("(°)");
    this.appendDummyInput()
        .appendField("pada sumbu")
        .appendField(new Blockly.FieldDropdown([
          ["X", "X"],
          ["Y", "Y"],
          ["Z", "Z"]
        ]), "AXIS")
        .appendField("mengitari titik");
    this.appendValueInput("POS_X").setCheck("Number").appendField("x");
    this.appendValueInput("POS_Y").setCheck("Number").appendField("y");
    this.appendValueInput("POS_Z").setCheck("Number").appendField("z");
    this.appendStatementInput("OBJECTS").appendField("objek");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#FF9800");
    this.setTooltip("Memutar objek mengitari titik pusat koordinat tertentu");
  }
};

const genRotate = javascript.javascriptGenerator || javascriptGenerator;

genRotate.forBlock['transform_rotate'] = function(block, generator) {
  const g = generator || genRotate;
  var rx = g.valueToCode(block, 'X', g.ORDER_ATOMIC) || '0';
  var ry = g.valueToCode(block, 'Y', g.ORDER_ATOMIC) || '0';
  var rz = g.valueToCode(block, 'Z', g.ORDER_ATOMIC) || '0';
  var statement = g.statementToCode(block, 'OBJECTS');

  return `
(function() {
  const subGroup = new THREE.Group();
  const parentGroup = sceneGroup;
  sceneGroup = subGroup;
  ${statement}
  sceneGroup = parentGroup;

  subGroup.rotation.set(
    (Number(${rx}) * Math.PI) / 180,
    (Number(${ry}) * Math.PI) / 180,
    (Number(${rz}) * Math.PI) / 180
  );
  sceneGroup.add(subGroup);
})();
`;
};

genRotate.forBlock['transform_rotate_around_point'] = function(block, generator) {
  const g = generator || genRotate;
  var angle = g.valueToCode(block, 'ANGLE', g.ORDER_ATOMIC) || '45';
  var axis = block.getFieldValue('AXIS');
  var px = g.valueToCode(block, 'POS_X', g.ORDER_ATOMIC) || '0';
  var py = g.valueToCode(block, 'POS_Y', g.ORDER_ATOMIC) || '0';
  var pz = g.valueToCode(block, 'POS_Z', g.ORDER_ATOMIC) || '0';
  var statement = g.statementToCode(block, 'OBJECTS');

  return `
(function() {
  const subGroup = new THREE.Group();
  const parentGroup = sceneGroup;
  sceneGroup = subGroup;
  ${statement}
  sceneGroup = parentGroup;

  const point = new THREE.Vector3(Number(${px}), Number(${py}), Number(${pz}));
  const rad = (Number(${angle}) * Math.PI) / 180;
  
  // Geser ke titik pivot -> Rotasi -> Geser kembali
  subGroup.position.sub(point);
  if ("${axis}" === "X") subGroup.position.applyAxisAngle(new THREE.Vector3(1, 0, 0), rad);
  if ("${axis}" === "Y") subGroup.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), rad);
  if ("${axis}" === "Z") subGroup.position.applyAxisAngle(new THREE.Vector3(0, 0, 1), rad);
  subGroup.position.add(point);

  if ("${axis}" === "X") subGroup.rotation.x += rad;
  if ("${axis}" === "Y") subGroup.rotation.y += rad;
  if ("${axis}" === "Z") subGroup.rotation.z += rad;

  sceneGroup.add(subGroup);
})();
`;
};
