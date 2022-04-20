import Home from "./routes/home/home"
import ManageTasks from "./routes/manage-tasks/manageTasks"
import Stats from "./routes/stats/stats"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from "react";
import store from './redux/store';
import { getClientId, fetchTodos } from './redux/reducers/todosSlice';

interface MainRouterProps {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}
function MainRouter(props: MainRouterProps) {
  useEffect(() => {
    props.setLoggedIn(true);
    (async () => {
      await store.dispatch(getClientId as any);
      await store.dispatch(fetchTodos as any);
    })();

    return () => {
      props.setLoggedIn(false);
    }
  })

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manage-tasks" element={<ManageTasks />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </Router>
  );
}

export default MainRouter;
