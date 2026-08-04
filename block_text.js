/**
 * Custom Block: TEKS 3D & TEKS 2D
 * GeoBlock BBGTK DIY
 */

// 1. Blok Teks 3D
Blockly.Blocks['shape_text_3d'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("teks 3D")
        .appendField(new Blockly.FieldTextInput("BBGTK DIY"), "TEXT");

    this.appendValueInput("SIZE")
        .setCheck("Number")
        .appendField("ukuran");

    this.appendValueInput("HEIGHT")
        .setCheck("Number")
        .appendField("tebal (3D)");

    this.appendDummyInput()
        .appendField("font")
        .appendField(new Blockly.FieldDropdown([
          ["Helvetiker (Bold)", "helvetiker_bold"],
          ["Helvetiker (Regular)", "helvetiker_regular"],
          ["Optimer (Regular)", "optimer_regular"],
          ["Gentilis (Regular)", "gentilis_regular"]
        ]), "FONT");

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#5BA58C");
    this.setTooltip("Membuat objek huruf/teks timbul 3D");
  }
};

javascript.javascriptGenerator.forBlock['shape_text_3d'] = function(block, generator) {
  var textStr = block.getFieldValue('TEXT') || "BBGTK DIY";
  var size = generator.valueToCode(block, 'SIZE', generator.ORDER_ATOMIC) || '10';
  var height = generator.valueToCode(block, 'HEIGHT', generator.ORDER_ATOMIC) || '2';
  var fontName = block.getFieldValue('FONT') || 'helvetiker_bold';

  return `
(function() {
  const textStr = "${textStr}";
  const textSize = Number(${size});
  const textHeight = Number(${height});
  
  // Menggunakan Canvas Texture 3D Papan Teks cepat
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 512;
  canvas.height = 256;
  ctx.fillStyle = '#ffffff';
  ctx.font = 'Bold ' + Math.floor(textSize * 8) + 'px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(textStr, 256, 128);

  const texture = new THREE.CanvasTexture(canvas);
  const mat = new THREE.MeshStandardMaterial({ 
    map: texture, 
    transparent: true, 
    side: THREE.DoubleSide 
  });
  
  const geo = new THREE.BoxGeometry(textSize * (textStr.length * 0.6), textSize * 1.2, textHeight);
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(0, 0, textHeight / 2);
  sceneGroup.add(mesh);
})();
`;
};


// 2. Blok Teks 2D (Flat Label)
Blockly.Blocks['shape_text_2d'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("teks 2D")
        .appendField(new Blockly.FieldTextInput("GeoBlock"), "TEXT");

    this.appendValueInput("SIZE")
        .setCheck("Number")
        .appendField("ukuran");

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#5BA58C");
    this.setTooltip("Membuat papan/label huruf 2D datar");
  }
};

javascript.javascriptGenerator.forBlock['shape_text_2d'] = function(block, generator) {
  var textStr = block.getFieldValue('TEXT') || "GeoBlock";
  var size = generator.valueToCode(block, 'SIZE', generator.ORDER_ATOMIC) || '10';

  return `
(function() {
  const textStr = "${textStr}";
  const textSize = Number(${size});

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 512;
  canvas.height = 128;
  ctx.fillStyle = '#ffffff';
  ctx.font = Math.floor(textSize * 10) + 'px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(textStr, 256, 64);

  const texture = new THREE.CanvasTexture(canvas);
  const geo = new THREE.PlaneGeometry(textSize * (textStr.length * 0.6), textSize);
  const mat = new THREE.MeshBasicMaterial({ map: texture, transparent: true, side: THREE.DoubleSide });
  const mesh = new THREE.Mesh(geo, mat);
  sceneGroup.add(mesh);
})();
`;
};
