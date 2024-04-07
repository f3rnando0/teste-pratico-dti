import { useState } from "react";
import Modal from "../modal/modal";
import "./lembreteContainer.sass";
import Calendar from "../calendar/calendar";
import dayjs from "dayjs";

const LembreteContainer = () => {
  const [openModal, setOpenModal] = useState(false);
  const currentDate = dayjs();
  const [selectDate, setSelectDate] = useState(currentDate);

  return (
    <div className="lembrete-container">
      <div className="container-titles">
        <span id="con-title">Lista de lembretes</span>
        <button onClick={() => setOpenModal(true)}>Novo</button>
      </div>
      <Modal isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)}>
        <div className="name-input">
          <span className="input-title">Nome</span>
          <input className="input" placeholder="Nome do lembrete" type="text" />
        </div>
        <Calendar selectDate={selectDate} setSelectDate={setSelectDate} />
        <div className="create-btn">
          <button>
            Criar lembrete para {dayjs(selectDate).format("DD/MM/YYYY")}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default LembreteContainer;
