import React from 'react';
import ReactDOM from 'react-dom/client';  // Updated to use the new React 18 API
import * as Blockly from 'blockly/core';

class BlocklyReactField extends Blockly.Field {
  SERIALIZABLE = true;

  static fromJson(options) {
    return new this(options['text']);
  }

  showEditor_() {
    this.div_ = Blockly.DropDownDiv.getContentDiv();
    
    // Use createRoot to render the component
    this.reactRoot = ReactDOM.createRoot(this.div_);
    this.reactRoot.render(this.render());

    var border = this.sourceBlock_.style.colourTertiary;
    border = border.colourBorder || border.colourLight;
    Blockly.DropDownDiv.setColour(this.sourceBlock_.getColour(), border);

    Blockly.DropDownDiv.showPositionedByField(
      this,
      this.dropdownDispose_.bind(this),
    );
  }

  dropdownDispose_() {
    // Use root.unmount instead of unmountComponentAtNode
    if (this.reactRoot) {
      this.reactRoot.unmount();
      this.reactRoot = null;
    }
  }

  render() {
    return <FieldRenderComponent />;
  }
}

class FieldRenderComponent extends React.Component {
  render() {
    return <div></div>;
  }
}

// Check if the field is already registered by attempting to use it
if (!Blockly.fieldRegistry || !Blockly.fieldRegistry['field_react_component']) {
  try {
    Blockly.fieldRegistry.register('field_react_component', BlocklyReactField);
  } catch (e) {
    if (e.message.includes('already registered')) {
    } else {
      throw e;  // Re-throw other errors
    }
  }
}

export default BlocklyReactField;
