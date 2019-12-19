import React, { useState, useEffect, FunctionComponent } from 'react';
import Autocomplete from '../../../autocomplete';
// import style from './index.module.css';

interface AutocompleteFilterInterface {
  onChange: (selectedText: string) => void;
  fetchUrl: string;
}

const AutocompleteFilter: FunctionComponent<AutocompleteFilterInterface> = ({onChange, fetchUrl}) => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(fetchUrl).then(r=>r.json());
      
      setData(result);
    }

    fetchData();
  },[fetchUrl]);

  return (<div >
    <Autocomplete data={data} onChange={onChange}/>
  </div>);
}

export default AutocompleteFilter;
