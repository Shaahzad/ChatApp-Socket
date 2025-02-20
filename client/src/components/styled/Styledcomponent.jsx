import { styled } from "@mui/material";


export const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    border: 0,
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    width: 1,
    whiteSpace: 'nowrap',

})