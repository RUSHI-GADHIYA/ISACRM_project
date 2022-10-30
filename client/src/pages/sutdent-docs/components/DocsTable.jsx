import React from "react";
import DocsRow from "./DocsRow";


const DocsTable = ({ docs }) => {
    return <div className="w-full overflow-auto mt-4 bg-white rounded-md">
        {/* START TABLE COMPONENT */}
        <table className="w-full">
            <thead className="rounded-md bg-stone-300 font-bold ">
                <tr className="">
                    <th className="py-3 pl-6 pr-4 text-left rounded-tl-lg w-1/4">
                        Document Name
                    </th>
                    <th className="py-3 pl-2 pr-4 text-left w-1/4">Category Type</th>
                    <th className="py-3 pl-2 pr-4 text-left w-1/5">Uploaded Date</th>
                    <th className="py-3 pl-2 pr-4 text-left rounded-tr-lg w-1/4"> </th>
                </tr>
            </thead>
            <tbody>
                {docs && docs.length ? (
                    docs.map((data, index) => {
                        return <DocsRow _id={data._id} originalName={data.originalName} category={data.category} updated={data.updated} key={index}></DocsRow>
                    })
                ) : null}
            </tbody>
        </table>
    </div >;
}

export default DocsTable;