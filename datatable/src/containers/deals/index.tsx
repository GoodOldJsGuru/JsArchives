import React, { useState, useCallback, useEffect } from 'react';
import 'materialize-css/dist/css/materialize.css'
import Table from '../../components/data-table';
import AutocompleteFilter from '../../components/data-table/filters/autocomplete';

function pad(nOg: number, width: number, z: string = '') {
  z = z || '0';
  const n = nOg + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function Deals() {
  const [data, setData] = useState<any[]>([]);
  const [nameFilter, setNameFilter] = useState<string>();
  const [itemFilter, setItemFilter] = useState<string>();
  console.log('render namefilter:', nameFilter);
  console.log('render itemfilter:', itemFilter);

  //filter and sort criteria
  const fetchData = useCallback(async (pageNumber: number) => {
    console.log('fetch filter:', nameFilter, 'page: ', pageNumber);
    const result: any[] = await fetch('/mocks/deals.json')
      .then(r => r.json())
      //name filter
      .then(r => {
        if (!nameFilter){
          console.log('no name filter', r);
          return r;
        }

        const filtered = r.filter( (i: any) => {
          // console.log(`looking for '${nameFilter}' in "${i.name}"`);
          return i.name.indexOf(nameFilter) !== -1;
        });

        console.log('found name', filtered);

        return filtered;
      })
    //item filter
    .then(r => {
      if (!itemFilter){
        console.log('no item filter', r);
        return r;
      }

      const filtered = r.filter( (i: any) => {
        // console.log(`looking for '${nameFilter}' in "${i.name}"`);
        return i.item.indexOf(itemFilter) !== -1;
      });

      console.log('found item', filtered);

      return filtered;
    });

    const mutated: any[] = result.map( (r, i) => {r.name += (pad(i+1, 5)); return r;});

    //TODO: this must be intelligent enough to know at which
    //position to append the incomming data
    setData(prevData => {
      if (pageNumber === 1) {
        return mutated;
      }
      return prevData.concat(mutated)
    });
  }, [nameFilter, itemFilter]);

  const renderNameFilter = useCallback(() => {
    return <AutocompleteFilter 
    fetchUrl="/mocks/firstnames.json"
    onChange={(selectedText)=> {
      console.log('deals: ', selectedText);
      setNameFilter(selectedText);
    }} />
  }, []);

  const renderItemFilter = useCallback(() => {
    return <AutocompleteFilter 
    fetchUrl="/mocks/items.json"
    onChange={(selectedText)=> {
      console.log('deals: ', selectedText);
      setItemFilter(selectedText);
    }} />
  }, []);
  


  useEffect(() => {
    if (!nameFilter && !itemFilter) {
      return;
    }

    fetchData(1);
  }, [nameFilter, itemFilter, fetchData])


  return (<React.Fragment>
    <br/>
    <br/>
    <br/>
    <br/>
    <div className={`container`} >

      <Table data={data} onDataLoad={fetchData} pageSize={5} 
          renderNameFilter={renderNameFilter}
          renderItemFilter={renderItemFilter}/>
      {/* TODO: since filter and sort is managed outside the data table, 
      theoretically, filter summary can be a separate component */}
    </div>
  </React.Fragment>);
}

export default Deals;
