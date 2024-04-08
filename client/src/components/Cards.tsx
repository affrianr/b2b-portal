import { cardData } from "../pages/Dashboard";

interface Props {
  data: cardData;
}

export default function Cards({ data }: Props) {
  return (
    <>
      <div className="dashboard-cards">
        <div className="data">
          <span className="title">{data.title}</span>
          <span className="sales">{data.number}</span>
          {data.growth % 2 == 0 ? (
            <>
              <p>
                <span className="growth-up">{data.growth}% </span>
                <span>Last Month</span>
              </p>
            </>
          ) : (
            <>
              <p>
                <span className="growth-down">{data.growth}% </span>
                <span>Last month</span>
              </p>
            </>
          )}
        </div>
        <div className="chart">
          {data.growth % 2 == 0 ? (
            <i
              className="bx bx-trending-up"
              style={{ color: "green", fontSize: 50 }}
            ></i>
          ) : (
            <i
              className="bx bx-trending-down"
              style={{ color: "red", fontSize: 50 }}
            ></i>
          )}
        </div>
      </div>
    </>
  );
}
