import loading from '../../../tempdata/loading.gif';
import styles from './Style';
const Loading = () => {
  return (
    <styles.MainBlock>
      <styles.Img src={loading} />;
    </styles.MainBlock>
  );
};

export default Loading;
