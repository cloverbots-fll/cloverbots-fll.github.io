import * as Blockly from 'blockly/core';
import { FieldGridDropdown } from '@blockly/field-grid-dropdown';
import { FieldAngle } from '@blockly/field-angle';
import { FieldMultilineInput, registerFieldMultilineInput } from '@blockly/field-multilineinput';

// Add multiline input
registerFieldMultilineInput();

// Block colors
const motor_color = "#0772c0"
const movement_color = "#9f006f"
const events_color = "#c4a005"
const control_color = "#946100"
const sensors_color = "#1188a8"
const operators_color = "#01933f"
const logic_color = "#b85e00"
const math_color = "#920302"
const comment_color = "#aba85e"

// Motor selector dropdown, makes selecting motors easier
const portSelectorDropdown = () => {
  let selector = new FieldGridDropdown([["A", "A"], ["B", "B"], ["C", "C"], ["D", "D"], ["E", "E"], ["F", "F"]]);
  selector.setColumns(2);
  return selector
}

// Drivebase angle selector 
const angleDropdown = () => {
  let selector = new FieldAngle(0, undefined, {min: -100, max: 100, offset: 90, majorTick: 10, minorTick: 5});
  return selector
}

// region Motors

// Block to initialize a motor at a specified port
Blockly.Blocks['motor_initialize'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Set up motor")
        .appendField(portSelectorDropdown(), "MOTOR");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(motor_color);
    this.setTooltip("Intializes the specified motor to be used in the program.");
    this.setHelpUrl("");
  }
};

// Block to the run a motor at a specified speed forever, or for a specified amount of roations or degrees
Blockly.Blocks['motor_run'] = {
  init: function() {
    this.amountField = new Blockly.FieldNumber(1, 0);
    this.unitDropdown = new Blockly.FieldDropdown(
      [["Infinite", "INFINITE"], ["Rotations", "ROTATIONS"], ["Degrees", "DEGREES"], ["Seconds", "SECONDS"]],
      this.validateUnit.bind(this)
    );

    this.appendDummyInput()
        .appendField("Run motor")
        .appendField(portSelectorDropdown(), "MOTOR")
        .appendField("at")
        .appendField(new Blockly.FieldNumber(50, 0, 100), "SPEED")
        .appendField("% speed")
        .appendField(new Blockly.FieldDropdown([["Clockwise", "CLOCKWISE"], ["Counterclockwise", "COUNTERCLOCKWISE"]]), "DIRECTION")
        .appendField("for")
        .appendField(this.amountField, "AMOUNT") // Add the amount field
        .appendField(this.unitDropdown, "UNIT"); // Add the unit dropdown

    this.amountField.setVisible(false); // Hide the amount field initially
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(motor_color);
    this.setTooltip("Runs the motor for a specified amount of time or rotations.");
    this.setHelpUrl("");
  },
  
  // Function to validate the selected unit and show/hide the input field
  validateUnit: function(newValue : string) {
    if (newValue === 'INFINITE') {
      this.amountField.setVisible(false);
    } else {
      this.amountField.setVisible(true);
      this.amountField.setValue(1); // Set a default value of 1 when visible
    }
    this.render(); // Re-render the block to apply visibility changes
  }
};

// Block to stop the motor at a specified port
Blockly.Blocks['motor_stop'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Stop motor")
        .appendField(portSelectorDropdown(), "MOTOR");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(motor_color);
    this.setTooltip("Stops the motor.");
    this.setHelpUrl("");
  }
};

// Block to stop the motor at a specified port
Blockly.Blocks['motor_speed_var'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Motor")
        .appendField(portSelectorDropdown(), "MOTOR")
        .appendField("speed");
    this.setColour(motor_color);
    this.setOutput(true, null);
    this.setTooltip("Variabe that holds the speed of the specified motor.");
    this.setHelpUrl("");
  }
};

// Block to stop the motor at a specified port
Blockly.Blocks['motor_position_var'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Motor")
        .appendField(portSelectorDropdown(), "MOTOR")
        .appendField("position");
    this.setColour(motor_color);
    this.setOutput(true, null);
    this.setTooltip("Variabe that holds the position of the specified motor.");
    this.setHelpUrl("");
  }
};

// region Movement

