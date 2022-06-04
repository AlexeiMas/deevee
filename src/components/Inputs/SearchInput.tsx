import React, { useState } from 'react';
import { IoMdSearch } from 'react-icons/io';
import styles from './style.module.scss';

interface ISearchInputProps {
  getRatingItems: (page: number, search?: string) => any;
  setSearch: (search: string) => void;
  search: string;
}
const SearchInput: React.FC<ISearchInputProps> = ({ getRatingItems, setSearch, search }: ISearchInputProps) => {


  const handleChangeSearch = (e: any) => {
    setSearch(e.target.value);
  }

  const handleSearch = (search: string) => {
    getRatingItems(1, search);
  }

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      handleSearch(search);
    }
  }

  return (
    <div className={styles.searchInputWrapper}>
      <button onClick={() => handleSearch(search)}>
        <IoMdSearch fontSize={20} />
      </button>
      <input type='search' placeholder={"Search..."} onKeyDown={handleKeyDown} onChange={handleChangeSearch} />
    </div>
  );
};

export default SearchInput;
