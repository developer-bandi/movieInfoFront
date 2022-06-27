import styles from './Style';

interface NullComponentProps {
  text: string;
}

const NullComponent = ({ text }: NullComponentProps) => {
  return (
    <styles.MainBlock>
      <styles.Content>{text}</styles.Content>
    </styles.MainBlock>
  );
};

export default NullComponent;
