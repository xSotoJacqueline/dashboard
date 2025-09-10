import { MinimalCard, MinimalCardContent } from "./ui/minimal-card";

export default function ErrorPage({ error }: { error?: string }) {
    return(
    <main className="w-full h-full  mx-auto flex flex-col gap-5 justify-center items-center bg-[#F7F7F7] dark:bg-[#1f1e1e]">
        <MinimalCard className="h-full max-h-[100dvh] max-w-[90vw]">
            <MinimalCardContent className="bg-red-500 flex flex-col gap-8 text-white items-center justify-center  overflow-hidden relative drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] rounded-[22px] w-full h-full"  >
                <h1 className="text-7xl sm:text-9xl md:text-[200px] h-fit text-center font-bold"  style={{
                    WebkitTextFillColor: "transparent",
                    WebkitTextStrokeWidth: "4px",
                    WebkitTextStrokeColor: "rgba(255, 255, 255, 0.8)"
                 }}>
                    Ooops!
                </h1>
                <div className="mt-5 text-center">
                    <p className="text-lg font-semibold">Parece que algo salió mal.</p>
                    <p className="text-base">{error || "No se pudo cargar la página"}</p>
                </div>
             
            </MinimalCardContent>
        </MinimalCard>
        
    </main>)
}