// Block to initialize a drivebase
Blockly.Blocks["movement_initialize"] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Set up drivebase at")
        .appendField(portSelectorDropdown(), "LEFT_MOTOR")
        .appendField("and")
        .appendField(portSelectorDropdown(), "RIGHT_MOTOR");
    this.appendDummyInput()
        .appendField("Speed:")
        .appendField(new Blockly.FieldNumber(50, 0, 100), "SPEED")
        .appendField("%");
    this.appendDummyInput()
        .appendField("Acceleration:")
        .appendField(new Blockly.FieldNumber(50, 0, 100), "ACCELERATION")
        .appendField("%");
    this.appendDummyInput()
        .appendField("Wheel diameter:")
        .appendField(new Blockly.FieldNumber(6.24, 0, 100), "WHEEL_DIAMETER")
        .appendField("mm");
    this.appendDummyInput()
        .appendField("Wheel separation:")
        .appendField(new Blockly.FieldNumber(10, 0, 100), "WHEEL_SEPARATION")
        .appendField("mm");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(movement_color);
    this.setTooltip("Intializes the specified drivebase to be used in the program.");
    this.setHelpUrl("");
  }
};

// Block to move the drivebase
Blockly.Blocks['movement_run'] = {
  init: function() {
    this.amountField = new Blockly.FieldNumber(1, 0);
    this.unitDropdown = new Blockly.FieldDropdown(
      [["Infinite", "INFINITE"], ["Distance (mm)", "DISTANCE"], ["Seconds", "SECONDS"]],
      this.validateUnit.bind(this)
    );

    this.appendDummyInput()
        .appendField("Move drivebase")
        .appendField(new Blockly.FieldDropdown([["Forward", "FORWARD"], ["Reverse", "REVERSE"]]), "DIRECTION")
        .appendField("for")
        .appendField(this.amountField, "AMOUNT") // Add the amount field
        .appendField(this.unitDropdown, "UNIT"); // Add the unit dropdown

    this.amountField.setVisible(false); // Hide the amount field initially
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(movement_color);
    this.setTooltip("Moves the drivebase in the specified direction for the specified amount of time or distance.");
    this.setHelpUrl("");
  },
  
  // Function to validate the selected unit and show/hide the input field
  validateUnit: function(newValue : string) {
    if (newValue === 'INFINITE') {
      this.amountField.setVisible(false);
    } else {
      this.amountField.setVisible(true);
      this.amountField.setValue(1); // Set a default value of 1 when visible
    }
    this.render(); // Re-render the block to apply visibility changes
  }
};

// Block to move the drivebase
Blockly.Blocks['movement_run_angle'] = {
  init: function() {
    this.amountField = new Blockly.FieldNumber(1, 0);
    this.unitDropdown = new Blockly.FieldDropdown(
      [["Infinite", "INFINITE"], ["Distance (mm)", "DISTANCE"], ["Seconds", "SECONDS"]],
      this.validateUnit.bind(this)
    );

    this.appendDummyInput()
        .appendField("Move drivebase")
        .appendField(angleDropdown(), "DIRECTION")
        .appendField("for")
        .appendField(this.amountField, "AMOUNT") // Add the amount field
        .appendField(this.unitDropdown, "UNIT"); // Add the unit dropdown

    this.amountField.setVisible(false); // Hide the amount field initially
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(movement_color);
    this.setTooltip("Moves the drivebase in the specified direction for the specified amount of time or distance.");
    this.setHelpUrl("");
  },
  
  // Function to validate the selected unit and show/hide the input field
  validateUnit: function(newValue : string) {
    if (newValue === 'INFINITE') {
      this.amountField.setVisible(false);
    } else {
      this.amountField.setVisible(true);
      this.amountField.setValue(1); // Set a default value of 1 when visible
    }
    this.render(); // Re-render the block to apply visibility changes
  }
};

// Block to stop the drivebase
Blockly.Blocks['movement_stop'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Stop drivebase")
        .appendField(portSelectorDropdown(), "MOTOR");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(movement_color);
    this.setTooltip("Stops the drivebase.");
    this.setHelpUrl("");
  }
};

// region Events

