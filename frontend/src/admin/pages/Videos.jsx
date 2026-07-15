import { useEffect, useMemo, useState } from "react";
import {
    PlusIcon,
    PlayCircleIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

import Swal from "sweetalert2";

import api from "../../api/api";

import VideoTable from "../components/video/VideoTable";
import VideoForm from "../components/video/VideoForm";

export default function Videos() {

    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [showForm, setShowForm] = useState(false);

    const [editingVideo, setEditingVideo] = useState(null);

    useEffect(() => {
        loadVideos();
    }, []);

    const loadVideos = async () => {

        try {

            setLoading(true);

            const { data } = await api.get("/videos");

            setVideos(data);

        } catch (error) {

            console.error(error);

            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Unable to load videos.",
            });

        } finally {

            setLoading(false);

        }
    };

    const filteredVideos = useMemo(() => {
        return videos.filter((video) =>
            (video.original_name || video.video_file || "")
                .toLowerCase()
                .includes(search.toLowerCase())
        );
    }, [videos, search]);

    const handleCreate = () => {

        setEditingVideo(null);

        setShowForm(true);

    };

    const handleEdit = (video) => {

        setEditingVideo(video);

        setShowForm(true);

    };

    const handleDelete = async (video) => {

        const result = await Swal.fire({

            title: "Delete Video?",

            text: "This action cannot be undone.",

            icon: "warning",

            showCancelButton: true,

            confirmButtonColor: "#dc2626",

            cancelButtonColor: "#059669",

            confirmButtonText: "Delete",

        });

        if (!result.isConfirmed) return;

        try {

            await api.delete(`/videos/${video.id}`);

            Swal.fire({

                icon: "success",

                title: "Deleted",

                text: "Video deleted successfully.",

                timer: 1500,

                showConfirmButton: false,

            });

            loadVideos();

        } catch (error) {

            console.error(error);

            Swal.fire({

                icon: "error",

                title: "Error",

                text: "Delete failed.",

            });

        }

    };

    return (

        <div className="space-y-4">

            {/* Header */}

            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-green-800 via-green-700 to-green-600 p-6 text-white shadow-xl">

                {/* Background Decoration */}

                <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-3xl"></div>

                <div className="absolute -bottom-24 left-1/2 h-72 w-72 rounded-full bg-white/5 blur-3xl"></div>

                <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

                    {/* Left */}

                    <div className="flex items-start gap-5">

                        <div className="rounded-3xl bg-gray-100 p-5 backdrop-blur">

                            <PlayCircleIcon className="h-16 w-16 text-green-800" />

                        </div>

                        <div>

                            <span className="rounded-full bg-white/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur">
                                Video Management
                            </span>

                            <h1 className="mt-4 text-3xl font-black">
                                Videos
                            </h1>

                            <p className="mt-3 max-w-2xl text-red-100">
                                Manage uploaded videos for your website.
                            </p>

                        </div>

                    </div>

                    {/* Right */}

                    <div className="flex items-center">

                        <button
                            onClick={handleCreate}
                            className="inline-flex items-center gap-3 rounded-2xl bg-white cursor-pointer px-7 py-4 font-bold text-green-600 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                        >

                            <PlusIcon className="h-6 w-6" />

                            Add New Video

                        </button>

                    </div>

                </div>

            </div>

            {/* Table */}

            <VideoTable
                loading={loading}
                videos={filteredVideos}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            {/* Form */}

            <VideoForm
                open={showForm}
                video={editingVideo}
                onClose={() => {

                    setShowForm(false);

                    setEditingVideo(null);

                }}
                onSuccess={() => {

                    setShowForm(false);

                    setEditingVideo(null);

                    loadVideos();

                }}
            />

        </div>

    );

}