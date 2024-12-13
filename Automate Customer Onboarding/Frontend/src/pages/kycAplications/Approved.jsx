import React, { useEffect, useState } from "react";
import { Loader, TabView } from "../../components";
import { Link } from "react-router-dom";
import { useStatusKycMutation } from "../../Redux/api/kycApiSlice";
import { toast } from "react-toastify";

function Rejected() {
  const [kyc, setKyc] = useState([]);
  const [statusKyc, { data, error, isLoading }] = useStatusKycMutation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await statusKyc({ status: "Approved" }).unwrap();
        setKyc(response);
      } catch (err) {
        toast.error(err?.message || "Something went wrong", {
          autoClose: 1000,
        });
      }
    };

    fetchData();
  }, [statusKyc]);

  if (isLoading) {
    return <Loader />; // Show loading while fetching data
  }
  return (
    <div>
      <div className="py-2 mt-3 flex justify-center items-center">
        <div className="mx-auto overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="text-xs md:text-xl lg:text-2xl table-auto border border-gray-300 border-collapse: separate; width: 100%">
            <thead className="bg-purple-600 text-white uppercase">
              <tr>
                <th className="py-4 md:px-12 px-1 text-center">
                  Application ID
                </th>
                <th className="py-4 md:px-12 px-1 text-center">Name</th>
                <th className="py-4 md:px-12 px-1 text-center">Apply Date</th>
                <th className="py-4 md:px-12 px-1 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {kyc.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-gray-500">
                    <div>
                      <p className="text-lg md:text-xl font-semibold text-gray-700">
                        No Approved Applications Found
                      </p>
                      <p className="mt-2 text-sm text-gray-500">
                        There are currently no Approved applications. Please
                        check back later.
                      </p>
                      <div className="mt-4">
                        {/* Optional Action Button */}
                        <button
                          onClick={() => window.location.reload()} // Reload the page to fetch data again
                          className="py-2 px-4 mt-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
                        >
                          Refresh
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                kyc.map((data) => (
                  <tr className="hover:bg-gray-50" key={data._id}>
                    <td className="py-4 md:px-12 px-1 text-center">
                      {data._id}
                    </td>
                    <td className="py-4 md:px-12 px-1 text-center">
                      {data.name}
                    </td>
                    <td className="py-4 md:px-12 px-1 text-center">
                      {new Date(data.createdAt).toLocaleDateString("en-GB")}
                    </td>
                    <td className="py-4 px-2 text-center">
                      <Link
                        to={`/adminDocument/${data._id}`} // Assuming _id is the correct field
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Rejected;
