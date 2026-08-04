/**
 * Custom Block: TEKS 3D & TEKS 2D (Sesuai Standar BlocksCAD)
 * GeoBlock BBGTK DIY
 */

// 1. Blok Teks 3D Asli BlocksCAD
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
          ["Helvetiker", "helvetiker"],
          ["Optimer", "optimer"],
          ["Gentilis", "gentilis"]
        ]), "FONT");

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#5BA58C");
    this.setTooltip("Membuat geometri huruf 3D timbul padat persis BlocksCAD");
  }
};

javascript.javascriptGenerator.forBlock['shape_text_3d'] = function(block, generator) {
  var textStr = block.getFieldValue('TEXT') || "BBGTK DIY";
  var size = generator.valueToCode(block, 'SIZE', generator.ORDER_ATOMIC) || '10';
  var height = generator.valueToCode(block, 'HEIGHT', generator.ORDER_ATOMIC) || '2';
  var fontName = block.getFieldValue('FONT') || 'helvetiker';

  return `
(function() {
  const textStr = "${textStr}";
  const sizeVal = Number(${size});
  const heightVal = Number(${height});
  const fontKey = "${fontName}";

  if (window.loadedFonts && window.loadedFonts[fontKey]) {
    const font = window.loadedFonts[fontKey];
    const textGeo = new THREE.TextGeometry(textStr, {
      font: font,
      size: sizeVal,
      height: heightVal,
      curveSegments: 12,
      bevelEnabled: false
    });

    textGeo.computeBoundingBox();
    textGeo.center(); // Pemusatan otomatis persis gaya BlocksCAD

    const mat = new THREE.MeshStandardMaterial({ 
      color: 0x5BA58C, 
      roughness: 0.4, 
      metalness: 0.1 
    });

    const mesh = new THREE.Mesh(textGeo, mat);
    sceneGroup.add(mesh);
  } else {
    console.warn("Font " + fontKey + " sedang dimuat atau belum siap.");
  }
})();
`;
};

// 2. Blok Teks 2D (Flat Surface Profile)
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
    this.setTooltip("Membuat permukaan profil huruf 2D datar");
  }
};

javascript.javascriptGenerator.forBlock['shape_text_2d'] = function(block, generator) {
  var textStr = block.getFieldValue('TEXT') || "GeoBlock";
  var size = generator.valueToCode(block, 'SIZE', generator.ORDER_ATOMIC) || '10';

  return `
(function() {
  const textStr = "${textStr}";
  const sizeVal = Number(${size});
  const fontKey = "helvetiker";

  if (window.loadedFonts && window.loadedFonts[fontKey]) {
    const font = window.loadedFonts[fontKey];
    const textGeo = new THREE.TextGeometry(textStr, {
      font: font,
      size: sizeVal,
      height: 0.01,
      curveSegments: 12
    });

    textGeo.computeBoundingBox();
    textGeo.center();

    const mat = new THREE.MeshBasicMaterial({ 
      color: 0x5BA58C, 
      side: THREE.DoubleSide 
    });

    const mesh = new THREE.Mesh(textGeo, mat);
    sceneGroup.add(mesh);
  }
})();
`;
};
