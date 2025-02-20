import { styled } from "@mui/material";
import {Link as LinkComponent} from 'react-router-dom'

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


export const Link = styled(LinkComponent)`
text-decoration: none;
color: black;
padding: 1rem;
&:hover{
    background-color: 'rgba(0,0,0,0.1)';
}
`;