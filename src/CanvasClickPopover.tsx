import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const CanvasClickPopover = ({anchorEl, handleClose, setElements, elements, lastElementId, setLastElementId,reactFlowWrapper,reactFlowInstance}: any) => {


  // POPOVER TESTING---------------------------
  const useStyles = makeStyles((theme) => ({
    popoverRoot: {
      
    },
    popoverPaper: {
      boxShadow: 'none',
      backgroundColor: 'transparent',
    },
    button: {
      margin: theme.spacing(1),
    },
  }));
  const classes = useStyles();
  
  // const open = Boolean(anchorEl.x);
  const id = anchorEl.open ? 'simple-popover' : undefined;
  // POPOVER TESTING---------------------------

  

  const handlePopoverClick = (event: any) => {
    
    const id = lastElementId + 1

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = reactFlowInstance.project({
        x: anchorEl.x - reactFlowBounds.left - 150,
        y: anchorEl.y - reactFlowBounds.top-25,
      });
  
    const newNode = {
      id: id.toString(),
      type: 'special',
      data: { label: `Node ${id}` },
      position,
    }

    setElements(elements.concat(newNode));
    console.log(elements, id)
    setLastElementId(id)
    handleClose()
  }

  return (
      <Popover
        classes={{
          root: classes.popoverRoot,
          paper: classes.popoverPaper
        }}
        id={id}
        open={anchorEl.open}
        // anchorEl={anchorEl}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={{ top: anchorEl.y, left: anchorEl.x }}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
      >
        <Button
          onClick={handlePopoverClick}
          variant="contained"
          color="primary"
          className={classes.button}
          endIcon={<AddCircleIcon/>}
        >
          New
        </Button>
      </Popover>
  );
};

export default CanvasClickPopover;