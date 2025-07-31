import { useRouter } from "@tanstack/react-router";
import { Button } from "./ui/button";

export default function NotFound() {
    const router = useRouter()

    return(
    <main className="w-full h-full mx-auto flex flex-col gap-5 justify-center items-center bg-[#F7F7F7] dark:bg-[#1f1e1e]">
        <p className="text-3xl text-foreground font-bold">Página no encontrada!</p>
        <Button variant="default" className="" onClick={() => router.history.back()}>
            Volver
        </Button>
    </main>)
}