import styled from 'styled-components';

const MainBlock = styled.div`
  background: ${(props) => props.theme.background};
  border-bottom: 1px solid #e8e8e8;
`;

const ImgInfoBlock = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  padding-top: 10rem;
  @media screen and (max-width: 500px) {
    padding-top: 2rem;
  }
`;

const Img = styled.img`
  width: 17%;
  border-radius: 10px;
  @media screen and (max-width: 500px) {
    width: 8rem;
    height: 14rem;
  }
`;

const InfoListBlock = styled.div`
  width: 60%;
  height: 20rem;
  margin-left: 2rem;
  @media screen and (max-width: 500px) {
    width: 13rem;
    height: 10rem;
    margin-left: 1rem;
  }
`;

const FavoriteButton = styled.div`
  width: 3rem;
  height: 3rem;
  float: right;
`;

const MovieTitle = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 1rem;
  @media screen and (max-width: 500px) {
    font-size: 20px;
  }
`;

const InfoBlock = styled.div`
  display: flex;
  margin-bottom: 0.7rem;
`;

const InfoTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  @media screen and (max-width: 500px) {
    font-size: 15px;
  }
`;

const InfoContent = styled.div`
  font-size: 20px;
  margin-left: 1rem;
  @media screen and (max-width: 500px) {
    font-size: 14px;
  }
`;

const SummuryBlock = styled.div`
  width: 80%;
  margin: auto;
  padding-bottom: 3rem;
  border-top: 0.5px solid gray;
  line-height: 1.5;

  @media screen and (max-width: 500px) {
    width: 90%;
    height: 100%;
    padding: 5%;
  }
`;

const Tagline = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 1rem;
  margin-top: 1rem;
`;

const Overview = styled.div`
  font-size: 17px;
`;

const styles = {
  MainBlock,
  ImgInfoBlock,
  Img,
  InfoListBlock,
  FavoriteButton,
  MovieTitle,
  InfoBlock,
  InfoTitle,
  InfoContent,
  SummuryBlock,
  Tagline,
  Overview,
};

export default styles;
