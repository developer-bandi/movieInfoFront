import styled from 'styled-components';

interface NullComponentProps {
  text: string;
}

const NullComponent = ({ text }: NullComponentProps) => {
  return (
    <Background>
      <Text>{text}</Text>
    </Background>
  );
};

const Background = styled.div`
  background: ${(props) => props.theme.background};
  weight: 100%;
  height: 100rem;
  font-size: 20px;
  display: flex;
  justify-content: center;

  @media screen and (max-width: 500px) {
    height: 40rem;
  }
`;

const Text = styled.div`
  font-size: 30px;
  margin-top: 10rem;
  @media screen and (max-width: 500px) {
    font-size: 15px;
  }
`;

export default NullComponent;
