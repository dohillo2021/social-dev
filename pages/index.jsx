import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { withIronSessionSsr } from 'iron-session/next';
import axios from 'axios';
import useSWR from 'swr';

import { ironConfig } from '../lib/middleware/ironSession';

import Navbar from "../src/components/layout/navbar";
import Container from '../src/components/layout/container';
import CreatePost from '../src/components/cards/CreatePost';
import Post from '../src/components/cards/Post';
import H3 from '../src/components/tipographfy/H3';

const Content = styled.div`
  margin: 50px 0;
`
const LastPostText = styled(H3)`
  padding: 40px 0;
`

const RefreshPosts = styled.span`
  font-weight: bold;
  color: ${props => props.theme.primary};
  cursor: pointer;
`
const RefreshPostsContainer = styled.div`
  text-align: center;
`

const PostContainer = styled.div`
  display:  flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
`
const fetcher = url => axios.get(url).then(res => res.data);

function HomePage ({ user }) {

  const { data } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}api/post`, fetcher);
  
  return (
    <>
      <Navbar />
      <Content>
        <Container>
          <CreatePost user={user.user}/>
          <LastPostText>Ultimas postagens:</LastPostText>
          {/* <RefreshPostsContainer>
          <RefreshPosts>Carregar novas postagens</RefreshPosts>
          </RefreshPostsContainer> */}
          <PostContainer>
            {
              data?.map( post => 
                <Post 
                  key={post._id} 
                  text={post.text}
                  user={post.createdBy.user}
                  date={post.created_Date}
                  isOwner={post.createdBy._id === user.id}
                  id={post._id}
                />
              )
            }
          </PostContainer>
        </Container>
      </Content>
    </>
  )
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;

    if (!user) {
      return {
        redirect: {
          permanent: false,
          destination: '/login'
        }
      }
    }
    console.log(user)
    return {
      props: {
        user
      }
    }
  },
  ironConfig
)

export default HomePage