// Block to run when the program starts
Blockly.Blocks['events_main'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("▶ Main Program");

    this.setNextStatement(true, null);
    this.setColour(events_color);
    this.setTooltip("This block runs when the program starts.");
    this.setHelpUrl("");

    this.hat = "cap";
  }
};

// Block to run when one of the action buttons is pressed
Blockly.Blocks['events_button'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("When")
        .appendField(new Blockly.FieldDropdown([["Left", "LEFT"], ["Right", "RIGHT"]]), "BUTTON")
        .appendField("button is pressed");

    this.setNextStatement(true, null);
    this.setColour(events_color);
    this.setTooltip("This block runs when the program starts.");
    this.setHelpUrl("");

    this.hat = "cap";
  }
};

// region Controls

// Wait Block
Blockly.Blocks['controls_wait_seconds'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Wait")
        .appendField(new Blockly.FieldNumber(1, 0), "SECONDS")
        .appendField("seconds");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(control_color);
    this.setTooltip("Waits for the specified number of seconds.");
    this.setHelpUrl("");
  }
};

// Repeat Block
Blockly.Blocks['controls_repeat_times'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Repeat")
        .appendField(new Blockly.FieldNumber(10, 0), "TIMES");
    this.appendStatementInput("DO")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(control_color);
    this.setTooltip("Repeats the contained blocks for a specified number of times.");
    this.setHelpUrl("");
  }
};

// Forever Block
Blockly.Blocks['controls_forever'] = {
  init: function() {
    this.appendStatementInput("DO")
        .setCheck(null)
        .appendField("Forever");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(control_color);
    this.setTooltip("Repeats the contained blocks indefinitely.");
    this.setHelpUrl("");
  }
};

// Repeat Until Block
Blockly.Blocks['controls_repeat_until'] = {
  init: function() {
    this.appendValueInput("CONDITION")
        .setCheck("Boolean")
        .appendField("Repeat until");
    this.appendStatementInput("DO")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(control_color);
    this.setTooltip("Repeats the contained blocks until the specified condition is true.");
    this.setHelpUrl("");
  }
};

// If Block
Blockly.Blocks['controls_if'] = {
  init: function() {
    this.appendValueInput("IF0")
        .setCheck("Boolean")
        .appendField("If");
    this.appendStatementInput("DO0")
        .setCheck(null)
        .appendField("Then");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(control_color);
    this.setTooltip("If the condition is true, then do the following actions.");
    this.setHelpUrl("");
  }
};

// If-Else Block
Blockly.Blocks['controls_if_else'] = {
  init: function() {
    this.appendValueInput("IF0")
        .setCheck("Boolean")
        .appendField("If");
    this.appendStatementInput("DO0")
        .setCheck(null)
        .appendField("Then");
    this.appendStatementInput("ELSE")
        .setCheck(null)
        .appendField("Else");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(control_color);
    this.setTooltip("If the condition is true, then do the first set of actions; otherwise, do the second set of actions.");
    this.setHelpUrl("");
  }
};

// Wait Until Block
Blockly.Blocks['controls_wait_until'] = {
  init: function() {
    this.appendValueInput("CONDITION")
        .setCheck("Boolean")
        .appendField("Wait until");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(control_color);
    this.setTooltip("Waits until the specified condition becomes true.");
    this.setHelpUrl("");
  }
};

// Stop Block
Blockly.Blocks['controls_stop'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("End Script");
    this.setPreviousStatement(true, null);
    this.setNextStatement(false, null);
    this.setColour(control_color);
    this.setTooltip("Ends the script and exits the program.");
    this.setHelpUrl("");
  }
};

// Function Block
Blockly.Blocks['controls_function'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Function")
        .appendField(new Blockly.FieldTextInput("myFunction"), "NAME")
        .appendField("(")
        .appendField(new Blockly.FieldTextInput("x, y, ..."), "ARGS")
        .appendField(")");

    this.setNextStatement(true, null);
    this.setColour(control_color);
    this.setTooltip("Defines a new function. You can call this from other blocks. myFunction is the name of it, and in the perentheses, x, y, ... are the variables that the function will take. Seperate the variables by commas");
    this.setHelpUrl("");

    this.hat = "cap";
  }
};

// region Sensors

