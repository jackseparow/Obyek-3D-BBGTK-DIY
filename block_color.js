/**
 * Custom Block: UBAH WARNA (PALET WARNA & TRANSPARANSI)
 * GeoBlock BBGTK DIY
 */

// Pastikan FieldColour terdaftar di Blockly registry
if (window.fieldColour && window.fieldColour.FieldColour) {
  Blockly.fieldRegistry.register('field_colour', window.fieldColour.FieldColour);
}

Blockly.Blocks['transform_color_palette'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("ubah warna");

    // Menggunakan FieldColour dari plugin @blockly/field-colour atau bawaan
    if (window.fieldColour && window.fieldColour.FieldColour) {
      this.appendField(new window.fieldColour.FieldColour("#ff0000"), "COLOR");
    } else if (Blockly.FieldColour) {
      this.appendField(new Blockly.FieldColour("#ff0000"), "COLOR");
    } else {
      this.appendField(new Blockly.FieldTextInput("#ff0000"), "COLOR");
    }

    this.appendValueInput("OPACITY")
        .setCheck("Number")
        .appendField("transparansi (%)");

    this.appendStatementInput("OBJECTS")
        .appendField("objek");

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#FF9800");
    this.setTooltip("Klik kotak warna untuk memilih palet warna dan tentukan tingkat transparansinya (0-100%)");
  }
};

// Generator Kode JavaScript untuk Three.js
javascript.javascriptGenerator.forBlock['transform_color_palette'] = function(block, generator) {
  var color = block.getFieldValue('COLOR') || '#ff0000';
  var opacity = generator.valueToCode(block, 'OPACITY', generator.ORDER_ATOMIC) || '0';
  var statement = generator.statementToCode(block, 'OBJECTS');

  return `
(function() {
  const subGroup = new THREE.Group();
  const parentGroup = sceneGroup;
  sceneGroup = subGroup;
  ${statement}
  sceneGroup = parentGroup;

  const alpha = 1 - (Math.min(Math.max(Number(${opacity}), 0), 100) / 100);

  subGroup.traverse(child => {
    if (child.isMesh) {
      child.material = child.material.clone();
      child.material.color.setStyle("${color}");
      if (alpha < 1) {
        child.material.transparent = true;
        child.material.opacity = alpha;
      }
    }
  });

  sceneGroup.add(subGroup);
})();
`;
};
