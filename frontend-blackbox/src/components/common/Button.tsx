interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => {
  return (
    <div
      className={`flex justify-center items-center w-60 h-[39.6px] font-ibm-plex-mono cursor-pointer font-medium ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Button;
