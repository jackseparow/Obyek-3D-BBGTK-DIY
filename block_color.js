/**
 * Custom Block: UBAH WARNA (PALET WARNA & TRANSPARANSI)
 * GeoBlock BBGTK DIY
 */

// Registrasi blok pemilih warna jika belum ada di core Blockly
if (!Blockly.Blocks['colour_picker']) {
  Blockly.Blocks['colour_picker'] = {
    init: function() {
      this.appendDummyInput().appendField(new Blockly.FieldTextInput('#ff0000'), 'COLOUR');
      this.setOutput(true, 'Colour');
      this.setColour('#FF9800');
    }
  };
  javascript.javascriptGenerator.forBlock['colour_picker'] = function(block) {
    var colour = block.getFieldValue('COLOUR') || '#ff0000';
    return [`'${colour}'`, javascript.javascriptGenerator.ORDER_ATOMIC];
  };
}

// Blok Utama Ubah Warna (Palet + Transparansi)
Blockly.Blocks['transform_color_palette'] = {
  init: function() {
    this.appendDummyInput().appendField("ubah warna");
    this.appendValueInput("COLOR").setCheck("Colour");
    this.appendValueInput("OPACITY").setCheck("Number").appendField("transparansi (%)");
    this.appendStatementInput("OBJECTS").appendField("objek");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#FF9800");
    this.setTooltip("Mengubah warna objek menggunakan palet warna dan menentukan persentase transparansi (0-100%)");
  }
};

javascript.javascriptGenerator.forBlock['transform_color_palette'] = function(block, generator) {
  var color = generator.valueToCode(block, 'COLOR', generator.ORDER_ATOMIC) || "'#ff0000'";
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
      child.material.color.setStyle(${color});
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
