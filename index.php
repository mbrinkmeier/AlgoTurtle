<!DOCTYPE html>
<html>
<head>
   <script src="/js/webcomponents/CustomElements.js"></script>
   <?php 
      global $PAGE_MENU;

      $PHP_BASE = "/var/www/html/php/";
      set_include_path("/var/www/html/php/");
      
      include("page.php"); 
      
      $PAGE_TITLE = "AlgoTurtle";
      
      $OPS = ($_GET['operations'] == "true");
      $LISTS = ($_GET['lists'] == "true");
      $VARS = $OPS | $LISTS | ($_GET['variables'] == "true");      
   ?>
  <meta charset="utf-8">
  <script type="text/javascript" src="../blockly/blockly_compressed.js"></script>
  <script type="text/javascript" src="../blockly/blocks_compressed.js"></script>
  <script type="text/javascript" src="../blockly/javascript_compressed.js"></script>
  <script src="../blockly/msg/js/en.js"></script>
  <script type="text/javascript" src="loadsave.js"></script>
  <script type="text/javascript" src="slider.js"></script>
  <script type="text/javascript" src="turtle.js"></script>
  <script type="text/javascript" src="blocks.js"></script>
  <style>
    /* Buttons */
    button {
      margin: 5px;
      margin-right: 12px;
      margin-left: 0;
      padding: 10px;
      font-size: large;
      border-radius: 5px;
      border: 1px solid #ddd;
      background-color: #eee;
      color: black;
    }
    button.launch {
      border: 1px solid #d43;
      background-color: #d43;
      color: white;
    }
    button:active {
      border: 1px solid blue !important;
    }
    button:hover {
      box-shadow: 2px 2px 5px #888;
    }
    button>img {
      opacity: 0.6;
    }
    button:hover>img {
      opacity: 1;
    }
    button.disabled:hover>img {
      opacity: 0.6;
    }
    button.disabled {
      cursor: not-allowed;
      border: 1px solid #ddd !important;
      box-shadow: none;
    }
    #blocklyWrapper {
    	height: 100%;
    }
    #toolbarDiv {
      text-align: center;
      padding-top: 1em;
    }
    #blocklyDiv {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
    }
    #display {
      border: 1px solid #ccc;
    }
    .sliderTrack {
      stroke: #aaa;
      stroke-width: 6px;
      stroke-linecap: round;
    }
    .sliderKnob {
      fill: #ddd;
      stroke: #bbc;
      stroke-width: 1px;
      stroke-linejoin: round;
    }
    .sliderKnob:hover {
      fill: #eee;
    }
  </style>
   <link rel="shortcut icon" type="image/x-icon" href="/img/DDI_clear_Logo.png">
   <link rel="stylesheet" href="/css/page.css">   
   <link rel="stylesheet" href="/css/x-menu.css">   
   <title><?php echo $PAGE_TITLE; ?></title>
</head>
<body onload="init();">
   <xml id='toolbox' style="display: none">
      <category name="Turtle">
        <block type="draw_move_int"></block>
        <block type="draw_move_ext"></block>
        <block type="draw_turn_int"></block>
        <block type="draw_turn_ext"></block>
        <block type="draw_width_int"></block>
        <block type="draw_width_ext"></block>
        <block type="draw_pen_int"></block>
        <block type="draw_colour_int"></block>
        <block type="draw_colour_ext"></block>
        <block type="get_color"></block>
        <block type="on_color"></block>
      </category>
      <category name="Control">
        <block type="controls_if"></block>
        <block type="controls_ifelse"></block>
        <block type="controls_repeat_ext"></block>
        <block type="controls_repeat"></block>
        <block type="controls_whileUntil"></block>
	    <?php if ($LISTS) { ?>
           <block type="controls_forEach"></block>
        <?php } ?>
        <block type="controls_flow_statements"></block>
      </category>
      <category name="Logic">
        <block type="logic_boolean"></block>
        <block type="logic_compare"></block>
        <block type="logic_operation"></block>
        <block type="logic_negate"></block>        
      </category>
      <category name="Math">
        <block type="math_number"></block>                
        <block type="math_arithmetic"></block>                
        <block type="math_single"></block>                
        <block type="math_trig"></block>                
        <block type="math_constant"></block>                
        <block type="math_number_property"></block>                
        <block type="math_round"></block>                
        <block type="math_modulo"></block>                
        <block type="math_constrain"></block>                
        <block type="math_random_int"></block>                
      </category>
      <?php if ($VARS) { ?>
      	<category name="Variables">
      		<block type="variables_get"></block>
      		<block type="variables_set"></block>
      	</category>
      <?php } ?>
      <?php if ($LISTS) { ?>
      	<category name="Lists">
      		<block type="lists_create_empty"></block>
      		<block type="lists_create_with"></block>
      		<block type="lists_indexOf"></block>
      		<block type="lists_getIndex"></block>
      		<block type="lists_setIndex"></block>
      		<block type="lists_getSublist"></block>
      		<block type="lists_sort"></block>
      		<block type="lists_split"></block>
      		<block type="lists_repeat"></block>
      		<block type="lists_reverse"></block>
      		<block type="lists_isEmpty"></block>
      		<block type="lists_length"></block>
      	</category>
      <?php } ?>
      <?php if ($OPS) { ?>
         <category name="Operations">
         	<block type="procedures_defreturn"></block>
         	<block type="procedures_defnoreturn"></block>
         </category>
     <?php } ?> 
