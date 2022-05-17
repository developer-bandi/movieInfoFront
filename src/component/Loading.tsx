import styled from 'styled-components';
import loading from '../tempdata/loading.gif';
const Loading = () => {
  return (
    <LoadingBlock>
      <Loadingimg src={loading} />;
    </LoadingBlock>
  );
};

const LoadingBlock = styled.div`
  background: #fafafa;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;
const Loadingimg = styled.img`
  margin: auto;
  margin-top: 6rem;
  margin-bottom: 6rem;
`;

export default Loading;
