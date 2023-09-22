import { useState } from "react";
import BackButton from "../component/BackButton";
import Spinner from "../component/spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const gifUrl =
  "https://i.pinimg.com/originals/4c/89/60/4c896090b3c0522c8d8cd8866f77891e.gif"; // Replace with the actual URL of your GIF

const CreateBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .post("https://booklibb.onrender.com/books", data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Created successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div className="p-4 flex flex-col md:flex-row">
      <div className="md:w-1/2 md:pr-4">
        <div className="flex justify-between">
          <BackButton />

          <h1 className="text-3xl">Create Book</h1>
        </div>

        {loading ? <Spinner /> : ""}
        <div className="mt-3">
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-2 border-gray-500 px-4 w-full"
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="border-2 border-gray-500 px-4 w-full"
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Publish Year</label>
            <input
              type="number"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              className="border-2 border-gray-500 px-4 w-full"
            />
          </div>
          <button
            className="p-2 mt-4 rounded-md bg-sky-600 w-full text-white"
            onClick={handleSaveBook}
          >
            Save
          </button>
        </div>
      </div>
      <div className="md:w-5/12 flex justify-center items-center mt-4 md:mt-10 md:ml-10">
        <img
          src={gifUrl}
          alt="Right-side GIF"
          className="max-h-full rounded-2xl"
        />
      </div>
    </div>
  );
};

export default CreateBooks;
