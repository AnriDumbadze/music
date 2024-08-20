import React from 'react';
import styles from './input.module.scss';


interface Props {
  placeholder?: string;
  type: string;
  mode: 'white' | 'black';
  state: 'neutral' | 'focused' | 'disabled' | 'success' | 'warning' | 'error';
}

export default function Input(props: Props) {
  const { mode, state, type, placeholder } = props;

  const inputClassName = `${styles.input} ${styles[mode]} ${styles[state]}`;

  return (
    <div>
    <input
      type={type}
      placeholder={placeholder}
      className={inputClassName}
      disabled={state === 'disabled'}
    />
    </div>
  );
}