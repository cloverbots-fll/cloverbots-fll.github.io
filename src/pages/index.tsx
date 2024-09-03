// React
import React, { useRef } from 'react';

// Blockly components
import BlocklyComponent, { Category, Block } from '@/components/Blockly/Main';

// Custom blocks and generator
import '@/components/customblocks';
import { PyBricksGenerator } from '@/components/Blockly/generator/generator';

// UI
import { Menubar } from '@/components/ui/menubar';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

function App() {
  const workspaceRef = useRef(null);

  function BlocksToCode() {
    if (!workspaceRef.current) {
      toast.error('Workspace is not defined!');
      return 'Workspace is not defined!';
    }
    // @ts-ignore || Ensure the code is generated for the entire workspace
    const workspace = workspaceRef.current.workspace;
    const code = PyBricksGenerator.workspaceToCode(workspace);
    return code; // Return the generated code
  }

  function BlocklyMenubar() {
    const runCode = () => {
      let code = BlocksToCode();
      console.log(code);
      if (code === '') {
        toast.error('Workspace is empty!');
        return;
      } else if (code === 'Workspace is not defined!') {
        return;
      }
      toast.success('Code successfully generated!');
    };

    const buttons = ["New File", "Load File", "Save File", "Run Code"];
    const functions = [undefined, undefined, undefined, runCode];

    return (
      <div className='BlocklyMenubar'>
        <Menubar className='bg-toolbar-bg h-full rounded-none'>
          {buttons.map((button, index) => (
            <Button
              key={index}
              onClick={functions[index]}
              className='bg-transparent hover:bg-toolbar-button-bg text-white'
            >
              {button}
            </Button>
          ))}
        </Menubar>
      </div>
    );
  }

  return (
    <div className="App">
      <BlocklyMenubar />
      {/* @ts-ignore || Silences a type error */}
      <BlocklyComponent
        ref={workspaceRef}
        readOnly={false}
        trashcan={true}
        media='/'
        move={{ scrollbars: true, drag: true, wheel: true }}
      >
        {[
          { name: 'Motors', blocks: ['motor_initialize', 'motor_run', 'motor_stop', 'motor_speed_var', 
            'motor_position_var'], colour: "#0772c0" },
          { name: 'Movement', blocks: ["movement_initialize", "movement_run", "movement_run_angle", 
            "movement_stop"], colour: "#9f006f" },
          { name: 'Events', blocks: ['events_main', 'events_button'], colour: "#c4a005" },
          { name: 'Control', blocks: ['controls_wait_seconds', 'controls_repeat_times', 'controls_forever', 
            'controls_repeat_until', 'controls_if', 'controls_if_else', 'controls_wait_until', 'controls_stop'], colour: "#946100" },
          { name: 'Sensors', blocks: ['sensor_is_color', 'sensor_reflection', 'sensor_color', 'sensor_reflected_light',
            'sensor_is_pressed', 'sensor_pressure', 'sensor_is_closer_than', 'sensor_distance', 'sensor_reset_yaw_angle',
            'sensor_yaw_angle', 'sensor_is_button_pressed', 'sensor_timer', 'sensor_reset_timer'], colour: "#1188a8" },
          { name: 'Operators', blocks: ['operator_pick_random', 'operator_and', 'operator_or', 'operator_join',
            'operator_not', 'operator_is_between', 'operator_char_at', 'operator_length', 'operator_contains'], colour: "#01933f" },
          { name: 'Math', blocks: ['math_add', 'math_subtract', 'math_multiply', 'math_divide',
            'math_less_than', 'math_greater_than', 'math_equal', 'math_not_equal', 'math_round',
            'math_modulus', 'math_functions'], colour: "#920302" },
          { name: 'Variables', blocks: ['variables_set', 'variables_get'], colour: "#a55b80" },
          { name: 'Functions', blocks: ['procedures_defnoreturn', 'procedures_defreturn', 'procedures_callnoreturn', 'procedures_callreturn'], colour: "#995ba5" },
          { name: 'Comments', blocks: ['comment', 'multiline_comment'], colour: "#aba85e" },
        ].map((category) => (
          <Category key={category.name} name={category.name} colour={category.colour}>
            {category.blocks.map((block) => (
              <Block key={block} type={block} />
            ))}
          </Category>
        ))}
      </BlocklyComponent>
    </div>
  );
}

export default App;