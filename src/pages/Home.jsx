import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../component/spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import BooksTable from "../component/home/BooksTable";
import BooksCard from "../component/home/BooksCard";

// Import the GIF URL
const gifBackground =
  "https://i.pinimg.com/originals/6d/a8/b8/6da8b852257a75b7388239cf3736e62f.gif"; // Replace with the actual URL of your GIF

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://booklibb.onrender.com/books")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="relative md:p-4">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-3xl mt-8 md:-mt-5 font-extrabold text-sky-800">
          Book<span className="text-red-600">Lib</span>
        </h1>
        <p className="md:mt-5">
          Your Gateway to Endless Stories! Explore now...
        </p>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl " />
        </Link>
      </div>
      <div className="flex justify-center items-center gap-x-4 md:mt-2">
        <button
          className="bg-sky-600 hover:bg-sky-800 text-white px-3 py-1 md:px-4 md:py-1 rounded-lg"
          onClick={() => setShowType("table")}
        >
          Table
        </button>
        <button
          className="bg-sky-600 hover:bg-sky-800 text-white px-3 py-1 md:px-4 md:py-1 rounded-lg"
          onClick={() => setShowType("card")}
        >
          Card
        </button>
      </div>

      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}

      <img
        src={gifBackground}
        alt="Background GIF"
        className="bottom-0 mx-auto rounded-2xl w-4/12 h-32 md:h-48"
      />
    </div>
  );
};

export default Home;
