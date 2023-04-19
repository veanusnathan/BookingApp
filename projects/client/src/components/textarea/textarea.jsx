import axios from "axios";
import StarRating from "components/star_rating/starRating";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Loader from "components/loader/loader";

function TextArea(props) {
  const getTokenId = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);

  const [_form, setForm] = useState({
    room_id: props?.details?.[0]?.id,
    rating: 0,
    comment: "",
  });

  const handleRatingChange = (value) => {
    console.log(value);
    let newForm = { ..._form };
    newForm.rating = value;
    setForm(newForm);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    let newForm = { ..._form };
    newForm[name] = value;
    setForm(newForm);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true)
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}properties/create-review`,
        {
          room_id: _form?.room_id,
          rating: _form?.rating,
          comment: _form?.comment,
        },
        {
          headers: {
            auth: getTokenId,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      setTimeout(() => {
        toast.success(res?.data?.message)
      }, 3500);

      setTimeout(() => {
        window.location.reload();
      }, 4000)

      setForm({
        room_id: props?.details?.[0]?.id,
        rating: 0,
        comment: "",
      });

    } catch (error) {
      setLoading(false)
      if (
        error.message === "Request failed with status code 400" ||
        error.message === "Request failed with status code 404"
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }finally{
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
  };

  return (
    <>
      {getTokenId && 
      <div className="max-w-2xl ml-5 mb-24">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="rating" className="block text-gray-700 font-bold">
            Rating
          </label>
          <StarRating onRatingChange={handleRatingChange} />
        </div>
        <div className="mb-4 w-full bg-gray-50 rounded-lg border border-gray-200">
          <div className="py-2 px-4 bg-white rounded-b-lg">
            <label htmlFor="comment" className="sr-only">
              Post Comment
            </label>
            <textarea
              id="comment"
              name="comment"
              rows="8"
              className="block px-0 w-full text-sm text-gray-800 bg-white border-0 capitalize focus:ring-0 "
              placeholder="Write Your experience staying at this property..."
              required
              value={_form.comment}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white my-bg-main rounded-lg focus:ring-4 focus:ring-rose-200  hover:bg-rose-800"
          >
            {loading ? <Loader /> : "Leave a Review"}
          </button>
        </div>
      </form>
      <Toaster />
    </div>}
    </>
  );
}

export default TextArea;
