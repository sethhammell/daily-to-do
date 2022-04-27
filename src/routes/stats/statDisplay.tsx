import { Card } from "@mui/material";

interface StatDisplayProps {
  header: string;
  stat: number;
}
function StatDisplay(props: StatDisplayProps) {
  return (
    <div className="stat-card-container">
      <Card>
        <div className="stat-display">
          <div className="text">
            {props.header}
          </div>
          <div className="text stat">
            {props.stat}
          </div>
        </div>
      </Card>
    </div>
  );
}

export default StatDisplay;
