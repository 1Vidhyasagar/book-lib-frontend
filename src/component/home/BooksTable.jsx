import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BiUserCircle, BiShow } from "react-icons/bi";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import BookModal from "../BookModel";

const BooksTable = ({ books }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="overflow-x-auto">
      <table className="w-full  border-separate border-spacing-2">
        <thead>
          <tr className="bg-sky-400 text-white">
            <th className="border border-slate-600 rounded-md p-2 md:p-3">
              No
            </th>
            <th className="border border-slate-600 rounded-md p-2 md:p-3">
              Title
            </th>
            <th className=" border border-slate-600 rounded-md p-2 md:p-3  md:table-cell">
              Author
            </th>
            <th className="border border-slate-600 rounded-md p-2 md:p-3  md:table-cell">
              Publish Year
            </th>
            <th className="border border-slate-600 rounded-md p-2 md:p-3">
              Operations
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {books.map((book, index) => (
            <tr key={book._id} className="h-8">
              <td className="border border-slate-700 rounded-md text-center p-2 md:p-3">
                {index + 1}
              </td>
              <td className="border border-slate-700 rounded-md text-center p-2 md:p-3">
                {book.title}
              </td>
              <td className="border border-slate-700 rounded-md text-center p-2 md:p-3  md:table-cell">
                {book.author}
              </td>
              <td className="border border-slate-700 rounded-md text-center p-2 md:p-3  md:table-cell">
                {book.publishYear}
              </td>
              <td className="border border-slate-700 rounded-md text-center p-2">
                <div className="flex justify-center md:justify-center gap-x-2 md:gap-x-4 ">
                  <BiShow
                    className="text-3xl text-blue-800 hover:text-black cursor-pointer"
                    onClick={() => setShowModal(true)}
                  />
                  <Link to={`/books/edit/${book._id}`}>
                    <AiOutlineEdit className="text-2xl text-yellow-600" />
                  </Link>
                  <Link to={`/books/delete/${book._id}`}>
                    <MdOutlineDelete className="text-2xl text-red-600" />
                  </Link>
                </div>
                {showModal && (
                  <BookModal book={book} onClose={() => setShowModal(false)} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksTable;
