import { useRef, useState } from "react";

const CATEGORIES = [
  "Education",
  "Healthcare",
  "Economic Development",
  "Water & Sanitation",
];

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const emptyForm = {
  id: null,
  title: "",
  slug: "",
  category: CATEGORIES[0],
  excerpt: "",
  body: "",
  image: "",
  is_published: true,
};

// --- Inline icon components (replace lucide-react) ---
const NewspaperIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
    <path d="M18 14h-8" /><path d="M15 18h-5" /><path d="M10 6h8v4h-8V6Z" />
  </svg>
);
const PlusIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);
const PencilIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z" />
  </svg>
);
const TrashIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14Z" />
    <path d="M10 11v6M14 11v6" />
  </svg>
);
const ImagePlaceholderIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="9" cy="9" r="2" />
    <path d="m21 15-5-5L5 21" />
  </svg>
);
const CloseIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);
const UploadIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <path d="M17 8l-5-5-5 5" />
    <path d="M12 3v12" />
  </svg>
);
const SaveIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z" />
    <path d="M17 21v-8H7v8M7 3v5h8" />
  </svg>
);
// -------------------------------------------------------

// Small reusable iOS-style toggle switch
const ToggleSwitch = ({ checked, onChange }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors shrink-0 ${
      checked ? "bg-emerald-500" : "bg-slate-300"
    }`}
  >
    <span
      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
        checked ? "translate-x-6" : "translate-x-1"
      }`}
    />
  </button>
);

