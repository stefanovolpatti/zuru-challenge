// TODO: check accessibility rules for the button

export interface ButtonProps {
  label: string;
  type: "ghost" | "red" | "neutral";
}

const Button = ({ label, type = "ghost" }: ButtonProps) => {
  return (
    <button
      className={`${type === "ghost" ? "btn-ghost" : type === "neutral" ? "btn-neutral" : "btn-red"} w-fit`} // TODO: refactor better 
    >
      {label}
    </button>
  );
};
export default Button;
