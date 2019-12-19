import React, { useState, FunctionComponent, useEffect } from 'react';
import PopOverFilter from './filters/popover';
// import AutocompleteFilter from './filters/autocomplete';
// import style from './index.module.css';

interface DataTableInterface {
  onDataLoad: (pageNumber: number) => void;
  renderNameFilter?: (/*column to render*/) => React.ReactNode;
  renderItemFilter?: (/*column to render*/) => React.ReactNode;
  data: any[];
  pageSize: number;
}

const DataTable: FunctionComponent<DataTableInterface> = ({ data, onDataLoad, pageSize = 5, renderNameFilter, renderItemFilter }) => {
  const dataLength = (data || []).length;
  const totalPages = Math.ceil( dataLength / pageSize);
  const [pageNumber, setPageNumber] = useState(1);

  //call onDataLoad if it detects to load the next set of data
  useEffect(() => {

    //more than the 50% of the total pages
    if (pageNumber >= (totalPages * .5)) {
      console.warn(`pageNumber: ${pageNumber} >= ${totalPages * .5}
      pageNumber: ${pageNumber} >= (${totalPages} * .5)`);
      onDataLoad(pageNumber);
      return;
    }

    console.log(`pageNumber: ${pageNumber} < ${totalPages * .5}
    pageNumber: ${pageNumber} < (${totalPages} * .5)`);

  }, [pageNumber, dataLength, onDataLoad, totalPages]);

  const firstItemIndex = (pageNumber - 1) * pageSize;
  const lastItemIndex = firstItemIndex + pageSize;
  console.log('gettng from ', firstItemIndex, ' to ', lastItemIndex);
  const sortedData = data;
  const paginatedData = sortedData.slice(firstItemIndex, lastItemIndex);
  
  return <table>
  <thead>
    <tr>
        <th>
          Name &nbsp;
        {renderNameFilter && 
        <>
        
        <PopOverFilter>
          {renderNameFilter()}
        </PopOverFilter>
        </>
        }

        </th>
        <th>Item Name &nbsp;
        {renderItemFilter && 
        <>
        
        <PopOverFilter>
          {renderItemFilter()}
        </PopOverFilter>
        </>
        }

        </th>
        <th>Item Price


        </th>
    </tr>
  </thead>

  <tbody>
    {paginatedData.map( (d, index ) => <tr key={`row-` + index} >
    <td>{d.name}</td>
    <td>{d.item}</td>
    <td>${d.price}</td>
    </tr>)}
  </tbody>
  <tfoot>
    <tr>
      <td>
      <button className='btn' type="button" 
      onClick={() => setPageNumber(oldVal => oldVal - 1)}>&lt;</button>

      {pageNumber} / {totalPages} Total: {dataLength}

      <button className='btn' type="button" 
      onClick={() => setPageNumber(oldVal => oldVal + 1)}>&gt;</button>
      </td>
    </tr>
  </tfoot>
</table>
};

export default DataTable;
