import { styled } from "@mui/material";
import {Link as LinkComponent} from 'react-router-dom'
import { graycolor } from "../../Constants/Color";

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

export const InputBox = styled('input')`
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    padding: 0 3rem;
    border-radius: 1.5rem;
    background-color: ${graycolor};
`

export const AvatarCard = styled('div')`
width: 5rem;
height: 3rem;
position: relative;
display: flex;
align-items: center;
`