import React, { FunctionComponent, useEffect, useRef } from 'react';
import M from 'materialize-css';

interface IHash {
  [details: string]: string;
}
interface AutocompleteInterface {
  data: IHash;
  onChange: (selectedText: string) => void
}

let intanceNumber = 1;

const Autocomplete: FunctionComponent<AutocompleteInterface> = ({ data, onChange }) => {
  const instanceId = useRef(`autocomplete-${intanceNumber++}`);
  const inputRef = useRef<HTMLInputElement>(null);
  const materialIntance = useRef<M.Autocomplete>();


  useEffect(() => {
    const elem = inputRef.current;
    const options: Partial<M.AutocompleteOptions> = {
      data: data,
      onAutocomplete: (selectedText) => {
        console.log('comp:', selectedText)
        onChange(selectedText)
      }
    };

    if (!materialIntance.current) {
      console.log('init autocomplete')
      materialIntance.current = M.Autocomplete.init(elem as Element, options);
    }

    return () => {
      console.log('destroying autocomplete')
      materialIntance.current && materialIntance.current.destroy();
      materialIntance.current = undefined;
      console.log('destroying autocomplete - done')
    };
  }, [data, onChange]);


  useEffect(() => {
    if (!materialIntance.current) {
      return;
    }

    materialIntance.current.updateData(data);

  }, [data]);


  return <div className="input-field">
    <i className="material-icons prefix">textsms</i>
    <input ref={inputRef} type="text" id={instanceId.current} className="autocomplete" />
    <label htmlFor={instanceId.current}>Autocomplete</label>
  </div>

}

export default Autocomplete;