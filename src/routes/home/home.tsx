import TasksTable from "../../tasks/table";
import Sidenav from "../../sidenav/sidenav";
import "./home.css";

function Home() {
  return (
    <div className="home">
      <Sidenav />
      <div className="tasks">
        <TasksTable />
      </div>
    </div>
  );
}

export default Home;
