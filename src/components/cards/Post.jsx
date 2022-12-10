import styled from 'styled-components'
import moment from 'moment/moment'
import axios from 'axios'
import { useSWRConfig } from 'swr'

import  Menu from '../navigation/Menu'

const PostContainer = styled.div`
  background-color: ${props => props.theme.white};
  padding: 20px;
  border-radius: 10px;
`
const StyledUsername = styled.p`
  font-weight: bold;
  font-size: 18px;
`

const StyledDate = styled.p`
  font-size: 12px;
`
const ContainerText = styled.div`
  margin-top: 20px;
`

const ContainerMenu = styled.div`
  float: right;
`

function Post ({ date, user, text, isOwner, id }) {
  const { mutate } = useSWRConfig()
  const handleEdit = () => {
    console.log("EDITAR PUBLICADO")
  }

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/post`, {
        data: {
          id //mesma coisa de passar id:id, esse id vem da props
        }
      })
      if (response.status === 200)
        mutate(`${process.env.NEXT-PUBLIC_API_URL}/api/post`)
    }catch (err) {
      console.log(err)
    }
  }


  return(
    <PostContainer>

      {
        isOwner &&
        <ContainerMenu>
        <Menu 
          options={[
            {
              text: 'Editar publicação',
              onClick: handleEdit
            }, 
            {
              text: 'Deletar publicação',
              onClick: handleDelete                
            }
          ]}
        />
      </ContainerMenu>
      } 

      
      <StyledUsername>@{user}</StyledUsername>
      <StyledDate>{moment(date).format('LLL')}</StyledDate>
      <ContainerText>{text}</ContainerText>
    </PostContainer>
  )
}

export default Post;