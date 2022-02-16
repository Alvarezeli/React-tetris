import styled from 'styled-components';

export const StyledCell = styled.div`
width: auto;
background: rgba(${props => props.color}, 0.9);
border: ${props => (props.type === 0 ? '0px solid' : '1px solid')};
box-shadow:inset 3px 3px 5px rgba(${props => props.shadow}), inset -3px -3px 3px rgba(${props => props.shadow});
`