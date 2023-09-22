import { useState } from "react";
import BackButton from "../component/BackButton";
import Spinner from "../component/spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

// Import the GIF URL
const gifUrl =
  "https://i.pinimg.com/originals/79/73/b9/7973b99e6291c965d8a05ecd235afde9.gif";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`https://booklibb.onrender.com/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Deleted successfully", { variant: "success" });
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
      <div className="">
        <div className="flex ">
          <BackButton />

          <h1 className="text-3xl md:ml-52">Delete Book</h1>
        </div>
        {loading ? <Spinner /> : ""}
        <div className="md:flex">
          <div className="flex mt-10">
            <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-full  p-8 mx-auto">
              <h3 className="text-2xl">
                Are you sure you want to delete this book?
              </h3>

              <button
                className="p-4 bg-red-600 text-white m-8 w-full"
                onClick={handleDeleteBook}
              >
                Yes, Delete it
              </button>
            </div>
          </div>
          <div>
            <img
              src={gifUrl}
              alt="Right-side GIF"
              className="max-h-full mt-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteBook;
