export default function ErrorPage({ error }: { error?: string }) {
    return(
    <main className="w-full h-full mx-auto flex flex-col gap-5 justify-center items-center bg-[#F7F7F7] dark:bg-[#1f1e1e]">
        <p className="text-xl text-foreground">Ocurrió un error</p>
        <p className="text-base text-foreground">{error || "No se pudo cargar la página"}</p>
    </main>)
}