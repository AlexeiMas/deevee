import React from 'react';
import {IoMdSearch} from 'react-icons/io';
import styles from './style.module.scss'

const SearchInput = () => {
  return (
    <div className={styles.searchInputWrapper}>
      <button>
        <IoMdSearch fontSize={20}/>
      </button>
      <input type='text' placeholder={"Search..."} />
    </div>
  );
};

export default SearchInput;