export default function New() {
  const [articles, setArticles] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [slugTouched, setSlugTouched] = useState(false);
  const [imageError, setImageError] = useState("");
  const fileInputRef = useRef(null);

  const openAddModal = () => {
    setForm(emptyForm);
    setSlugTouched(false);
    setImageError("");
    setModalOpen(true);
  };

  const openEditModal = (article) => {
    setForm(article);
    setSlugTouched(true);
    setImageError("");
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleTitleChange = (value) => {
    setForm((f) => ({
      ...f,
      title: value,
      slug: slugTouched ? f.slug : slugify(value),
    }));
  };

  // --- Image upload handling ---
  const MAX_IMAGE_BYTES = 2 * 1024 * 1024; // 2MB

  const handleImageFile = (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setImageError("Please choose an image file (PNG, JPG, WEBP).");
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setImageError("Image is too large. Max size is 2MB.");
      return;
    }

    setImageError("");
    const reader = new FileReader();
    reader.onload = () => {
      setForm((f) => ({ ...f, image: reader.result }));
    };
    reader.onerror = () => {
      setImageError("Couldn't read that file. Please try again.");
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files && e.target.files[0];
    handleImageFile(file);
    e.target.value = "";
  };

  const handleImageDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    handleImageFile(file);
  };

  const removeImage = () => {
    setForm((f) => ({ ...f, image: "" }));
    setImageError("");
  };
  // -------------------------------

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.excerpt) return;

    if (form.id) {
      setArticles((prev) =>
        prev.map((a) => (a.id === form.id ? { ...form } : a))
      );
    } else {
      setArticles((prev) => [
        ...prev,
        { ...form, id: Date.now() },
      ]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
  };

  const togglePublished = (id) => {
    setArticles((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, is_published: !a.is_published } : a
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Page header card */}
        <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
              <NewspaperIcon className="h-6 w-6 text-emerald-700" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-emerald-800">
                News Management
              </h1>
              <p className="text-sm text-slate-500 mt-0.5">
                Manage news articles, updates, and announcements.
              </p>
            </div>
          </div>

          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2.5 rounded-lg shadow-sm transition-colors"
          >
            <PlusIcon className="h-4 w-4" />
            Add News
          </button>
        </div>

        {/* Table card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Green header */}
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-5 sm:px-6 py-5 flex items-center justify-between flex-wrap gap-3">
            <div>
              <h2 className="text-white text-lg font-bold">News Articles</h2>
              <p className="text-emerald-100 text-sm mt-0.5">
                Manage news articles and announcements
              </p>
            </div>
            <span className="bg-emerald-800/40 border border-emerald-300/30 text-emerald-50 text-xs font-semibold tracking-wide px-3 py-1.5 rounded-full uppercase">
              {articles.length} {articles.length === 1 ? "record" : "records"}
            </span>
          </div>

          {/* Column headers */}
          <div className="hidden md:grid grid-cols-[90px_1.4fr_1fr_2fr_0.8fr_100px] gap-4 px-6 py-3 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wide">
            <span>Image</span>
            <span>Title</span>
            <span>Category</span>
            <span>Description</span>
           
            <span className="text-right">Actions</span>
          </div>

          {/* Rows */}
          {articles.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-20 px-6">
              <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center mb-5">
                <ImagePlaceholderIcon className="h-7 w-7 text-slate-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-1.5">
                No Articles Found
              </h3>
              <p className="text-sm text-slate-500">
                Click the "Add News" button to create your first article.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {articles.map((article) => (
                <div
                  key={article.id}
                  className="grid grid-cols-1 md:grid-cols-[90px_1.4fr_1fr_2fr_0.8fr_100px] gap-3 md:gap-4 px-6 py-4 items-center hover:bg-slate-50 transition-colors"
                >
                  <div className="h-14 w-14 rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center">
                    {article.image ? (
                      <img
                        src={article.image}
                        alt={article.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <ImagePlaceholderIcon className="h-5 w-5 text-slate-400" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="font-semibold text-slate-800 truncate">
                      {article.title}
                    </p>
                    <p className="text-xs text-slate-400 truncate">
                      /{article.slug}
                    </p>
                  </div>

                  <div>
                    <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700">
                      {article.category}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 line-clamp-2">
                    {article.excerpt}
                  </p>

                  <button
                    onClick={() => togglePublished(article.id)}
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full w-fit transition-colors ${
                      article.is_published
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                    }`}
                  >
                    {article.is_published ? "Published" : "Draft"}
                  </button>

                  <div className="flex items-center gap-2 md:justify-end">
                    <button
                      onClick={() => openEditModal(article)}
                      className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-emerald-700 transition-colors"
                      aria-label="Edit article"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(article.id)}
                      className="p-2 rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                      aria-label="Delete article"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add / Edit modal — restyled to match reference design */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Green header banner */}
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 py-5 flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center gap-3.5">
                <div className="h-11 w-11 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                  <NewspaperIcon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white text-lg font-bold leading-tight">
                    {form.id ? "Edit Article" : "New Article"}
                  </h3>
                  <p className="text-emerald-50 text-sm">
                    Add or update news article information
                  </p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="p-1.5 rounded-lg text-white/80 hover:bg-white/15 hover:text-white transition-colors"
                aria-label="Close"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="px-6 py-6 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6">
                {/* Left column: image upload */}
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                    Article Image
                  </label>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />

                  <div className="bg-slate-50 rounded-xl p-4 flex flex-col items-center">
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={handleImageDrop}
                      className="h-40 w-40 rounded-xl border-2 border-slate-800/80 flex flex-col items-center justify-center gap-2 cursor-pointer overflow-hidden bg-white hover:border-emerald-500 transition-colors"
                    >
                      {form.image ? (
                        <img
                          src={form.image}
                          alt="Selected"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <>
                          <UploadIcon className="h-7 w-7 text-slate-400" />
                          <span className="text-sm text-slate-500 font-medium">
                            No Image
                          </span>
                        </>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="mt-4 inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-sm transition-colors w-full justify-center"
                    >
                      <UploadIcon className="h-4 w-4" />
                      Choose Image
                    </button>

                    {form.image && (
                      <button
                        type="button"
                        onClick={removeImage}
                        className="mt-2 text-xs font-semibold text-red-600 hover:text-red-700"
                      >
                        Remove image
                      </button>
                    )}

                    <p className="mt-2 text-xs text-slate-400 text-center">
                      PNG, JPG, WEBP (Max 2MB)
                    </p>
                    {imageError && (
                      <p className="mt-1.5 text-xs font-medium text-red-600 text-center">
                        {imageError}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right column: fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                      Article Title
                    </label>
                    <input
                      type="text"
                      required
                      value={form.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 focus:outline-none"
                      placeholder="Enter article title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                      Slug
                    </label>
                    <input
                      type="text"
                      required
                      value={form.slug}
                      onChange={(e) => {
                        setSlugTouched(true);
                        setForm((f) => ({ ...f, slug: e.target.value }));
                      }}
                      className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm font-mono focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 focus:outline-none"
                      placeholder="new-education-center-opens"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                      Category
                    </label>
                    <select
                      value={form.category}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, category: e.target.value }))
                      }
                      className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 focus:outline-none"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  
                </div>
              </div>

              {/* Full-width fields below the two columns */}
              <div className="px-6 pb-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                    Excerpt
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={form.excerpt}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, excerpt: e.target.value }))
                    }
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 focus:outline-none resize-none"
                    placeholder="Short summary shown on the news cards"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                    Body
                  </label>
                  <textarea
                    rows={4}
                    value={form.body}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, body: e.target.value }))
                    }
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 focus:outline-none resize-none"
                    placeholder="Full article content shown in the modal / detail view"
                  />
                </div>
              </div>

              {/* Footer bar, matching reference: note left, buttons right */}
              <div className="border-t border-slate-100 px-6 py-4 flex items-center justify-between flex-wrap gap-3">
                <p className="text-sm text-slate-500">
                  {form.id
                    ? "Editing an existing article."
                    : "Create a new article."}
                </p>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-5 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-500 text-white font-semibold shadow-sm transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-sm transition-colors"
                  >
                    <SaveIcon className="h-4 w-4" />
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}