// Block to check if a sensor is a specific color
Blockly.Blocks['sensor_is_color'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Color sensor at")
        .appendField(portSelectorDropdown(), "PORT")
        .appendField("is color")
        .appendField(new Blockly.FieldDropdown([["red", "RED"], ["green", "GREEN"], ["blue", "BLUE"], ["yellow", "YELLOW"], ["pink", "PINK"], ["cyan", "CYAN"], ["white", "WHITE"], ["black", "BLACK"]]), "COLOR")
        .appendField("?");
    this.setOutput(true, null);
    this.setColour(sensors_color);
    this.setTooltip("Checks if the sensor is detecting a specific color.");
    this.setHelpUrl("");
  }
};

// Block to check if sensor reflection is below a threshold
Blockly.Blocks['sensor_reflection'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Color sensor at")
        .appendField(portSelectorDropdown(), "PORT")
        .appendField("reflection below")
        .appendField(new Blockly.FieldNumber(50, 0, 100), "THRESHOLD")
        .appendField("% ?");
    this.setOutput(true, null);
    this.setColour(sensors_color);
    this.setTooltip("Checks if the reflection detected by the sensor is below a certain threshold.");
    this.setHelpUrl("");
  }
};

// Block to get sensor color value
Blockly.Blocks['sensor_color'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Color sensor at")
        .appendField(portSelectorDropdown(), "PORT")
        .appendField("color");
    this.setOutput(true, null);
    this.setColour(sensors_color);
    this.setTooltip("Returns the color detected by the sensor.");
    this.setHelpUrl("");
  }
};

// Block to get reflected light value
Blockly.Blocks['sensor_reflected_light'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Color sensor at")
        .appendField(portSelectorDropdown(), "PORT")
        .appendField("reflected light");
    this.setOutput(true, null);
    this.setColour(sensors_color);
    this.setTooltip("Returns the amount of light reflected by the sensor.");
    this.setHelpUrl("");
  }
};

// Block to check if sensor is pressed
Blockly.Blocks['sensor_is_pressed'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Pressure sensor at")
        .appendField(portSelectorDropdown(), "PORT")
        .appendField("is pressed ?");
    this.setOutput(true, null);
    this.setColour(sensors_color);
    this.setTooltip("Checks if the sensor is being pressed.");
    this.setHelpUrl("");
  }
};

// Block to get pressure value in %
Blockly.Blocks['sensor_pressure'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Pressure sensor at")
        .appendField(portSelectorDropdown(), "PORT")
        .appendField("pressure in %");
    this.setOutput(true, null);
    this.setColour(sensors_color);
    this.setTooltip("Returns the pressure detected by the sensor as a percentage.");
    this.setHelpUrl("");
  }
};

// Block to check if the sensor is closer than a certain distance
Blockly.Blocks['sensor_is_closer_than'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Ultrasonic sensor at")
        .appendField(portSelectorDropdown(), "PORT")
        .appendField("is closer than")
        .appendField(new Blockly.FieldNumber(15, 0), "DISTANCE")
        .appendField("% ?");
    this.setOutput(true, null);
    this.setColour(sensors_color);
    this.setTooltip("Checks if the sensor detects an object closer than a certain distance.");
    this.setHelpUrl("");
  }
};

// Block to get distance in %
Blockly.Blocks['sensor_distance'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Ultrasonic sensor at")
        .appendField(portSelectorDropdown(), "PORT")
        .appendField("distance in %");
    this.setOutput(true, null);
    this.setColour(sensors_color);
    this.setTooltip("Returns the distance detected by the sensor as a percentage.");
    this.setHelpUrl("");
  }
};

// Block to set yaw angle to 0
Blockly.Blocks['sensor_reset_yaw_angle'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Reset yaw angle to 0");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(sensors_color);
    this.setTooltip("Resets the yaw angle to 0.");
    this.setHelpUrl("");
  }
};

// Block to get yaw angle value
Blockly.Blocks['sensor_yaw_angle'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Yaw angle");
    this.setOutput(true, null);
    this.setColour(sensors_color);
    this.setTooltip("Returns the current yaw angle.");
    this.setHelpUrl("");
  }
};

