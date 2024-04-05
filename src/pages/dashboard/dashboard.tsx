import { ReactComponent as User } from "../../assets/icons/user.svg";
import "./dashboard.sass";

const Dashboard = () => {
  return (
    <header>
        <span className="title">Lembretes</span>
        <User />
    </header>
  );
};

export default Dashboard;
