import styled from 'styled-components'

/*Eu poderia colocar justify-content: space-between no StyledNavbar, 
ao invés de flex: 1 no StyledLogo?*/

const StyledNavbar = styled.div `
  background-color: ${props => props.theme.white};
  height: 80px;
  display: flex;
  align-items: center;
  padding: 0 100px;

  @media(max-width: 500px) {
    padding: 0 20px;
  }
  
`

const StyledLogo = styled.span`
  flex: 1;
  font-weight: bold;
  font-size: 20px;
`



function Navbar() {
  return (
    <StyledNavbar>
      <StyledLogo> # Social Dev</StyledLogo>
      <div>
          <a href="#">Desconectar</a>
      </div>
    </StyledNavbar>
  )    

}

export default Navbar