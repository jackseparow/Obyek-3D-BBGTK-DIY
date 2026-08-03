/**
 * Custom Block: SILINDER (GeoBlock BBGTK DIY)
 */
Blockly.Blocks['shape_cylinder'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("buat silinder");
    this.appendValueInput("RADIUS_TOP").setCheck("Number").appendField("r-atas");
    this.appendValueInput("RADIUS_BOTTOM").setCheck("Number").appendField("r-bawah");
    this.appendValueInput("HEIGHT").setCheck("Number").appendField("tinggi");
    this.appendDummyInput()
        .appendField("titik acuan")
        .appendField(new Blockly.FieldDropdown([
          ["pusat massa", "CENTER"],
          ["tepi", "CORNER"]
        ]), "ALIGN");
    this.appendValueInput("POS_X").setCheck("Number").appendField("x");
    this.appendValueInput("POS_Y").setCheck("Number").appendField("y");
    this.appendValueInput("POS_Z").setCheck("Number").appendField("z");
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
  var px = g.valueToCode(block, 'POS_X', g.ORDER_ATOMIC) || '0';
  var py = g.valueToCode(block, 'POS_Y', g.ORDER_ATOMIC) || '0';
  var pz = g.valueToCode(block, 'POS_Z', g.ORDER_ATOMIC) || '0';
  var align = block.getFieldValue('ALIGN');

  var code = `
(function() {
  const geom = new THREE.CylinderGeometry(${rTop}, ${rBottom}, ${height}, 32);
  const mat = new THREE.MeshStandardMaterial({ color: 0xC0C0C0, roughness: 0.4, metalness: 0.5 });
  const mesh = new THREE.Mesh(geom, mat);
  
  let finalX = Number(${px});
  let finalY = Number(${py});
  let finalZ = Number(${pz});

  if ("${align}" === "CORNER") {
    const maxR = Math.max(${rTop}, ${rBottom});
    finalX += maxR;
    finalY += ${height} / 2;
    finalZ += maxR;
  }

  mesh.position.set(finalX, finalY, finalZ);
  sceneGroup.add(mesh);
})();
`;
  return code;
};
