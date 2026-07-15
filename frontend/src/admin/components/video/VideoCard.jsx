import {
    VideoCameraIcon,
    PencilSquareIcon,
    TrashIcon,
    EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

export default function VideoCard({
    video,
    index,
    storageUrl,
    onEdit,
    onDelete,
}) {
    const [openMenu, setOpenMenu] = useState(false);

    return (
        <div className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            {/* Preview */}
            <div className="relative overflow-hidden bg-black">

                <video
                    controls
                    preload="metadata"
                    className="h-60 w-full object-cover"
                    src={`${storageUrl}/${video.video_file}`}
                />

                {/* Badge */}
                <div className="absolute right-4 top-4 rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white">
                    Upload
                </div>
            </div>

            {/* Body */}
            <div className="space-y-5 p-6">

                <div>
                    <h3 className="truncate text-lg font-bold text-slate-800">
                        {video.original_name || "Uploaded Video"}
                    </h3>
                </div>


                <div className="flex items-center justify-between border-t pt-4">

                    <div>
                        <p className="text-xs uppercase tracking-wide text-slate-400">
                            Created
                        </p>

                        <p className="font-semibold text-slate-700">
                            {new Date(video.created_at).toLocaleDateString(
                                "en-GB",
                                {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                }
                            )}
                        </p>
                    </div>

                    <div className="relative">

                        <button
                            onClick={() => setOpenMenu(!openMenu)}
                            className="rounded-xl cursor-pointer border border-slate-200 p-2 hover:bg-slate-100"
                        >
                            <EllipsisVerticalIcon className="h-6 w-6 text-slate-600" />
                        </button>

                        {openMenu && (
                            <div className="absolute flex justify-center items-center right-0 top-5 z-50 w-24 overflow-hidden rounded-2xl bg-white shadow-xl">

                                <button
                                    onClick={() => {
                                        setOpenMenu(false);
                                        onEdit(video);
                                    }}
                                    className="flex w-full cursor-pointer items-center gap-3 px-3 py-3 hover:bg-amber-50"
                                >
                                    <PencilSquareIcon className="h-5 w-5 text-amber-600" />
                                </button>

                                <button
                                    onClick={() => {
                                        setOpenMenu(false);
                                        onDelete(video);
                                    }}
                                    className="flex w-full cursor-pointer items-center gap-3 px-3 py-3 hover:bg-red-50"
                                >
                                    <TrashIcon className="h-5 w-5 text-red-600" />
                                </button>

                            </div>
                        )}

                    </div>

                </div>

            </div>
        </div>
    );
}