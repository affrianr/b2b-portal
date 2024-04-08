import { Line, Radar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import { useEffect, useState } from "react";
import Cards from "../components/Cards";

const data = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "First dataset",
      data: [33, 53, 85, 41, 44, 65, 33, 53, 85, 41, 44, 65],
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)",
      lineTension: 0.2,
    },
    {
      label: "Second dataset",
      data: [33, 25, 35, 51, 54, 76, 33, 25, 35, 51, 54, 76],
      fill: false,
      borderColor: "#742774",
    },
  ],
};

const cardTitle: string[] = [
  "Vendors/Suppliers",
  "Products",
  "Sales Orders",
  "Customers/Dealers",
  "Products SKU",
  "Purchase Orders",
  "Inventory Levels",
  "Returns/Refunds",
  "Shipping/Delivery",
];

export interface cardData {
  title: string;
  number: number;
  growth: number;
}
export default function Dashboard(): JSX.Element {
  const [cardDataArr, setCardDataArr] = useState<cardData[]>([]);
  function generateCardData() {
    let result: cardData[] = [];
    for (let i = 0; i < 8; i++) {
      // generating random sales numbers between 1000 - 5000
      const sales = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
      const growthPercentage = Math.floor(Math.random() * 100);
      let tempObj: cardData = {
        title: cardTitle[i],
        number: sales,
        growth: growthPercentage,
      };

      result.push(tempObj);
    }
    setCardDataArr(result);
  }

  useEffect(() => {
    generateCardData();
  }, []);
  return (
    <>
      <div className="main-dashboard">
        <div className="header">
          <h1>Dashboard</h1>
          <span>These company has dashboard</span>
        </div>
        <div className="time">
          <span>12 Month</span>
          <span>6 Month</span>
          <span>3 Month</span>
          <span>30 Day</span>
          <span>7 Day</span>
          <span>24 Hours</span>
        </div>
        <div className="cards">
          {cardDataArr.map((card, index) => (
            <div className="mini-chart">
              <Cards data={card} />
            </div>
          ))}
        </div>
      </div>
      <div className="second-dashboard">
        <div className="large">
          <Line datasetIdKey="id" data={data} />
        </div>
        <div className="small">
          <Pie data={data} />
        </div>
        <div className="small">
          <Radar data={data} />
        </div>
      </div>
    </>
  );
}
