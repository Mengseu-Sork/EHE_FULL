import VideoCard from "./VideoCard";
import { VideoCameraIcon } from "@heroicons/react/24/outline";

export default function VideoTable({
    loading,
    videos,
    onEdit,
    onDelete,
}) {
    const storageUrl =
        import.meta.env.VITE_API_URL.replace("/api", "") +
        "/storage";

    if (loading) {
        return (
            <div className="rounded-3xl bg-white p-16 text-center shadow">
                <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-green-600 border-t-transparent"></div>

                <p className="mt-5 text-slate-500">
                    Loading videos...
                </p>
            </div>
        );
    }

    return (
        <div className="h-[70vh] overflow-auto">
            {videos.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-slate-300 bg-white py-24">

                    <div className="flex flex-col items-center justify-center">

                        <div className="rounded-full bg-red-50 p-6">

                            <VideoCameraIcon className="h-14 w-14 text-red-500" />

                        </div>

                        <h2 className="mt-5 text-2xl font-bold text-slate-700">
                            No Videos Found
                        </h2>

                        <p className="mt-2 text-slate-500">
                            Upload your first video to get started.
                        </p>

                    </div>

                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {videos.map((video, index) => (
                        <VideoCard
                            key={video.id}
                            video={video}
                            index={index}
                            storageUrl={storageUrl}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}