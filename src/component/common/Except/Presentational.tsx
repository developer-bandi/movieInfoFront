import styles from './Style';

interface ExceptProps {
  text: string;
}

const ExceptPresentational = ({ text }: ExceptProps) => {
  return (
    <styles.MainBlock>
      <styles.Content data-testid={'except'}>{text}</styles.Content>
    </styles.MainBlock>
  );
};

export default ExceptPresentational;
