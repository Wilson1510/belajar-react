import styled, { css } from "styled-components";


const test = css`font-weight: 100`

const angka = 10

const Container = styled.div`
${({type}) => console.log(type)}
  color: ${({type}) => type === "primary" ? "#00ff00" : "#0000ff"};
  font-size: ${angka > 5 ? "50px" : "5px"};
  ${test};
  background-color: ${props => props.type === "primary" ? "#000" : "#ff0000"};
  padding: 20px;
  margin: 10px;
`;

Container.defaultProps = {
  type: "primary"
}

const Element = styled.h1`
  ${props => props.as === "h1" && "color: #00ff00"}
  ${props => props.as === "h2" && "color: #0000ff"}
  ${props => props.as === "h3" && "color: #ff00ff"}
`;


export default function App() {
  return (
    <>
      <Container>Hello World</Container>
      <Container type="secondary">Hello World</Container>
      <Element as="h1">Hello World</Element>
      <Element as="h2">Hello World</Element>
      <Element as="h3">Hello World</Element>
    </>
  );
}
