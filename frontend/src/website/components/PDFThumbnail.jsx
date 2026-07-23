import { useEffect, useRef } from "react";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";

GlobalWorkerOptions.workerSrc = workerSrc;

export default function PDFThumbnail({ fileUrl }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!fileUrl) return;

        let loadingTask;

        (async () => {
            try {
                const pdf = await getDocument(fileUrl).promise;

                const page = await pdf.getPage(1);

                const viewport = page.getViewport({
                    scale: 1.2,
                });

                const canvas = canvasRef.current;

                if (!canvas) return;

                const context = canvas.getContext("2d");

                canvas.width = viewport.width;
                canvas.height = viewport.height;

                await page.render({
                    canvasContext: context,
                    viewport,
                }).promise;
            } catch (err) {
                console.error("PDF ERROR", err);
            }
        })();

        return () => {
            loadingTask?.destroy();
        };
    }, [fileUrl]);

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-[230px] md:h-[400px] lg:h-[400px] object-contain bg-white"
        />
    );
}