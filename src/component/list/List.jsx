import ListRow from "./ListRow";
import ListRowCell from "./ListRowCell";

import ListHeader from "./ListHeader";
import ListHeaderCell from "./ListHeaderCell";

import styles from "./List.module.css";

const List = ({ rows ,submittedDateData,orderVolumeType, searchId,sendSelectedOrderDetailAndStamp}) => {
  
  const filterOrderId = rows.filter((row) =>row["&id"].toLowerCase().includes(searchId.toLowerCase()));

  const handleRowClick = (rowData,index) => {
    sendSelectedOrderDetailAndStamp( rowData.executionDetails,submittedDateData[index].timestamps);
  };

  return (
    <table className={styles.container}>
      <thead>
        <ListHeader>
          <ListHeaderCell>Order ID</ListHeaderCell>
          <ListHeaderCell>Buy/Sell</ListHeaderCell>
          <ListHeaderCell>Country</ListHeaderCell>
          <ListHeaderCell>Order Submitted</ListHeaderCell>
          <ListHeaderCell>Order Volume / {orderVolumeType}</ListHeaderCell>
        </ListHeader>
      </thead>
      <tbody>
        {filterOrderId.map((row,index) => (
          <ListRow key={index} onClick={() => handleRowClick(row,index)}>
            <ListRowCell>{row["&id"]}</ListRowCell>
            <ListRowCell>{row.executionDetails.buySellIndicator}</ListRowCell>
            <ListRowCell>{row.executionDetails.orderStatus}</ListRowCell>
            {submittedDateData && submittedDateData.find((timestampRow) => timestampRow["&id"] === row["&id"]) ? 
            (
              <ListRowCell>{submittedDateData[index].timestamps.orderSubmitted}</ListRowCell>
            ) : (
                  <ListRowCell></ListRowCell>
                )}
            
            <ListRowCell>{row.bestExecutionData.orderVolume[orderVolumeType]}</ListRowCell>
          </ListRow>
        ))}
      </tbody>
    </table>
  );
};

export default List;
