import { ReactComponent as Calendar } from "../../assets/icons/calendar.svg";
import { ReactComponent as Left } from "../../assets/icons/left.svg";
import LembreteContainer from "../../components/lembreteContainer/lembreteContainer";
import LembreteList from "../../components/lembreteList/lembreteList";

import "./dashboard.sass";

const Dashboard = () => {
  return (
    <>
      <header>
        <div className="title-wrapper">
          <div className="container">
            <Calendar height={32} width={32} />
            <span className="title">Lembretes</span>
          </div>
          <div className="btn">
            <button className="leaveBtn">
              <Left height={22} width={22} />
            </button>
          </div>
        </div>
      </header>
      <div>
        <div className="lembrete-wrapper">
          <LembreteContainer />
          <LembreteList />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
