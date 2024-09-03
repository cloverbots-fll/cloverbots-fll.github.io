import React, { useEffect, useRef, useImperativeHandle } from 'react';
import * as Blockly from 'blockly/core';
import * as locale from 'blockly/msg/en';
import 'blockly/blocks';
import DarkTheme from '@blockly/theme-dark';
import { ContinuousToolbox, ContinuousFlyout, ContinuousMetrics } from '@blockly/continuous-toolbox';
import { WorkspaceSearch } from '@blockly/plugin-workspace-search';
import { ScrollOptions, ScrollBlockDragger, ScrollMetricsManager } from '@blockly/plugin-scroll-options';

// Set Blockly locale
Blockly.setLocale(locale);

const BlocklyComponent = React.forwardRef((props, ref) => {
  const blocklyDiv = useRef(null);
  const toolbox = useRef(null);
  const primaryWorkspace = useRef(null);

  useImperativeHandle(ref, () => primaryWorkspace.current, [primaryWorkspace]);

  useEffect(() => {
    const { initialXml, children, ...rest } = props;

    primaryWorkspace.current = Blockly.inject(blocklyDiv.current, {
      toolbox: toolbox.current,
      theme: DarkTheme,
      plugins: {
        toolbox: ContinuousToolbox,
        flyoutsVerticalToolbox: ContinuousFlyout,
        metricsManager: ContinuousMetrics,
        blockDragger: ScrollBlockDragger,
        metricsManager: ScrollMetricsManager,
      },
      ...rest,
    });

    const mainblock = primaryWorkspace.current.newBlock('events_main');
    mainblock.initSvg();
    mainblock.render();

    const workspaceSearch = new WorkspaceSearch(primaryWorkspace.current);
    workspaceSearch.init();
    const scrollPlugin = new ScrollOptions(primaryWorkspace.current);
    scrollPlugin.init();

    if (initialXml) {
      Blockly.Xml.domToWorkspace(
        Blockly.utils.xml.textToDom(initialXml),
        primaryWorkspace.current
      );
    }

    return () => {
      if (primaryWorkspace.current) {
        primaryWorkspace.current.dispose();
      }
    };
  }, [props]);

  return (
    <>
      <div ref={blocklyDiv} id="blocklyDiv" />
      <div style={{ display: 'none' }} ref={toolbox}>
        {props.children}
      </div>
    </>
  );
});

BlocklyComponent.displayName = 'BlocklyComponent'; // Add display name

export default BlocklyComponent;
