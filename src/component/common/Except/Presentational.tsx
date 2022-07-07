import styles from './Style';

interface ExceptProps {
  text: string;
}

const Except = ({ text }: ExceptProps) => {
  return (
    <styles.MainBlock>
      <styles.Content>{text}</styles.Content>
    </styles.MainBlock>
  );
};

export default Except;
