import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import api from "../../../api/api";
import {
    VideoCameraIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";

export default function VideoForm({
    open,
    video,
    onClose,
    onSuccess,
}) {

    const [videoFile, setVideoFile] = useState(null);

    const [preview, setPreview] = useState("");

    const [saving, setSaving] = useState(false);

    const storageUrl =
        import.meta.env.VITE_API_URL.replace("/api", "") +
        "/storage";

    useEffect(() => {
        if (!open) return;

        if (video) {
            setPreview(`${storageUrl}/${video.video_file}`);
            setVideoFile(null);
        } else {
            setPreview("");
            setVideoFile(null);
        }
    }, [video, open]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!video && !videoFile) {
            Swal.fire({
                icon: "warning",
                title: "Video Required",
                text: "Please select a video file.",
            });
            return;
        }

        try {
            setSaving(true);

            const formData = new FormData();

            if (videoFile) {
                formData.append("video_file", videoFile);
            }

            if (video) {
                formData.append("_method", "PUT");

                await api.post(`/videos/${video.id}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                Swal.fire({
                    icon: "success",
                    title: "Updated",
                    text: "Video updated successfully.",
                    timer: 1500,
                    showConfirmButton: false,
                });
            } else {
                await api.post("/videos", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                Swal.fire({
                    icon: "success",
                    title: "Uploaded",
                    text: "Video uploaded successfully.",
                    timer: 1500,
                    showConfirmButton: false,
                });
            }

            onSuccess();
        } catch (error) {
            console.error(error);

            Swal.fire({
                icon: "error",
                title: "Error",
                text:
                    error.response?.data?.message ||
                    "Something went wrong.",
            });
        } finally {
            setSaving(false);
        }
    };

    const handleVideo = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setVideoFile(file);

        setPreview(URL.createObjectURL(file));

    };

    const formData = new FormData();

    if (videoFile) {
        formData.append("video_file", videoFile);
    }

    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

            <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl overflow-auto h-[95vh]">

                {/* Header */}

                <div className="relative overflow-hidden bg-gradient-to-r from-green-800 via-green-700 to-green-600 px-8 py-7 text-white">

                    <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>

                    <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-black/10 to-transparent"></div>

                    <div className="relative flex items-center justify-between">

                        <div className="flex items-center gap-5">

                            <div className="rounded-3xl bg-white/20 p-4 backdrop-blur">

                                <VideoCameraIcon className="h-9 w-9" />

                            </div>

                            <div>

                                <h2 className="text-xl font-black">

                                    {video ? "Edit Video" : "Create Video"}

                                </h2>

                                <p className="mt-1 text-green-100 text-sm">

                                    Upload a video to your website.
                                </p>

                            </div>

                        </div>

                        <button
                            onClick={onClose}
                            className="rounded-xl cursor-pointer p-3 transition hover:bg-white/20"
                        >
                            <XMarkIcon className="h-7 w-7" />
                        </button>

                    </div>

                </div>


                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-8 p-6"
                >
                    {/* Upload Video */}

                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

                        <div className="mb-6">

                            <h3 className="text-xl font-bold text-slate-800">
                                Upload Video
                            </h3>

                            <p className="mt-2 text-sm text-slate-500">
                                Select a video file to upload.
                                <br />
                                Supported formats: MP4, MOV, AVI, MKV, WEBM
                            </p>

                        </div>

                        <label className="group flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-green-300 bg-green-50 px-6 py-16 transition-all duration-300 hover:border-green-600 hover:bg-green-100">

                            <VideoCameraIcon className="h-20 w-20 text-green-600 transition-transform duration-300 group-hover:scale-110" />

                            <h4 className="mt-6 text-xl font-bold text-slate-800">
                                Click to Select Video
                            </h4>

                            <p className="mt-2 text-center text-sm text-slate-500">
                                Maximum file size depends on your server configuration.
                            </p>

                            <input
                                type="file"
                                accept="video/mp4,video/webm,video/ogg,video/quicktime,video/x-msvideo"
                                onChange={handleVideo}
                                className="hidden"
                            />

                        </label>

                        {videoFile && (

                            <div className="mt-5 rounded-2xl bg-green-50 p-4">

                                <p className="text-sm font-semibold text-green-700">

                                    Selected File

                                </p>

                                <p className="mt-1 break-all text-slate-700">

                                    {videoFile.name}

                                </p>

                                <p className="mt-1 text-xs text-slate-500">

                                    {(videoFile.size / 1024 / 1024).toFixed(2)} MB

                                </p>

                            </div>

                        )}

                    </div>

                    {/* Preview */}

                    {preview && (

                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

                            <div className="mb-5 flex items-center justify-between">

                                <div>

                                    <h3 className="text-xl font-bold text-slate-800">
                                        Video Preview
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Preview before saving.
                                    </p>

                                </div>

                                <span className="rounded-full bg-emerald-100 px-4 py-1 text-xs font-semibold text-emerald-700">
                                    Preview
                                </span>

                            </div>

                            <div className="overflow-hidden rounded-3xl border bg-black shadow">

                                <video
                                    controls
                                    preload="metadata"
                                    className="h-[420px] w-full object-contain"
                                    src={preview}
                                />

                            </div>

                        </div>

                    )}

                    {/* Footer */}

                    <div className="sticky bottom-0 flex items-center justify-end gap-4 border-t border-slate-200 bg-white pt-6">

                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-2xl border cursor-pointer border-slate-300 bg-amber-400 px-8 py-3 font-semibold text-white transition hover:bg-amber-500"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={saving}
                            className="rounded-2xl cursor-pointer bg-gradient-to-r from-green-600 to-green-700 px-8 py-3 font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {saving
                                ? "Saving..."
                                : video
                                    ? "Update Video"
                                    : "Upload Video"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );

}