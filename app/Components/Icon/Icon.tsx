import React, { useState } from 'react';

type Props = {
  name: string;
  height?: string;
  width?: string;
  isActive: boolean;
  onClick: () => void; 
};

const Icon = ({ name, height, width, isActive, onClick }: Props) => {
  const iconSrc = isActive ? `/icons/${name}Active.svg` : `/icons/${name}.svg`;
  return <img src={iconSrc} height={height} width={width} alt={name} onClick={onClick} />;
};

export default Icon;

