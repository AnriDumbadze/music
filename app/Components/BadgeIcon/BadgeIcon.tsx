type Props = {
    src: string;
    name: string;
    height?: string;
    width?: string;
    isActive: boolean;
    onClick: () => void;
  };
  
  const BadgeIcon = ({ src, name, height, width, isActive, onClick }: Props) => {
    return (
      <img
        src={src}
        height={height}
        width={width}   
        alt={name}
        onClick={onClick} 
        style={{ cursor: "pointer"  }} 
      />
    );
  };
  
  export default BadgeIcon;
  