import { useState } from "react";
import Modal from "../modal/modal";
import "./lembreteContainer.sass";
import Calendar from "../calendar/calendar";
import dayjs from "dayjs";
import { z } from "zod";
import { useCreateAnnotationMutation } from "../../lib/features/annotations/annotationApiSlice";
import { ILembreteContainer } from "../../types";
import { useSelector } from "react-redux";
import { getCurrentAccessToken } from "../../lib/features/auth/authSlice";

const LembreteContainer = ({ setLembretes }: ILembreteContainer) => {
  const [openModal, setOpenModal] = useState(false);
  const currentDate = dayjs();
  const [selectDate, setSelectDate] = useState(currentDate);
  const [createAnnotation] = useCreateAnnotationMutation();
  const [name, setName] = useState("");
  const token = useSelector(getCurrentAccessToken);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const schema = z.string().min(1);
    const isValid = schema.safeParse(e.target.value);

    if (!isValid) return;

    setName(e.target.value);
  };

  const handleSubmit = async () => {
    if (dayjs(selectDate).isBefore(dayjs())) return;

    try {
      const payload: any = await createAnnotation({
        name,
        date: selectDate.toISOString(),
        token,
      });

      setLembretes(payload.data.lembretes);
      setOpenModal(false);
    } catch (error) {
      console.error(error);
      return;
    }
  };

  return (
    <div className="lembrete-container">
      <div className="container-titles">
        <span id="con-title">Lista de lembretes</span>
        <button onClick={() => setOpenModal(true)}>Novo</button>
      </div>
      <Modal isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)}>
        <div className="name-input">
          <span className="input-title">Nome</span>
          <input
            className="input"
            placeholder="Nome do lembrete"
            type="text"
            onChange={handleInputChange}
          />
        </div>
        <Calendar selectDate={selectDate} setSelectDate={setSelectDate} />
        <div className="create-btn">
          <button onClick={handleSubmit}>
            Criar lembrete para {dayjs(selectDate).format("DD/MM/YYYY")}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default LembreteContainer;
