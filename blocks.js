/**
 * Blockly Demo: Turtle Graphics
 *
 * Copyright 2012 Google Inc.
 * http://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Demonstration of Blockly: Turtle Graphics.
 * @author fraser@google.com (Neil Fraser)
 * 
 * Originally language.js
 * 
 * Modified 2017 by mbrinkmeier@uni-osnabrueck.de (Michael Brinkmeier)
 * 
 * - Changed name to blocks.js
 * - Adapted to new Blockly version
 * - Added blocks for checking the current color of the turtle and the
 *   color it is on.

 */
'use strict';


Blockly.Blocks['main'] = {
  category : "",
  helpUrl: "",
  id: "__main__",
  init: function() {
    this.setColour(80);
    this.appendDummyInput()
        .appendField('Main program');
    this.appendStatementInput("MAIN");
    this.setPreviousStatement(false);
    this.setNextStatement(false);
    this.setTooltip('The main program.');
    this.setDeletable(false);
    this.setEditable(false);
  }}

Blockly.JavaScript['main'] = function(block) {
  var statements = Blockly.JavaScript.statementToCode(block,'MAIN');
  return statements;
}

/**
 * Move forward block
 * @type type
 */
Blockly.Blocks['draw_move_int'] = {
  category: 'Turtle',
  helpUrl: '',
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendField('move')
        .appendField(new Blockly.FieldDropdown(this.DIRECTIONS), 'DIR')
        .appendField('by')
        .appendField(new Blockly.FieldTextInput('10',
            Blockly.Blocks['math_number'].validator), 'VALUE');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Moves the turtle forward or backward\n' +
                    'by the specified amount.');
  },
  DIRECTIONS : [['forward', 'moveForward'], ['backward', 'moveBackward']]
}

Blockly.JavaScript['draw_move_int'] = function(block) {
  var value = window.parseFloat(block.getFieldValue('VALUE'));
  return 'Turtle.' + block.getFieldValue('DIR') +
      '(' + value + ', \'' + this.id + '\');\n';
}

/**
 * Block for moving forward or backwards.#
 * External input.
 * 
 * @returns {undefined}
 */
Blockly.Blocks['draw_move_ext'] = {
  category: 'Turtle',
  helpUrl: '',
  init: function() {
    this.setColour(160);
    this.appendValueInput('VALUE')
        .setCheck(Number)
        .appendField('move')
        .appendField(new Blockly.FieldDropdown(
            Blockly.Blocks['draw_move_int'].DIRECTIONS), 'DIR')
        .appendField('by');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Moves the turtle forward or backward\n' +
                    'by the specified amount.');
  }
};

Blockly.JavaScript['draw_move_ext'] = function(block) {
  // Generate JavaScript for moving forward or backwards.
  // External input.
  var value = Blockly.JavaScript.valueToCode(block,'VALUE',
      Blockly.JavaScript.ORDER_NONE) || '0';
  return 'Turtle.' + block.getFieldValue('DIR') +
      '(' + value + ', \'' + this.id + '\');\n';
};

/**
 * Block for turning left or right.
 * Internal input.
 * 
 * @returns {undefined}
 */
Blockly.Blocks['draw_turn_int'] = {
  category: 'Turtle',
  helpUrl: '',
  DIRECTIONS : [['right', 'turnRight'], ['left', 'turnLeft']],
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendField('turn')
        .appendField(new Blockly.FieldDropdown(this.DIRECTIONS), 'DIR')
        .appendField('by')
        .appendField(new Blockly.FieldTextInput('90',
            Blockly.Blocks['math_number'].validator), 'VALUE');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Turns the turtle left or right\n' +
                    'by the specified number of degrees.');
  }
};

Blockly.JavaScript['draw_turn_int'] = function(block) {
  // Generate JavaScript for turning left or right.
  // Internal input.
  var value = window.parseFloat(this.getFieldValue('VALUE'));
  return 'Turtle.' + this.getFieldValue('DIR') +
      '(' + value + ', \'' + this.id + '\');\n';
};

/**
 * Block for turning left or right.
 * External input.
 *
 * @type type
 */
Blockly.Blocks['draw_turn_ext'] = {
  category: 'Turtle',
  helpUrl: '',
  init: function() {
    this.setColour(160);
    this.appendValueInput('VALUE')
        .setCheck(Number)
        .appendField('turn')
        .appendField(new Blockly.FieldDropdown(
            Blockly.Blocks['draw_turn_int'].DIRECTIONS), 'DIR')
        .appendField('by');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Turns the turtle left or right\n' +
                    'by the specified number of degrees.');
  }
};

Blockly.JavaScript['draw_turn_ext'] = function(block) {
  // Generate JavaScript for turning left or right.
  // External input.
  var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
      Blockly.JavaScript.ORDER_NONE) || '0';
  return 'Turtle.' + block.getFieldValue('DIR') +
      '(' + value + ', \'' + this.id + '\');\n';
};


/**
 * Block for setting the width.
 * Internal input.
 * 
 * @returns {undefined} 
 */

