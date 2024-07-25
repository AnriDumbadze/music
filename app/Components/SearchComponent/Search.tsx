
import React, { ChangeEvent, KeyboardEvent, MouseEvent, useState} from 'react';
import styles from "./Seach.module.scss"

interface SearchProps {
  onChange: (query: string) => void;
}

const Search = ({ onChange }: SearchProps) => {
    const [query, setQuery] = useState<string>('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    onChange(newQuery);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setQuery('');
      onChange('');
    }
  };

  const handleIconClick = (event: MouseEvent<HTMLSpanElement>) => {
    setQuery('');
    onChange('');
  };

  return (
    <div className={styles.searchContainer}>
      <span className={styles.icon} onClick={handleIconClick}></span>
    <input className={styles.input} 
        type="text" 
        value={query}
        placeholder="Search" 
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
    />
    </div>
  );
};

export default Search;
