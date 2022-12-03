import styled from 'styled-components'

/* StyledContainer é responsável por alinhar as coisas no centro e StyledChildren responsável 
por setar o tamanho máximo*/

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;

  @medi(max-width: 700px) {
    padding: 10px;
  }
`

const StyledChildren = styled.div`
  max-width: 700px;
  width: 100%;
`



function Container ({ children }) {
  return (
    <StyledContainer>
      <StyledChildren>
        {children}
      </StyledChildren>
    </StyledContainer>
  )
}

export default Container