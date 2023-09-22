import { useState, useEffect } from "react";
import BackButton from "../component/BackButton";
import Spinner from "../component/spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const gifUrl =
  "https://i.pinimg.com/originals/ba/08/bb/ba08bb88b175aa7d5065f61db78affca.gif";

const EditBook = () => {
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    publishYear: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://booklibb.onrender.com/books/${id}`)
      .then((response) => {
        const { title, author, publishYear } = response.data;
        setBookData({ title, author, publishYear });
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  }, [id]);

  const handleEditBook = () => {
    setLoading(true);
    axios
      .put(`https://booklibb.onrender.com/books/${id}`, bookData)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Edited successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookData({
      ...bookData,
      [name]: value,
    });
  };

  return (
    <div className="p-4 flex flex-col md:flex-row">
      <div className="md:w-1/2 md:pr-4">
        <div className="flex justify-between">
          <BackButton />
          <h1 className="text-3xl">Edit Book</h1>
        </div>

        {loading ? <Spinner /> : ""}
        <div className="mt-3">
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Title</label>
            <input
              type="text"
              name="title"
              value={bookData.title || ""}
              onChange={handleInputChange}
              className="border-2 border-gray-500 px-4 w-full"
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Author</label>
            <input
              type="text"
              name="author"
              value={bookData.author || ""}
              onChange={handleInputChange}
              className="border-2 border-gray-500 px-4 w-full"
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Publish Year</label>
            <input
              type="number"
              name="publishYear"
              value={bookData.publishYear || ""}
              onChange={handleInputChange}
              className="border-2 border-gray-500 px-4 w-full"
            />
          </div>
          <button
            className="p-2 mt-4 rounded-md bg-sky-800 w-full text-white"
            onClick={handleEditBook}
          >
            Save
          </button>
        </div>
      </div>
      <div className="md:w-5/12 flex justify-center items-center mt-4 md:mt-16">
        <img
          src={gifUrl}
          alt="Right-side GIF"
          className="max-h-full rounded-2xl"
        />
      </div>
    </div>
  );
};

export default EditBook;
