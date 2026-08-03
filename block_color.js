/**
 * Custom Block: UBAH WARNA (MODE FORMAT HEX / RGB & TRANSPARANSI)
 * GeoBlock BBGTK DIY
 */

Blockly.Blocks['transform_color_palette'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("ubah warna format")
        .appendField(new Blockly.FieldDropdown([
          ["Hex (Palet)", "HEX"],
          ["RGB (Red, Green, Blue)", "RGB"]
        ], this.updateShape_.bind(this)), "FORMAT");

    // Input default (HEX)
    this.appendDummyInput("HEX_INPUT")
        .appendField(this.createColorPicker('#ff0000'), "COLOR_HEX");

    this.appendValueInput("OPACITY")
        .setCheck("Number")
        .appendField("transparansi (%)");

    this.appendStatementInput("OBJECTS")
        .appendField("objek");

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#FF9800");
    this.setTooltip("Pilih format warna (Hex Palet atau RGB) dan tentukan transparansinya (0-100%)");
  },

  // Fungsi khusus untuk memicu Color Picker HTML5 bawaan browser
  createColorPicker: function(defaultColor) {
    var field = new Blockly.FieldTextInput(defaultColor || '#ff0000');
    field.showEditor_ = function() {
      var self = this;
      var input = document.createElement('input');
      input.type = 'color';
      input.value = self.getValue();
      input.addEventListener('input', function() {
        self.setValue(input.value);
      });
      input.click();
    };
    return field;
  },

  // Mengubah bentuk blok berdasarkan pilihan dropdown (HEX / RGB)
  updateShape_: function(newMode) {
    if (this.getFieldValue('FORMAT') === newMode) return;

    this.workspace.recordUndo();

    if (this.getInput("HEX_INPUT")) this.removeInput("HEX_INPUT");
    if (this.getInput("RGB_INPUT")) this.removeInput("RGB_INPUT");

    this.removeInput("OPACITY");
    this.removeInput("OBJECTS");

    if (newMode === "HEX") {
      this.appendDummyInput("HEX_INPUT")
          .appendField(this.createColorPicker('#ff0000'), "COLOR_HEX");
    } else if (newMode === "RGB") {
      this.appendDummyInput("RGB_INPUT")
          .appendField("R:")
          .appendField(new Blockly.FieldNumber(255, 0, 255), "R")
          .appendField("G:")
          .appendField(new Blockly.FieldNumber(0, 0, 255), "G")
          .appendField("B:")
          .appendField(new Blockly.FieldNumber(0, 0, 255), "B");
    }

    this.appendValueInput("OPACITY")
        .setCheck("Number")
        .appendField("transparansi (%)");

    this.appendStatementInput("OBJECTS")
        .appendField("objek");
  }
};

// Generator Kode JavaScript untuk Three.js
javascript.javascriptGenerator.forBlock['transform_color_palette'] = function(block, generator) {
  var format = block.getFieldValue('FORMAT');
  var opacity = generator.valueToCode(block, 'OPACITY', generator.ORDER_ATOMIC) || '0';
  var statement = generator.statementToCode(block, 'OBJECTS');
  var colorString = "'#ff0000'";

  if (format === "HEX") {
    var hexVal = block.getFieldValue('COLOR_HEX') || '#ff0000';
    colorString = `"${hexVal}"`;
  } else if (format === "RGB") {
    var r = block.getFieldValue('R') || 0;
    var g = block.getFieldValue('G') || 0;
    var b = block.getFieldValue('B') || 0;
    colorString = `"rgb(${r}, ${g}, ${b})"`;
  }

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
      child.material.color.setStyle(${colorString});
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
