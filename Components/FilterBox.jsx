import React from 'react'

function FilterBox({searchHandler}) {
    return <input type="text" onChange={searchHandler} />;
}

export default FilterBox