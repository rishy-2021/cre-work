import { Drawer } from 'antd'
import React, { FC } from 'react'
import TaskMutation from './task-mutation'

interface Props {
    open: boolean;
    onClose:()=> void;
    width:string;
    onWidthChange: (width:string) => void;
    action:string;
}

const CustomDrawer:FC<Props> = ({open, width, onClose, onWidthChange, action}) => {
  return (
    <Drawer closable={false} onClose={onClose} open={open} width={width}>
    <TaskMutation
      onClose={onClose}
      onChangeWidth={onWidthChange}
      taskStatus={action}
    />
  </Drawer>
  )
}

export default CustomDrawer;
