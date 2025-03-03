import React from 'react'
import { transformImage } from '../../lib/Features';
import FileopenIcon from '@mui/icons-material/FileOpen';
const Renderattachment = (file, url) => {
    switch (file) {
        case "video":
            return <video src={url} preload='none' width={'200px'} controls />


        case "audio":
            return <audio src={url} preload='none' controls />


        case "image":
            return <img src={transformImage(url, 200)} alt='attachment' width={'200px'} height={'150px'}
                style={{
                    objectFit: 'contain'
                }}
            />

        default:
            return <FileopenIcon />;
    }
}

export default Renderattachment