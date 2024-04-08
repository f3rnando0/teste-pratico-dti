import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Calendar } from "../../assets/icons/calendar.svg";
import { ReactComponent as Left } from "../../assets/icons/left.svg";
import LembreteContainer from "../../components/lembreteContainer/lembreteContainer";
import LembreteList from "../../components/lembreteList/lembreteList";
import "./dashboard.sass";
import {
  getCurrentAccessToken,
  getCurrentUser,
  logOut,
} from "../../lib/features/auth/authSlice";
import { useState } from "react";

const Dashboard = () => {
  const user = useSelector(getCurrentUser);
  const token = useSelector(getCurrentAccessToken);
  const dispatch = useDispatch();

  const [lembretes, setLembretes] = useState(user.lembretes);

  const handleLogOut = () => {
    dispatch(logOut());
  }

  return (
    <>
      <header>
        <div className="title-wrapper">
          <div className="container">
            <Calendar height={32} width={32} />
            <span className="title">Lembretes</span>
          </div>
          <div className="btn">
            <button className="leaveBtn" onClick={() => handleLogOut()}>
              <Left height={22} width={22} />
            </button>
          </div>
        </div>
      </header>
      <div>
        <div className="lembrete-wrapper">
          <LembreteContainer setLembretes={setLembretes}/>
          <LembreteList user={user} token={token} lembretes={lembretes} setLembretes={setLembretes}/>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
