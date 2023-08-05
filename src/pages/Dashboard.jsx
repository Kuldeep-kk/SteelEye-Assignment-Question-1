import { useState,useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomButton from "../stories/Button";

// Data
import mockData from "../assets/data.json";
import timestamps from "../assets/timeStamps.json";

// Components
import Dropdown from "../component/dropdown/Dropdown";
import HeaderTitle from "../component/header-title/HeaderTitle";
import Search from "../component/search/Search";
import List from "../component/list/List";

// Styles
import styles from "./Dashboard.module.css";
import Card from "../component/card/Card";

const Dashboard = () => {
  const [currency, setCurrency] = useState("EUR");
  const [searchText, setSearchText] = useState("");
  const [selectedOrderDetails, setSelectedOrderDetails] = useState({});
  const [selectedOrderTimeStamps, setSelectedOrderTimeStamps] = useState({});

  const getSelectedOrderData = (detail,timestamp)=>{
    setSelectedOrderDetails(detail);
    setSelectedOrderTimeStamps(timestamp);
  }

  const messageComponent=() => {
    toast.warn('This Button was created in stories with the help of storybook', {
      autoClose: 3000,
      position:"top-center",
    });
  }

  useEffect(() => {
    const toastTimer = setTimeout(() => {
      toast.info('Select any Order to view Details and Timestamp', {
        autoClose: 3000,
        position:"bottom-right",
      });
    }, 500); return () => clearTimeout(toastTimer);
    
  }, []);

  return (
    <div>
      <div className={styles.header}>
        <HeaderTitle primaryTitle="Orders" secondaryTitle={mockData.results.length} />
        <div className={styles.actionBox}>
          <Search
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Dropdown
            options={["GBP", "USD", "JPY", "EUR"]}
            onChange={(e) => setCurrency(e.target.value)}
            selectedItem={currency}
          />
        </div>
      </div>
      <div className={styles.content}>
      {((Object.keys(selectedOrderDetails).length > 0) && (Object.keys(selectedOrderTimeStamps).length > 0))?(
      <div className={styles.section}>
          <Card
            cardData={selectedOrderDetails}
            title="Selected Order Details"
          />
          <Card
            cardData={selectedOrderTimeStamps}
            title="Selected Order Timestamps"
          />
        </div>
        ):(<div></div>)}
        
        <List rows={mockData.results} submittedDateData={timestamps.results} orderVolumeType={currency} searchId={searchText} sendSelectedOrderDetailAndStamp={getSelectedOrderData} />
      </div>

      <CustomButton 
       primary={false}  
       size="large" 
       label="Click me!"
       onClick={messageComponent}/>
      
      <ToastContainer/>
    </div>
  );
};

export default Dashboard;