</xml> 
   <?php include("header.php"); ?>
   <div class="wrapper-wide">
      <div class="main">
      	<h1><?php echo $PAGE_TITLE;?></h1>
      	<form>
      		<input onclick="Tool.checkboxClicked();" type="checkbox" id="variables" <?php if ($VARS) { echo "checked"; }?>>Variablen
      		<input onclick="Tool.checkboxClicked();" type="checkbox" id="lists" <?php if ($LISTS) { echo "checked"; }?>>Listen
      		<input onclick="Tool.checkboxClicked();" type="checkbox" id="operations" <?php if ($OPS) { echo "checked"; }?>>Operationen
      	</form>
	     <table width="100%" height="100%">
    	   <tr>
      	      <td width="410" valign="top">
        	    <div>
          	       <canvas id="scratch" width="400" height="400" style="display: none"></canvas>
          	       <canvas id="display" width="400" height="400"></canvas>
        	    </div>
        	    <table style="padding-top: 1em;">
          	       <tr>
            	      <td style="width: 190px; text-align: center">
                         <svg id="slider" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="150" height="50">
                            <image xlink:href="slow.png" height="12" width="26" x="5" y="14" />
                            <image xlink:href="fast.png" height="16" width="26" x="120" y="10" />
                         </svg>
                      </td>
                      <td style="width: 15px;">
                         <img id="spinner" style="visibility: hidden;" src="loading.gif" height=15 width=15>
                      </td>
                      <td style="width: 190px; text-align: center">
                         <button id="runButton" class="launch" onclick="Turtle.runButtonClick();">Run Program</button>
                         <button id="resetButton" class="launch" onclick="Turtle.resetButtonClick();" style="display: none">&nbsp; Reset &nbsp;</button>
                      </td>
                   </tr>
                </table>
                <div id="toolbarDiv">
                   <form>
                      <span> Save as <input id="saveName" type="text" value="turtle.trt"/></span>
                      <input  style="display:none" id="fileChooser" type="file" accept=".trt">
                   </form>
                   <p>
                   <button title="See generated JavaScript code" onclick="Turtle.showCode()">
                      <img src='code.png' height=21 width=21>
                   </button>
                   <button  id="saveButton" title="Save blocks" onclick="Tool.saveWorkspace()">
                      <img src='save.png' height=21 width=21>
                   </button>
                   <button  id="loadButton" title="Load blocks" onclick="Tool.loadWorkspace()">
                      <img src='load.png' height=21 width=21>
                   </button>
                   </p>
                </div>
            </td>
            <td id="blocklyWrapper" valign="top">
              <div id="blocklyDiv"></div>
            </td>
        </tr>
     </table>
     <p>
     	<b>AlgoTurtle</b> is based on the <a href="https://blockly-games.appspot.com/turtle">Google Blockly Demo Turtle</a>. 
     </p>
   </div>
 </div>
 <?php include("footer.php"); ?>
</body>
</html>
