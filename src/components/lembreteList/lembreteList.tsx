import "./lembreteList.sass";
import { ReactComponent as Notify } from "../../assets/icons/notify.svg";
import { ReactComponent as Clip } from "../../assets/icons/clip.svg";
import { ReactComponent as Pencil } from "../../assets/icons/pencil.svg";
import { ReactComponent as Trash } from "../../assets/icons/trash.svg";

const LembreteList = () => {
  return (
    <div>
      <div className="annotation-wrapper">
        <div className="annotation-date">
          <Notify height={24} width={24} />
          <span className="date">06/04/2024</span>
        </div>
        <div>
          <div className="annotation">
            <Clip height={24} width={24} />
            <span className="annotation-text">Teste de anotação</span>
            <div className="buttons">
              <button id="edit">
                <Pencil height={20} width={20} />
              </button>
              <button id="delete">
                <Trash height={20} width={20} />
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className="annotation">
            <Clip height={24} width={24} />
            <span className="annotation-text">Teste de anotação</span>
            <div className="buttons">
              <button id="edit">
                <Pencil height={20} width={20} />
              </button>
              <button id="delete">
                <Trash height={20} width={20} />
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className="annotation">
            <Clip height={24} width={24} />
            <span className="annotation-text">Teste de anotação</span>
            <div className="buttons">
              <button id="edit">
                <Pencil height={20} width={20} />
              </button>
              <button id="delete">
                <Trash height={20} width={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LembreteList;
