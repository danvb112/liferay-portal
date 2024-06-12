import React from 'react';

import {BpmnView} from './diagramViewer'

import "./styles.scss";

export function App() {
  return (
    <div className="App">
      {/** This is for viewer only 
      https://stackoverflow.com/questions/42708361/integrating-bpmn-js-to-modeler-the-react-component
      */}
      <BpmnView />

    </div>
  );
}
