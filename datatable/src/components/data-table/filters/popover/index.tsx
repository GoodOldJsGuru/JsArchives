import React, { useState, FunctionComponent, useEffect } from 'react';
import style from './index.module.css';

interface PopOverFilterInterface {
  // show: boolean;
}
const PopOverFilter: FunctionComponent<PopOverFilterInterface> = ({ children }) => {
  const [show, setShow] = useState(false);
  const [loaded, setLoaded] = useState(show);
  useEffect(() => {
    if (loaded) {
      return;
    }
    if (!show) {
      return;
    }
    setLoaded(show);
  }, [show, loaded]);
  
  return <>
  <button className='dropdown-trigger btn' 
  type="button" onClick={() => setShow(!show)}>Filter</button>

  <div className={`${style.root} ${show ? style.show : ''}`}>
    {loaded && children}
  </div></>;
};

export default PopOverFilter;