// Block to check if a button is pressed
Blockly.Blocks['sensor_is_button_pressed'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Is")
        .appendField(new Blockly.FieldDropdown([["left", "LEFT"], ["right", "RIGHT"]]), "BUTTON")
        .appendField("button pressed ?");
    this.setOutput(true, null);
    this.setColour(sensors_color);
    this.setTooltip("Checks if the specified button is pressed.");
    this.setHelpUrl("");
  }
};

// Block to get timer value
Blockly.Blocks['sensor_timer'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Timer");
    this.setOutput(true, null);
    this.setColour(sensors_color);
    this.setTooltip("Returns the value of the timer.");
    this.setHelpUrl("");
  }
};

// Block to reset the timer
Blockly.Blocks['sensor_reset_timer'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Reset timer");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(sensors_color);
    this.setTooltip("Resets the timer to 0.");
    this.setHelpUrl("");
  }
};

// region Operators

// Pick Random Block
Blockly.Blocks['operator_pick_random'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Pick random")
        .appendField(new Blockly.FieldNumber(1), "FROM")
        .appendField("to")
        .appendField(new Blockly.FieldNumber(10), "TO");
    this.setOutput(true, null);
    this.setColour(operators_color);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

// And Block
Blockly.Blocks['operator_and'] = {
  init: function() {
    this.appendValueInput("A")
        .setCheck("Boolean");
    this.appendValueInput("B")
        .setCheck("Boolean")
        .appendField("and");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(operators_color);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

// Or Block
Blockly.Blocks['operator_or'] = {
  init: function() {
    this.appendValueInput("A")
        .setCheck("Boolean");
    this.appendValueInput("B")
        .setCheck("Boolean")
        .appendField("or");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(operators_color);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

// Join Block
Blockly.Blocks['operator_join'] = {
  init: function() {
    this.appendValueInput("ADD0")
        .appendField("Join")
        .setCheck("String");
    this.appendValueInput("ADD1")
        .setCheck("String");
    this.setOutput(true, null);
    this.setColour(operators_color);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

// Not Block
Blockly.Blocks['operator_not'] = {
  init: function() {
    this.appendValueInput("BOOL")
        .setCheck("Boolean")
        .appendField("nNt");
    this.setOutput(true, null);
    this.setColour(operators_color);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

// Between Block
Blockly.Blocks['operator_is_between'] = {
  init: function() {
    this.appendValueInput("VALUE")
        .setCheck("Number");
    this.appendDummyInput()
        .appendField("In between")
        .appendField(new Blockly.FieldNumber(-10), "FROM")
        .appendField("and")
        .appendField(new Blockly.FieldNumber(10), "TO");
    this.setOutput(true, null);
    this.setColour(operators_color);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

// Letter of Block
Blockly.Blocks['operator_char_at'] = {
  init: function() {
    this.appendValueInput("VALUE")
        .setCheck("String")
    this.appendDummyInput()
        .appendField("Letter at")
        .appendField(new Blockly.FieldNumber(1), "AT")
    this.setOutput(true, null);
    this.setColour(operators_color);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

// Length of Block
Blockly.Blocks['operator_length'] = {
  init: function() {
    this.appendValueInput("VALUE")
        .setCheck("String")
        .appendField("Length of");
    this.setOutput(true, null);
    this.setColour(operators_color);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

// Contains Block
Blockly.Blocks['operator_contains'] = {
  init: function() {
    this.appendValueInput("VALUE")
        .setCheck("String");
    this.appendDummyInput()
        .appendField("Contains")
        .appendField(new Blockly.FieldTextInput("a"), "TEXT");
    this.setOutput(true, null);
    this.setColour(operators_color);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

// region Math

// Addition Block
Blockly.Blocks['math_add'] = {
  init: function() {
    this.appendValueInput("A")
        .setCheck("Number");
    this.appendValueInput("B")
        .setCheck("Number")
        .appendField("+");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(math_color);
    this.setTooltip("Adds two numbers.");
    this.setHelpUrl("");
  }
};

// Subtraction Block
Blockly.Blocks['math_subtract'] = {
  init: function() {
    this.appendValueInput("A")
        .setCheck("Number");
    this.appendValueInput("B")
        .setCheck("Number")
        .appendField("-");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(math_color);
    this.setTooltip("Subtracts two numbers.");
    this.setHelpUrl("");
  }
};

// Multiplication Block
Blockly.Blocks['math_multiply'] = {
  init: function() {
    this.appendValueInput("A")
        .setCheck("Number");
    this.appendValueInput("B")
        .setCheck("Number")
        .appendField("*");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(math_color);
    this.setTooltip("Multiplies two numbers.");
    this.setHelpUrl("");
  }
};

// Division Block
Blockly.Blocks['math_divide'] = {
  init: function() {
    this.appendValueInput("A")
        .setCheck("Number");
    this.appendValueInput("B")
        .setCheck("Number")
        .appendField("/");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(math_color);
    this.setTooltip("Divides two numbers.");
    this.setHelpUrl("");
  }
};

// Less Than Block
Blockly.Blocks['math_less_than'] = {
  init: function() {
    this.appendValueInput("A")
        .setCheck("Number");
    this.appendValueInput("B")
        .setCheck("Number")
        .appendField("<");
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
    this.setColour(math_color);
    this.setTooltip("Checks if the first number is less than the second.");
    this.setHelpUrl("");
  }
};

// Equal Block
Blockly.Blocks['math_equal'] = {
  init: function() {
    this.appendValueInput("A")
        .setCheck("Number");
    this.appendValueInput("B")
        .setCheck("Number")
        .appendField("=");
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
    this.setColour(math_color);
    this.setTooltip("Checks if two numbers are equal.");
    this.setHelpUrl("");
  }
};

// Not Equal Block
Blockly.Blocks['math_not_equal'] = {
  init: function() {
    this.appendValueInput("A")
        .setCheck("Number");
    this.appendValueInput("B")
        .setCheck("Number")
        .appendField("not = (!=)");
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
    this.setColour(math_color);
    this.setTooltip("Checks if two numbers are equal.");
    this.setHelpUrl("");
  }
};

// Greater Than Block
Blockly.Blocks['math_greater_than'] = {
  init: function() {
    this.appendValueInput("A")
        .setCheck("Number");
    this.appendValueInput("B")
        .setCheck("Number")
        .appendField(">");
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
    this.setColour(math_color);
    this.setTooltip("Checks if the first number is greater than the second.");
    this.setHelpUrl("");
  }
};

// Round Block
Blockly.Blocks['math_round'] = {
  init: function() {
    this.appendValueInput("NUM")
        .setCheck("Number")
        .appendField("Round");
    this.setOutput(true, "Number");
    this.setColour(math_color);
    this.setTooltip("Rounds a number to the nearest integer.");
    this.setHelpUrl("");
  }
};

// Modulus Block
Blockly.Blocks['math_modulus'] = {
  init: function() {
    this.appendValueInput("A")
        .setCheck("Number");
    this.appendValueInput("B")
        .setCheck("Number")
        .appendField("modulus (%)");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(math_color);
    this.setTooltip("Returns the remainder of the division of two numbers.");
    this.setHelpUrl("");
  }
};

// Math Function Block
Blockly.Blocks['math_functions'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
          ["abs", "ABS"],
          ["floor", "FLOOR"],
          ["ceiling", "CEILING"],
          ["sqrt", "SQRT"],
          ["sin", "SIN"],
          ["cos", "COS"],
          ["tan", "TAN"],
          ["asin", "ASIN"],
          ["acos", "ACOS"],
          ["atan", "ATAN"],
          ["ln", "LN"],
          ["log", "LOG"],
          ["e ^", "EXP"],
          ["10 ^", "TENEXP"]
        ]), "FUNCTION")
        .appendField("of")
        .appendField(new Blockly.FieldNumber(0), "NUM");
    this.setOutput(true, "Number");
    this.setColour(math_color);
    this.setTooltip("Applies a selected math function to the number.");
    this.setHelpUrl("");
  }
};

// region Comments

// Single Line Comment
Blockly.Blocks['comment'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Comment:")
        .appendField(new Blockly.FieldTextInput("Single line comment"), "COMMENT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(comment_color);
    this.setTooltip("Comment your code.");
    this.setHelpUrl("");
  }
};

// Multiline Comment
Blockly.Blocks['multiline_comment'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Comment:")
        .appendField(new FieldMultilineInput("Multiline\ncomment"), "COMMENT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(comment_color);
    this.setTooltip("Comment your code in multiple lines.");
    this.setHelpUrl("");
  }
};