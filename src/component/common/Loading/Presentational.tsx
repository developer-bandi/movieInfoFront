import loading from '../../../imgs/loading.gif';
import styles from './Style';
const LoadingPresentational = () => {
  return (
    <styles.MainBlock>
      <styles.Img src={loading} data-testid={'loading'} />;
    </styles.MainBlock>
  );
};

export default LoadingPresentational;
