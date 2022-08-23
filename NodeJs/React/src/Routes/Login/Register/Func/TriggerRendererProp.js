import React from 'react'
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function TooltipPositionedExample() {
  return (
    <>
      
        <OverlayTrigger
          placement={'right'}
          overlay={
            <Tooltip id={`tooltip-right}`}>
              Tooltip on <strong>right</strong>.
            </Tooltip>
          }
        >
          <Button variant="secondary">Tooltip on right</Button>
        </OverlayTrigger>
      
    </>
  );
}

export default TooltipPositionedExample;