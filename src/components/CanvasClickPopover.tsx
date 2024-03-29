import React from 'react';

import createNode from '../utils/createNode'
import {useReactFlow} from "react-flow-renderer"

import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const CanvasClickPopover = ({anchorEl, handleClose, reactFlowWrapper, projectName}: any) => {


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

  const reactFlowInstance = useReactFlow()

  const handlePopoverClick = (anchorEl: any, reactFlowWrapper: any, reactFlowInstance: any) => {

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
    const nodeX = anchorEl.x - reactFlowBounds.left - 150
    const nodeY = anchorEl.y - reactFlowBounds.top - 25

    createNode({nodeX, nodeY, inPixels: true, reactFlowInstance, edge: false, projectName})

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
          onClick={() => handlePopoverClick(anchorEl, reactFlowWrapper, reactFlowInstance)}
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