/**
 * Custom Block: LINGKARAN 2D (GeoBlock BBGTK DIY)
 */
Blockly.Blocks['shape_circle'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("buat lingkaran 2D");
    this.appendValueInput("RADIUS")
        .setCheck("Number")
        .appendField("jari-jari (r)");
    this.appendDummyInput()
        .appendField("titik acuan")
        .appendField(new Blockly.FieldDropdown([
          ["titik pusat", "CENTER"],
          ["tepi", "CORNER"]
        ]), "ALIGN");
    this.appendValueInput("POS_X").setCheck("Number").appendField("x");
    this.appendValueInput("POS_Y").setCheck("Number").appendField("y");
    this.appendValueInput("POS_Z").setCheck("Number").appendField("z");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#9C27B0"); // Warna kategori 2D (Ungu)
    this.setTooltip("Membuat bentuk 2D Lingkaran di bidang horizontal");
  }
};

const genCircle = javascript.javascriptGenerator || javascriptGenerator;
genCircle.forBlock['shape_circle'] = function(block, generator) {
  const g = generator || genCircle;
  var radius = g.valueToCode(block, 'RADIUS', g.ORDER_ATOMIC) || '5';
  var px = g.valueToCode(block, 'POS_X', g.ORDER_ATOMIC) || '0';
  var py = g.valueToCode(block, 'POS_Y', g.ORDER_ATOMIC) || '0';
  var pz = g.valueToCode(block, 'POS_Z', g.ORDER_ATOMIC) || '0';
  var align = block.getFieldValue('ALIGN');

  var code = `
(function() {
  const geom = new THREE.RingGeometry(0, ${radius}, 32);
  const mat = new THREE.MeshStandardMaterial({ 
    color: 0xC0C0C0, 
    roughness: 0.4, 
    metalness: 0.5, 
    side: THREE.DoubleSide 
  });
  const mesh = new THREE.Mesh(geom, mat);
  mesh.rotation.x = Math.PI / 2; // Merebahkan lingkaran sejajar bidang XZ
  
  let finalX = Number(${px});
  let finalY = Number(${py});
  let finalZ = Number(${pz});

  if ("${align}" === "CORNER") {
    finalX += Number(${radius});
    finalZ += Number(${radius});
  }

  mesh.position.set(finalX, finalY, finalZ);
  sceneGroup.add(mesh);
})();
`;
  return code;
};
