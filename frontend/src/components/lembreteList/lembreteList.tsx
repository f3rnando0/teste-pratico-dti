import "./lembreteList.sass";
import { ReactComponent as Notify } from "../../assets/icons/notify.svg";
import { ReactComponent as Clip } from "../../assets/icons/clip.svg";
import { ReactComponent as Pencil } from "../../assets/icons/pencil.svg";
import { ReactComponent as Trash } from "../../assets/icons/trash.svg";
import { UserResponse } from "../../types";
import dayjs from "dayjs";
import {
  useDeleteAnnotationMutation,
  useEditAnnotationMutation,
} from "../../lib/features/annotations/annotationApiSlice";
import { useState } from "react";
import EditModal from "../editModal/editModal";
import Calendar from "../calendar/calendar";
import { z } from "zod";

const LembreteList = ({
  user,
  token,
  lembretes,
  setLembretes,
}: UserResponse) => {
  const [deleteAnnotation] = useDeleteAnnotationMutation();
  const [editAnnotation] = useEditAnnotationMutation();
  const [openModal, setOpenModal] = useState(false);
  const [openedModalInfo, setOpenModalInfo] = useState({
    name: "",
    id: "",
    date: "",
  });
  const currentDate = dayjs();
  const [selectDate, setSelectDate] = useState(currentDate);

  const handleDelete = async (id: string) => {
    try {
      const payload: any = await deleteAnnotation({ id, token });

      setLembretes(payload.data.lembretes);
    } catch (error) {
      console.error(error);
      return;
    }
  };

  const handleEdit = async () => {
    try {
      const { id, name } = openedModalInfo;

      const nameSchema = z.string().min(1);
      const isValid = nameSchema.safeParse(name);

      if (!isValid.success) return;
      if (dayjs(selectDate).isBefore(dayjs())) return;

      const payload: any = await editAnnotation({
        id,
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
    <div>
      {Object.values(
        Object.entries(
          lembretes.reduce((acc: any, item) => {
            if (!acc[item.annotationDate]) {
              acc[item.annotationDate] = [];
            }
            acc[item.annotationDate].push(item);
            return acc;
          }, {})
        )
          .sort(
            ([dateA], [dateB]) =>
              new Date(dateA).getTime() - new Date(dateB).getTime()
          )
          .map(([date, group]: [string, any]) => (
            <div className="divider">
              <div key={date} className="annotation-wrapper">
                <div className="annotation-date">
                  <Notify height={24} width={24} />
                  <span className="date">
                    {dayjs(date).format("DD/MM/YYYY")}
                  </span>
                </div>
                {group.map((item: any) => (
                  <div key={item.annotationId}>
                    <div className="annotation">
                      <Clip height={24} width={24} />
                      <span className="annotation-text">
                        {item.annotationName}
                      </span>
                      <div className="buttons">
                        <button
                          id="edit"
                          onClick={() => {
                            setOpenModal(true);
                            setOpenModalInfo({
                              name: item.annotationName,
                              id: item.annotationId,
                              date: selectDate.toString(),
                            });
                            setSelectDate(dayjs(item.annotationDate));
                          }}
                        >
                          <Pencil height={20} width={20} />
                        </button>
                        <button id="delete">
                          <Trash
                            height={20}
                            width={20}
                            onClick={() => handleDelete(item.annotationId)}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <EditModal
                  isOpen={openModal}
                  setModalOpen={() => setOpenModal(!openModal)}
                >
                  <div className="name-input">
                    <span className="input-title">Nome</span>
                    <input
                      className="input"
                      placeholder="Nome do lembrete"
                      type="text"
                      defaultValue={openedModalInfo.name}
                      onChange={(e) => {
                        e.preventDefault();
                        setOpenModalInfo({
                          name: e.target.value,
                          id: openedModalInfo.id,
                          date: selectDate.toISOString(),
                        });
                      }}
                    />
                  </div>
                  <Calendar
                    selectDate={selectDate}
                    setSelectDate={setSelectDate}
                  />
                  <div className="create-btn">
                    <button onClick={() => handleEdit()}>
                      Criar lembrete para{" "}
                      {dayjs(selectDate).format("DD/MM/YYYY")}
                    </button>
                  </div>
                </EditModal>
              </div>
            </div>
          ))
      )}
    </div>
  );
};

export default LembreteList;
