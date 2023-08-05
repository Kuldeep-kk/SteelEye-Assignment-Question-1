import styles from "./ListRow.module.css";

const ListCell = ({ onClick,children }) => {
  return ( <tr onClick={onClick} className={styles.cell}>{children}</tr>);
};

export default ListCell;
