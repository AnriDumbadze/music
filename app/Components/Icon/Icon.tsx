type Props = {
  src: string;
  height?: string;
  width?: string;
};
const Icon = (props: Props) => {
  return (
    <img src={props.src} height={props.height} width={props.width} alt="" />
  );
};

export default Icon;
