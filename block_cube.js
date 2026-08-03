/**
 * Custom Block: KUBUS (GeoBlock BBGTK DIY)
 */
Blockly.Blocks['shape_cube'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("buat kubus");
    this.appendValueInput("SIZE_X").setCheck("Number").appendField("panjang X");
    this.appendValueInput("SIZE_Y").setCheck("Number").appendField("lebar Y");
    this.appendValueInput("SIZE_Z").setCheck("Number").appendField("tinggi Z");
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
    this.setTooltip("Membuat objek 3D Kubus / Balok");
  }
};

const genCube = javascript.javascriptGenerator || javascriptGenerator;
genCube.forBlock['shape_cube'] = function(block, generator) {
  const g = generator || genCube;
  var sx = g.valueToCode(block, 'SIZE_X', g.ORDER_ATOMIC) || '10';
  var sy = g.valueToCode(block, 'SIZE_Y', g.ORDER_ATOMIC) || '10';
  var sz = g.valueToCode(block, 'SIZE_Z', g.ORDER_ATOMIC) || '10';
  var px = g.valueToCode(block, 'POS_X', g.ORDER_ATOMIC) || '0';
  var py = g.valueToCode(block, 'POS_Y', g.ORDER_ATOMIC) || '0';
  var pz = g.valueToCode(block, 'POS_Z', g.ORDER_ATOMIC) || '0';
  var align = block.getFieldValue('ALIGN');

  var code = `
(function() {
  const geom = new THREE.BoxGeometry(${sx}, ${sz}, ${sy});
  const mat = new THREE.MeshStandardMaterial({ color: 0xC0C0C0, roughness: 0.4, metalness: 0.5 });
  const mesh = new THREE.Mesh(geom, mat);
  
  let finalX = Number(${px});
  let finalY = Number(${py});
  let finalZ = Number(${pz});

  if ("${align}" === "CORNER") {
    finalX += ${sx} / 2;
    finalY += ${sz} / 2;
    finalZ += ${sy} / 2;
  }
  
  mesh.position.set(finalX, finalY, finalZ);
  sceneGroup.add(mesh);
})();
`;
  return code;
};
