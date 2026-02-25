import React, { useState, useEffect } from "react";
import api from "../api/config";
import Swal from "sweetalert2";
import { MessageSquare, Trash2, Star, Loader2, User, Building } from "lucide-react";

function ReviewMessages() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await api.get("/Review");
      setReviews(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Hubi?",
      text: "Review-gan mar dambe lama soo celin karo!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Haa, Tirtir"
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/Review/${id}`);
        setReviews(reviews.filter(r => r._id !== id));
        Swal.fire("Tirtiray!", "Review-ga waa la tirtiray.", "success");
      } catch (err) {
        Swal.fire("Error", "Cilad ayaa dhacday", "error");
      }
    }
  };

  if (loading) return <div className="p-8 text-center"><Loader2 className="animate-spin text-orange-600 mx-auto" size={48} /></div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Review Management</h1>
        <p className="text-gray-500 font-medium pt-1">Kormeer oo maamul dhammaan fikradaha macaamiisha.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {reviews.map((rev) => (
          <div key={rev._id} className="bg-white p-6 rounded-[2rem] shadow-xl shadow-gray-100 border border-gray-100 hover:border-orange-200 transition-all group flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center font-black">
                    {rev.userId?.fullName?.charAt(0) || "U"}
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900 leading-none">{rev.userId?.fullName}</h4>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Customer</span>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(rev._id)}
                  className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="flex items-center gap-2 mb-3 bg-gray-50 px-3 py-1.5 rounded-xl w-fit">
                <Building size={14} className="text-orange-500" />
                <span className="text-xs font-black text-gray-600 uppercase">{rev.restaurantId?.name || "Deleted Restaurant"}</span>
              </div>

              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className={i < rev.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'} />
                ))}
              </div>

              <p className="text-gray-500 font-medium italic text-sm line-clamp-4">"{rev.comment}"</p>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-50">
              <span className="text-[10px] font-black text-gray-300 uppercase tracking-tighter">
                {new Date(rev.createdAt).toLocaleString()}
              </span>
            </div>
          </div>
        ))}

        {reviews.length === 0 && (
          <div className="col-span-full p-20 text-center space-y-4">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
              <MessageSquare size={32} />
            </div>
            <p className="text-gray-400 font-black text-xl">No reviews found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReviewMessages;