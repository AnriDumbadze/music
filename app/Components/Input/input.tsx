import React, { useState } from 'react';
import styles from './input.module.scss'

interface Props {
  placeholder?: string;
  type: string;
  mode: 'white' | 'black';
  state: 'neutral' | 'disabled' | 'success' | 'warning' | 'error';
  oncahnge?:() => void;
}

export default function Input(props: Props) {
  const { mode, state, type, placeholder } = props;

  const inputClassName = `${styles.input} ${styles[mode]} ${styles[state]}`;

  return (
    <div>
    <input
    onChange={props.oncahnge}
      type={type}
      placeholder={placeholder}
      className={inputClassName}
      disabled={state === 'disabled'}
    />
    </div>
  );
}