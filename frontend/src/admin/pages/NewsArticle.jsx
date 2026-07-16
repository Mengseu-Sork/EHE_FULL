import { useEffect, useState } from "react";
import { FaNewspaper, FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";

import api from "../../api/api";

import NewsTable from "../components/news/NewsTable";
import NewsForm from "../components/news/NewsForm";
import NewsView from "../components/news/NewsView";

export default function NewsArticle() {

  const [news, setNews] = useState([]);

  const [loading, setLoading] = useState(true);

  const [editing, setEditing] = useState(null);

  const [viewItem, setViewItem] = useState(null);

  const [showForm, setShowForm] = useState(false);

  const loadData = async () => {

    try {

      setLoading(true);

      const res = await api.get("/news");

      setNews(res.data);

    } catch (error) {

      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Unable to load news.",
      });

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadData();

  }, []);

  const addNews = () => {

    setEditing(null);

    setShowForm(true);

  };

  const editNews = (item) => {

    setEditing(item);

    setShowForm(true);

  };

  const viewNews = (item) => {

    setViewItem(item);

  };

  const closeForm = () => {

    setShowForm(false);

    setEditing(null);

  };

  const closeView = () => {

    setViewItem(null);

  };

  const deleteNews = async (item) => {

    const result = await Swal.fire({
      title: "Delete News?",
      text: `Delete "${item.title}" ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {

      Swal.fire({
        title: "Deleting...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      await api.delete(`/news/${item.id}`);

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "News deleted successfully.",
        timer: 1800,
        showConfirmButton: false,
      });

      loadData();

    } catch (error) {

      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: error.response?.data?.message || "Something went wrong.",
      });

    }

  };

  return (

    <div>

      {/* Header */}

      <div className="mb-4 flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-100 text-green-700">

            <FaNewspaper className="text-2xl" />

          </div>

          <div>

            <h1 className="text-3xl font-bold text-green-800">

              News Management

            </h1>

            <p className="mt-1 text-sm text-gray-500">

              Manage organization news, articles and announcements.

            </p>

          </div>

        </div>

        <button
          onClick={addNews}
          className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-medium text-white shadow-lg transition hover:bg-green-700 hover:shadow-xl"
        >
          <FaPlus />
          Add News
        </button>

      </div>

      {/* Table */}

      <div className="rounded-2xl bg-white shadow">

        <NewsTable
          loading={loading}
          news={news}
          onView={viewNews}
          onEdit={editNews}
          onDelete={deleteNews}
        />

      </div>

      {/* Form */}

      {showForm && (

        <NewsForm
          editing={editing}
          onClose={closeForm}
          onSuccess={() => {
            closeForm();
            loadData();
          }}
        />

      )}

      {/* View */}

      {viewItem && (

        <NewsView
          news={viewItem}
          onClose={closeView}
        />

      )}

    </div>

  );

}