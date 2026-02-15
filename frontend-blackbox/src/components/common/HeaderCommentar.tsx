interface HeaderCommentarProps {
  text: string;
}

const HeaderCommentar = ({ text }: HeaderCommentarProps) => {
  return (
    <p className="text-secondary text-[.7rem] opacity-75">{`<!--   ${text}   -->`}</p>
  );
};

export default HeaderCommentar;
