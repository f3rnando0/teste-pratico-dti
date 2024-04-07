import { ReactComponent as Loader } from "../../assets/icons/loader.svg";
import "./submitButton.sass";

type ButtonProps = {
  onSubmit: () => void;
  text: string;
  loading: boolean;
  disabled: boolean;
};

export default function Button({
  onSubmit,
  text,
  loading,
  disabled,
}: ButtonProps) {
  return (
    <button onClick={onSubmit} disabled={disabled}>
      {!loading ? text : <Loader className="spinner" />}
    </button>
  );
}
