import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  useAllUsersQuery,
  useDeleteUserMutation,
} from "../../Redux/api/userApiSlice";
import { MdDeleteOutline } from "react-icons/md";
function ListEmp() {
  const [users, setUsers] = useState([]);
  const { data, isLoading, error, refetch } = useAllUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  const deleteHandler = async (ID) => {
    try {
      await deleteUser(ID).unwrap();
      toast.success("user Deleted");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error, {
        autoClose: 1000,
      });
    }
  };
  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);
  return (
    <section className="w-full min-h-[92vh]">
      <div className="w-[80%] flex flex-col justify-center mx-auto mt-4 bg-white transition-all rounded-md duration-300 ease-in-out hover:shadow-xl overflow-hidden py-6 gap-3">
        <h1 className="md:text-3xl text-xl font-semibold w-full text-center">
          Employees
        </h1>
        {/* Scrollable table wrapper */}
        <div className="relative w-[90%] mx-auto">
          <div
            className="overflow-y-auto h-[550px] scrollbar-hide"
            style={{ position: "relative" }}
          >
            <table className="w-full text-xs md:text-xl lg:text-2xl table-auto border-collapse">
              <thead className="sticky top-0 bg-teal-600 text-white uppercase">
                <tr>
                  <th className="py-3 md:px-12 px-1 text-center font-semibold rounded-tl-md">
                    Employee Id
                  </th>
                  <th className="py-3 md:px-12 px-1 text-center font-semibold">
                    Name
                  </th>
                  <th className="py-3 md:px-12 px-1 text-center font-semibold">
                    History
                  </th>
                  <th className="py-3 md:px-12 px-1 text-center font-semibold rounded-tr-md">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {users?.map((item, i) => (
                  <tr key={i} className="bg-gray-100">
                    <td className="py-3 md:px-12 px-1 text-center ">
                      {item.employeeId}
                    </td>
                    <td className="py-3 md:px-12 px-1 text-center ">
                      {item.name}
                    </td>
                    <td className="py-3 md:px-12 px-1 text-center ">
                      <Link
                        to={`/user/${item._id}`}
                        className="hover:text-blue-500 text-blue-400 hover:underline"
                      >
                        view
                      </Link>
                    </td>
                    <td className="py-1 md:px-12 px-1 text-center">
                      {item.isAdmin ? (
                        <div></div>
                      ) : (
                        <div
                          className="bg-red-500 md:p-0.5 w-1/4 sm:w-1/10 md:w-1/4 lg:w-1/6 xl:w-1/5 rounded-md mx-auto cursor-pointer"
                          onClick={() => deleteHandler(item._id)}
                        >
                          <MdDeleteOutline
                            size={25}
                            className="mx-auto text-black text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl max-w-full max-h-full"
                          />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ListEmp;