Blockly.Blocks['draw_width_int'] = {
  category: 'Turtle',
  helpUrl: '',
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendField('set width')
        .appendField(new Blockly.FieldTextInput('1',
            Blockly.Blocks['math_number'].validator), 'WIDTH');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.JavaScript['draw_width_int'] = function(block) {
  // Generate JavaScript for setting the width.
  // Internal input.
  var width = window.parseFloat(block.getFieldValue('WIDTH'));
  return 'Turtle.penWidth(' + width + ', \'' + this.id + '\');\n';
};

/**
 * Block for setting the width.
 * External input.
 * 
 * @type type
 */
Blockly.Blocks['draw_width_ext'] = {
  category: 'Turtle',
  helpUrl: '',
  init: function() {
    this.setColour(160);
    this.appendValueInput('WIDTH')
        .setCheck(Number)
        .appendField('set width')
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.JavaScript['draw_width_ext'] = function(block) {
  // Generate JavaScript for setting the width.
  // External input.
  var width = Blockly.JavaScript.valueToCode(block, 'WIDTH',
      Blockly.JavaScript.ORDER_NONE) || '1';
  return 'Turtle.penWidth(' + width + ', \'' + this.id + '\');\n';
};

/**
 * Block for pen up/down.
 * Internal input.
 * 
 * @type type
 */
Blockly.Blocks['draw_pen_int'] = {
  category: 'Turtle',
  helpUrl: '',
  STATE: [['up', 'penUp'], ['down', 'penDown']],
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendField('pen')
        .appendField(new Blockly.FieldDropdown(this.STATE), 'PEN');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.JavaScript['draw_pen_int'] = function(block) {
  return 'Turtle.' + block.getFieldValue('PEN') + '(\'' + this.id + '\');\n';
};

/**
 * Block for setting the colour.
 * Internal input.
 * 
 * @type type
 */
Blockly.Blocks['draw_colour_int'] = {
  category: 'Turtle',
  helpUrl: '',
  init: function() {
    this.setColour(20);
    this.appendDummyInput()
        .appendField('set color')
        .appendField(new Blockly.FieldColour('#ffcc33'), 'COLOUR');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.JavaScript['draw_colour_int'] = function(block) {
  // Generate JavaScript for setting the colour.
  // Internal input.
  return 'Turtle.penColour(\'' + block.getFieldValue('COLOUR') + '\', \'' +
      this.id + '\');\n';
};

/**
 * Block for setting the colour.
 * External input.
 * 
 * @type type
 */
Blockly.Blocks['draw_colour_ext'] = {
  category: 'Turtle',
  helpUrl: '',
  init: function() {
    this.setColour(20);
    this.appendValueInput('COLOUR')
        .setCheck('Colour')
        .appendField('set color');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.JavaScript['draw_colour_ext'] = function(block) {
  // Generate JavaScript for setting the colour.
  // External input.
  var colour = Blockly.JavaScript.valueToCode(block, 'COLOUR',
      Blockly.JavaScript.ORDER_NONE) || '\'#000000\'';
  return 'Turtle.penColour(' + colour + ', \'' +
      this.id + '\');\n';
};


Blockly.Blocks['get_color'] = {
  category: 'Turtle',
  helpUrl: '',
  init: function() {
    this.setColour(20);
    this.appendDummyInput()
        .appendField("turtle's color is")
        .appendField(new Blockly.FieldColour('#ffcc33'), 'COLOUR');
    this.setPreviousStatement(false);
    this.setNextStatement(false);
    this.setOutput(true,"Boolean");
    this.setTooltip('');
  }
};

Blockly.JavaScript['get_color'] = function(block) {
  // Generate JavaScript for setting the colour.
  // External input.
  var colour = block.getFieldValue('COLOUR');
  return ["Turtle.hasPenColor(\'" + colour + "\',\'" + this.id+ "\')",0];
};


Blockly.Blocks['on_color'] = {
  category: 'Turtle',
  helpUrl: '',
  init: function() {
    this.setColour(20);
    this.appendDummyInput()
        .appendField("turtle is on color")
        .appendField(new Blockly.FieldColour('#ffcc33'), 'COLOUR');
    this.setPreviousStatement(false);
    this.setNextStatement(false);
    this.setOutput(true,"Boolean");
    this.setTooltip('');
  }
};

Blockly.JavaScript['on_color'] = function(block) {
  // Generate JavaScript for setting the colour.
  // External input.
  var colour = block.getFieldValue('COLOUR');
  return ["Turtle.isOnColor(\'" + colour + "\',\'" + this.id+ "\')",0];
};


function init() {
  var workspace = Blockly.inject('blocklyDiv', {toolbox: document.getElementById('toolbox')});
  console.log(document.getElementById('toolbox'));
  // Blockly.inject(document.getElementById("blocklyDiv"), {path: 'lib/'});

  if (window.parent.Turtle) {
    // Let the top-level application know that Blockly is ready.
    window.parent.Turtle.init(Blockly);
  } else {
    // Attempt to diagnose the problem.
    var msg = 'Error: Unable to communicate between frames.\n\n';
    if (window.parent == window) {
      msg += 'Try loading index.html instead of frame.html';
    } else if (window.location.protocol == 'file:') {
      msg += 'This may be due to a security restriction preventing\n' +
          'access when using the file:// protocol.\n' +
          'http://code.google.com/p/chromium/issues/detail?id=47416';
    }
    alert(msg);
  }
  
  Tool.init();
}
