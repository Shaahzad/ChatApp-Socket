import { Menu } from '@mui/material'
import React from 'react'

const FileMenu = ({ anhcorEl }) => {
    return (
        <Menu anchorEl={anhcorEl} open={false}>
            <div style={{
                width: '10rem'
            }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, itaque?
            </div>
        </Menu>
    )
}

export default FileMenu