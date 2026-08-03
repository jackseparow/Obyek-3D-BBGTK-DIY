<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GeoBlock BBGTK DIY - 3D Visual Block Coding</title>
  
  <!-- Blockly CDN Core & Generators -->
  <script src="https://unpkg.com/blockly/blockly_compressed.js"></script>
  <script src="https://unpkg.com/blockly/blocks_compressed.js"></script>
  <script src="https://unpkg.com/blockly/javascript_compressed.js"></script>
  <script src="https://unpkg.com/blockly/msg/id.js"></script>

  <!-- Three.js CDN (3D Engine Viewport) -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>

  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body, html { width: 100%; height: 100%; overflow: hidden; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
    #app-header { height: 50px; background-color: #1e1e2f; color: #ffffff; display: flex; align-items: center; justify-content: space-between; padding: 0 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.2); z-index: 10; }
    .header-left { display: flex; align-items: center; gap: 12px; }
    .header-logo { height: 32px; width: auto; object-fit: contain; }
    #app-header h1 { font-size: 1.2rem; font-weight: 600; letter-spacing: 0.5px; }
    #btn-render { background-color: #28a745; color: white; border: none; padding: 8px 18px; font-size: 0.95rem; font-weight: bold; border-radius: 4px; cursor: pointer; transition: background-color 0.2s; }
    #btn-render:hover { background-color: #218838; }
    #main-container { display: flex; width: 100vw; height: calc(100vh - 50px); }
    #blockly-div { width: 55%; height: 100%; }
    #viewport-container { width: 45%; height: 100%; position: relative; background-color: #141419; }
    #canvas3d { width: 100%; height: 100%; display: block; }
    #code-preview { position: absolute; bottom: 10px; left: 10px; right: 10px; height: 120px; background: rgba(0, 0, 0, 0.75); color: #00ff66; font-family: 'Courier New', Courier, monospace; font-size: 12px; padding: 10px; border-radius: 6px; overflow-y: auto; pointer-events: none; border: 1px solid rgba(255,255,255,0.1); }
  </style>
</head>
<body>

  <header id="app-header">
    <div class="header-left">
      <img src="bbgtk diy logo.png" alt="Logo BBGTK DIY" class="header-logo">
      <h1>GeoBlock BBGTK DIY</h1>
    </div>
    <button id="btn-render" onclick="renderScene()">Render 3D Kode</button>
  </header>

  <main id="main-container">
    <div id="blockly-div"></div>
    <div id="viewport-container">
      <canvas id="canvas3d"></canvas>
      <pre id="code-preview">// Kode JavaScript tergenerasi akan muncul di sini...</pre>
    </div>
  </main>

  <!-- Modul Shapes JS (3D & 2D) -->
  <script src="block_cube.js"></script>
  <script src="block_sphere.js"></script>
  <script src="block_cylinder.js"></script>
  <script src="block_torus.js"></script>
  <script src="block_circle.js"></script>
  <script src="block_square.js"></script>

  <!-- DEFINISI BLOK WARNA (PALET WARNA & TRANSPARANSI) SERTA TRANSFORMASI -->
  <script>
    // FIX UNTUK COLOUR_PICKER IN-LINE (Pilihan Palet Warna)
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

    // 1. Ubah Warna (Palet Warna & Transparansi)
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
      }
    };
    javascript.javascriptGenerator.forBlock['transform_color_palette'] = function(block, generator) {
      var color = generator.valueToCode(block, 'COLOR', generator.ORDER_ATOMIC) || "'#ff0000'";
      var opacity = generator.valueToCode(block, 'OPACITY', generator.ORDER_ATOMIC) || '0';
      var statement = generator.statementToCode(block, 'OBJECTS');
      return `\n(function() {\n  const subGroup = new THREE.Group();\n  const parentGroup = sceneGroup;\n  sceneGroup = subGroup;\n  ${statement}\n  sceneGroup = parentGroup;\n  const alpha = 1 - (Math.min(Math.max(Number(${opacity}), 0), 100) / 100);\n  subGroup.traverse(child => {\n    if (child.isMesh) {\n      child.material = child.material.clone();\n      child.material.color.setStyle(${color});\n      if (alpha < 1) { child.material.transparent = true; child.material.opacity = alpha; }\n    }\n  });\n  sceneGroup.add(subGroup);\n})();\n`;
    };

    // 2. Translasi
    Blockly.Blocks['transform_translate'] = {
      init: function() {
        this.appendDummyInput().appendField("translasikan");
        this.appendValueInput("X").setCheck("Number").appendField("X");
        this.appendValueInput("Y").setCheck("Number").appendField("Y");
        this.appendValueInput("Z").setCheck("Number").appendField("Z");
        this.appendStatementInput("OBJECTS").appendField("objek");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#FF9800");
      }
    };
    javascript.javascriptGenerator.forBlock['transform_translate'] = function(block, generator) {
      var x = generator.valueToCode(block, 'X', generator.ORDER_ATOMIC) || '0';
      var y = generator.valueToCode(block, 'Y', generator.ORDER_ATOMIC) || '0';
      var z = generator.valueToCode(block, 'Z', generator.ORDER_ATOMIC) || '0';
      var statement = generator.statementToCode(block, 'OBJECTS');
      return `\n(function() {\n  const subGroup = new THREE.Group();\n  const parentGroup = sceneGroup;\n  sceneGroup = subGroup;\n  ${statement}\n  sceneGroup = parentGroup;\n  subGroup.position.set(Number(${x}), Number(${y}), Number(${z}));\n  sceneGroup.add(subGroup);\n})();\n`;
    };

    // 3. Rotasi Sumbu Utama
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
      }
    };
    javascript.javascriptGenerator.forBlock['transform_rotate'] = function(block, generator) {
      var rx = generator.valueToCode(block, 'X', generator.ORDER_ATOMIC) || '0';
      var ry = generator.valueToCode(block, 'Y', generator.ORDER_ATOMIC) || '0';
      var rz = generator.valueToCode(block, 'Z', generator.ORDER_ATOMIC) || '0';
      var statement = generator.statementToCode(block, 'OBJECTS');
      return `\n(function() {\n  const subGroup = new THREE.Group();\n  const parentGroup = sceneGroup;\n  sceneGroup = subGroup;\n  ${statement}\n  sceneGroup = parentGroup;\n  subGroup.rotation.set((Number(${rx})*Math.PI)/180, (Number(${ry})*Math.PI)/180, (Number(${rz})*Math.PI)/180);\n  sceneGroup.add(subGroup);\n})();\n`;
    };

    // 4. Rotasi Mengitari Titik
    Blockly.Blocks['transform_rotate_around_point'] = {
      init: function() {
        this.appendDummyInput().appendField("rotasikan sebesar");
        this.appendValueInput("ANGLE").setCheck("Number").appendField("(°)");
        this.appendDummyInput().appendField("pada sumbu").appendField(new Blockly.FieldDropdown([["X", "X"], ["Y", "Y"], ["Z", "Z"]]), "AXIS").appendField("mengitari titik");
        this.appendValueInput("POS_X").setCheck("Number").appendField("x");
        this.appendValueInput("POS_Y").setCheck("Number").appendField("y");
        this.appendValueInput("POS_Z").setCheck("Number").appendField("z");
        this.appendStatementInput("OBJECTS").appendField("objek");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#FF9800");
      }
    };
    javascript.javascriptGenerator.forBlock['transform_rotate_around_point'] = function(block, generator) {
      var angle = generator.valueToCode(block, 'ANGLE', generator.ORDER_ATOMIC) || '45';
      var axis = block.getFieldValue('AXIS');
      var px = generator.valueToCode(block, 'POS_X', generator.ORDER_ATOMIC) || '0';
      var py = generator.valueToCode(block, 'POS_Y', generator.ORDER_ATOMIC) || '0';
      var pz = generator.valueToCode(block, 'POS_Z', generator.ORDER_ATOMIC) || '0';
      var statement = generator.statementToCode(block, 'OBJECTS');
      return `\n(function() {\n  const subGroup = new THREE.Group();\n  const parentGroup = sceneGroup;\n  sceneGroup = subGroup;\n  ${statement}\n  sceneGroup = parentGroup;\n  const point = new THREE.Vector3(Number(${px}), Number(${py}), Number(${pz}));\n  const rad = (Number(${angle}) * Math.PI) / 180;\n  subGroup.position.sub(point);\n  if ("${axis}" === "X") subGroup.position.applyAxisAngle(new THREE.Vector3(1,0,0), rad);\n  if ("${axis}" === "Y") subGroup.position.applyAxisAngle(new THREE.Vector3(0,1,0), rad);\n  if ("${axis}" === "Z") subGroup.position.applyAxisAngle(new THREE.Vector3(0,0,1), rad);\n  subGroup.position.add(point);\n  if ("${axis}" === "X") subGroup.rotation.x += rad;\n  if ("${axis}" === "Y") subGroup.rotation.y += rad;\n  if ("${axis}" === "Z") subGroup.rotation.z += rad;\n  sceneGroup.add(subGroup);\n})();\n`;
    };

    // 5. Dilatasi (Skala)
    Blockly.Blocks['transform_scale'] = {
      init: function() {
        this.appendDummyInput().appendField("dilatasikan (skala)");
        this.appendValueInput("X").setCheck("Number").appendField("X");
        this.appendValueInput("Y").setCheck("Number").appendField("Y");
        this.appendValueInput("Z").setCheck("Number").appendField("Z");
        this.appendStatementInput("OBJECTS").appendField("objek");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#FF9800");
      }
    };
    javascript.javascriptGenerator.forBlock['transform_scale'] = function(block, generator) {
      var sx = generator.valueToCode(block, 'X', generator.ORDER_ATOMIC) || '1';
      var sy = generator.valueToCode(block, 'Y', generator.ORDER_ATOMIC) || '1';
      var sz = generator.valueToCode(block, 'Z', generator.ORDER_ATOMIC) || '1';
      var statement = generator.statementToCode(block, 'OBJECTS');
      return `\n(function() {\n  const subGroup = new THREE.Group();\n  const parentGroup = sceneGroup;\n  sceneGroup = subGroup;\n  ${statement}\n  sceneGroup = parentGroup;\n  subGroup.scale.set(Number(${sx}), Number(${sy}), Number(${sz}));\n  sceneGroup.add(subGroup);\n})();\n`;
    };

    // 6. Pencerminan Bidang
    Blockly.Blocks['transform_mirror_plane'] = {
      init: function() {
        this.appendDummyInput().appendField("cerminkan terhadap bidang").appendField(new Blockly.FieldDropdown([["XY (Sumbu Z dibalik)", "XY"], ["XZ (Sumbu Y dibalik)", "XZ"], ["YZ (Sumbu X dibalik)", "YZ"]]), "PLANE");
        this.appendStatementInput("OBJECTS").appendField("objek");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#FF9800");
      }
    };
    javascript.javascriptGenerator.forBlock['transform_mirror_plane'] = function(block, generator) {
      var plane = block.getFieldValue('PLANE');
      var statement = generator.statementToCode(block, 'OBJECTS');
      return `\n(function() {\n  const subGroup = new THREE.Group();\n  const parentGroup = sceneGroup;\n  sceneGroup = subGroup;\n  ${statement}\n  sceneGroup = parentGroup;\n  if ("${plane}" === "XY") subGroup.scale.z *= -1;\n  if ("${plane}" === "XZ") subGroup.scale.y *= -1;\n  if ("${plane}" === "YZ") subGroup.scale.x *= -1;\n  sceneGroup.add(subGroup);\n})();\n`;
    };

    // 7. Pencerminan Terhadap Garis
    Blockly.Blocks['transform_mirror_line'] = {
      init: function() {
        this.appendDummyInput().appendField("cerminkan terhadap garis dari titik");
        this.appendValueInput("X1").setCheck("Number").appendField("x1");
        this.appendValueInput("Y1").setCheck("Number").appendField("y1");
        this.appendValueInput("Z1").setCheck("Number").appendField("z1");
        this.appendDummyInput().appendField("ke titik");
        this.appendValueInput("X2").setCheck("Number").appendField("x2");
        this.appendValueInput("Y2").setCheck("Number").appendField("y2");
        this.appendValueInput("Z2").setCheck("Number").appendField("z2");
        this.appendStatementInput("OBJECTS").appendField("objek");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#FF9800");
      }
    };
    javascript.javascriptGenerator.forBlock['transform_mirror_line'] = function(block, generator) {
      var x1 = generator.valueToCode(block, 'X1', generator.ORDER_ATOMIC) || '0';
      var y1 = generator.valueToCode(block, 'Y1', generator.ORDER_ATOMIC) || '0';
      var z1 = generator.valueToCode(block, 'Z1', generator.ORDER_ATOMIC) || '0';
      var x2 = generator.valueToCode(block, 'X2', generator.ORDER_ATOMIC) || '10';
      var y2 = generator.valueToCode(block, 'Y2', generator.ORDER_ATOMIC) || '0';
      var z2 = generator.valueToCode(block, 'Z2', generator.ORDER_ATOMIC) || '0';
      var statement = generator.statementToCode(block, 'OBJECTS');

      return `\n(function() {\n  const subGroup = new THREE.Group();\n  const parentGroup = sceneGroup;\n  sceneGroup = subGroup;\n  ${statement}\n  sceneGroup = parentGroup;\n  const p1 = new THREE.Vector3(Number(${x1}), Number(${y1}), Number(${z1}));\n  const p2 = new THREE.Vector3(Number(${x2}), Number(${y2}), Number(${z2}));\n  const axis = new THREE.Vector3().subVectors(p2, p1).normalize();\n  if (axis.lengthSq() > 0) {\n    subGroup.position.sub(p1);\n    subGroup.position.applyAxisAngle(axis, Math.PI);\n    subGroup.rotateOnAxis(axis, Math.PI);\n    subGroup.position.add(p1);\n  }\n  sceneGroup.add(subGroup);\n})();\n`;
    };
  </script>

  <!-- App Main Logic -->
  <script>
    const jsGen = javascript.javascriptGenerator || javascriptGenerator;

    const toolboxXml = `
      <xml id="toolbox" style="display: none">
        <!-- 1. Bentuk 3D -->
        <category name="Bentuk 3D" colour="#4C97FF">
          <block type="shape_cube">
            <value name="SIZE_X"><shadow type="math_number"><field name="NUM">10</field></shadow></value>
            <value name="SIZE_Y"><shadow type="math_number"><field name="NUM">10</field></shadow></value>
            <value name="SIZE_Z"><shadow type="math_number"><field name="NUM">10</field></shadow></value>
            <value name="POS_X"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
            <value name="POS_Y"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
            <value name="POS_Z"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
          </block>
          <block type="shape_sphere">
            <value name="RADIUS"><shadow type="math_number"><field name="NUM">5</field></shadow></value>
            <value name="POS_X"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
            <value name="POS_Y"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
            <value name="POS_Z"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
          </block>
          <block type="shape_cylinder">
            <value name="RADIUS_TOP"><shadow type="math_number"><field name="NUM">5</field></shadow></value>
            <value name="RADIUS_BOTTOM"><shadow type="math_number"><field name="NUM">5</field></shadow></value>
            <value name="HEIGHT"><shadow type="math_number"><field name="NUM">10</field></shadow></value>
            <value name="POS_X"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
            <value name="POS_Y"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
            <value name="POS_Z"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
          </block>
          <block type="shape_torus">
            <value name="RADIUS"><shadow type="math_number"><field name="NUM">8</field></shadow></value>
            <value name="TUBE"><shadow type="math_number"><field name="NUM">3</field></shadow></value>
            <value name="POS_X"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
            <value name="POS_Y"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
            <value name="POS_Z"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
          </block>
        </category>

        <!-- 2. Bentuk 2D -->
        <category name="Bentuk 2D" colour="#9C27B0">
          <block type="shape_circle">
            <value name="RADIUS"><shadow type="math_number"><field name="NUM">5</field></shadow></value>
            <value name="POS_X"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
            <value name="POS_Y"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
            <value name="POS_Z"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
          </block>
          <block type="shape_square">
            <value name="SIZE_X"><shadow type="math_number"><field name="NUM">10</field></shadow></value>
            <value name="SIZE_Y"><shadow type="math_number"><field name="NUM">10</field></shadow></value>
            <value name="POS_X"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
            <value name="POS_Y"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
            <value name="POS_Z"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
          </block>
        </category>

        <!-- 3. Transformasi -->
        <category name="Transformasi" colour="#FF9800">
          <!-- Blok Warna Tunggal (Palet Warna & Transparansi) -->
          <block type="transform_color_palette">
            <value name="COLOR"><shadow type="colour_picker"><field name="COLOUR">#ff0000</field></shadow></value>
            <value name="OPACITY"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
          </block>

          <block type="transform_translate">
            <value name="X"><shadow type="math_number"><field name="NUM">10</field></shadow></value>
            <value name="Y"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
            <value name="Z"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
          </block>

          <block type="transform_rotate">
            <value name="X"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
            <value name="Y"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
            <value name="Z"><shadow type="math_number"><field name="NUM">45</field></shadow></value>
          </block>

          <block type="transform_rotate_around_point">
            <value name="ANGLE"><shadow type="math_number"><field name="NUM">45</field></shadow></value>
            <value name="POS_X"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
            <value name="POS_Y"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
            <value name="POS_Z"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
          </block>

          <block type="transform_scale">
            <value name="X"><shadow type="math_number"><field name="NUM">2</field></shadow></value>
            <value name="Y"><shadow type="math_number"><field name="NUM">2</field></shadow></value>
            <value name="Z"><shadow type="math_number"><field name="NUM">2</field></shadow></value>
          </block>

          <block type="transform_mirror_plane"></block>

          <block type="transform_mirror_line">
            <value name="X1"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
            <value name="Y1"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
            <value name="Z1"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
            <value name="X2"><shadow type="math_number"><field name="NUM">10</field></shadow></value>
            <value name="Y2"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
            <value name="Z2"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
          </block>
        </category>

        <!-- Kategori Pendukung Lainnya -->
        <category name="Operasi Himpunan" colour="#E91E63"></category>
        <category name="Operasi Aritmetika" colour="#5B80A5">
          <block type="math_number"><field name="NUM">10</field></block>
          <block type="math_arithmetic"></block>
          <block type="math_single"></block>
        </category>
        <category name="Logika" colour="#5C81A6">
          <block type="controls_if"></block>
          <block type="logic_compare"></block>
          <block type="logic_operation"></block>
          <block type="logic_boolean"></block>
        </category>
        <category name="Iterasi" colour="#5CA65C">
          <block type="controls_repeat_ext">
            <value name="TIMES"><block type="math_number"><field name="NUM">10</field></block></value>
          </block>
          <block type="controls_for">
            <value name="FROM"><block type="math_number"><field name="NUM">1</field></block></value>
            <value name="TO"><block type="math_number"><field name="NUM">10</field></block></value>
            <value name="BY"><block type="math_number"><field name="NUM">1</field></block></value>
          </block>
        </category>
        <category name="Variabel" colour="#A55B80" custom="VARIABLE"></category>
        <category name="Teks" colour="#5BA58C">
          <block type="text"></block>
          <block type="text_join"></block>
        </category>
      </xml>
    `;

    const workspace = Blockly.inject('blockly-div', {
      toolbox: toolboxXml,
      scrollbars: true,
      zoom: { controls: true, wheel: true, startScale: 1.0, maxScale: 3, minScale: 0.3, scaleSpeed: 1.2 },
      grid: { spacing: 20, length: 3, colour: '#ccc', snap: true }
    });

    const canvas = document.getElementById('canvas3d');
    const container = document.getElementById('viewport-container');
    
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1e1e24);

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.up.set(0, 0, 1);
    camera.position.set(40, -50, 30);

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.enableDamping = true;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(30, -30, 50);
    scene.add(dirLight);

    const gridHelper = new THREE.GridHelper(100, 50, 0x00ffcc, 0x444455);
    gridHelper.rotation.x = Math.PI / 2;
    scene.add(gridHelper);

    const axesHelper = new THREE.AxesHelper(30);
    scene.add(axesHelper);

    const renderGroup = new THREE.Group();
    scene.add(renderGroup);

    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });

    function renderScene() {
      while(renderGroup.children.length > 0){ 
        const obj = renderGroup.children[0];
        if (obj.geometry) obj.geometry.dispose();
        renderGroup.remove(obj); 
      }

      const code = jsGen.workspaceToCode(workspace);
      document.getElementById('code-preview').innerText = code || "// Workspace kosong";

      try {
        const runCode = new Function('sceneGroup', 'THREE', code);
        runCode(renderGroup, THREE);
      } catch (e) {
        console.error("Error eksekusi rendering 3D:", e);
      }
    }
  </script>
</body>
</html>
