import React from 'react'
import TableRow from './DocRecord'

function DocTable() {

  const resultFilter = [{ name: "letter.pdf", type: "Study permit Question", date: "03-03-2022" }, { name: "letter.pdf", type: "Study permit Question", date: "03-03-2022" }, { name: "letter.pdf", type: "Study permit Question", date: "03-03-2022" }]

  return (
    <>

      <div className="px-8">
        {/* START TABLE COMPONENT */}
        <table className="w-full ">
          <thead className="rounded-md bg-stone-300 font-bold ">
            <tr className="">
              <th className="py-3 pl-6 pr-4 text-left rounded-tl-lg w-1/4">
                Document Name
              </th>
              <th className="py-3 pl-2 pr-4 text-left w-1/5">Category Type</th>
              <th className="py-3 pl-2 pr-4 text-left w-1/5">Uploaded Date</th>
              {/* <th className="py-3 pl-2 pr-4 text-left "></th> */}
              <th className="py-3 pl-2 pr-4  rounded-tr-lg w-1/5"> </th>
            </tr>
          </thead>
          <tbody>
            {/* {students && students.length ? (  */}
            <TableRow rowsData={resultFilter}></TableRow>
            {/* ) : null} */}
          </tbody>
        </table>
      </div>


    </>
  )
}

export default DocTable