import * as React from 'react';
import Button from '@mui/material/Button';
import MUITooltip from '@mui/material/Tooltip';

export function TooltipOffset() {
  return (
    <MUITooltip
      title="Add"
      slotProps={{
        popper: {
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, -14],
              },
            },
          ],
        },
      }}
    >
      <Button>Offset</Button>
    </MUITooltip>
  );
}

export default MUITooltip;