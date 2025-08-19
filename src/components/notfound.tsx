import { useRouter } from "@tanstack/react-router";
import { Button } from "./ui/button";
import {MinimalCard, MinimalCardContent, MinimalCardImage} from "./ui/minimal-card";
import CardFlip, { CardBack, CardFront } from "./cardflip";

export default function NotFound() {
    const router = useRouter()
    return(
    <main className="w-full h-full mx-auto max-w-4xl flex overflow-y-auto overflow-x-hidden flex-col gap-3 justify-center items-center bg-[#F7F7F7] dark:bg-[#1f1e1e]">
        <div className="flex w-52 md:w-full px-2 flex-col gap-3 justify-center items-center">
            <section className="flex flex-col md:flex-row gap-3 h-fit w-full justify-between items-center ">
                <CardFlip className="md:w-72 md:h-72 w-44 h-44">
                    <CardFront>
                        <MinimalCard className="h-full">
                            <MinimalCardContent className="bg-primary-foliatti flex flex-col items-center justify-center text text-9xl md:text-[250px] text-center font-bold overflow-hidden relative text-transparent drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] rounded-[22px] w-full h-full" 
                            style={{
                                WebkitTextFillColor: "transparent",
                                WebkitTextStrokeWidth: "3px",
                                WebkitTextStrokeColor: "rgba(255, 255, 255, 0.8)"
                            }}
                            >
                               <span>
                                 4
                               </span>
                            </MinimalCardContent>
                        </MinimalCard>
                    </CardFront>
                    <CardBack>
                        <MinimalCardImage className="max-h-full h-full" src="/foliatti.png" alt="Foliatti" />
                    </CardBack>
                </CardFlip>
                <CardFlip className="md:w-72 md:h-72 w-44 h-44">
                    <CardFront>
                        <MinimalCard className="h-full">
                            <MinimalCardContent className="bg-primary-foliatti flex flex-col items-center justify-center text text-9xl md:text-[250px] text-center font-bold overflow-hidden relative text-transparent drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] rounded-[22px] w-full h-full" 
                            style={{
                                WebkitTextFillColor: "transparent",
                                WebkitTextStrokeWidth: "3px",
                                WebkitTextStrokeColor: "rgba(255, 255, 255, 0.8)"
                            }}
                            >
                               <span>
                                 0
                               </span>
                            </MinimalCardContent>
                        </MinimalCard>
                    </CardFront>
                    <CardBack>
                        <MinimalCardImage className="max-h-full h-full" src="/foliatti.png" alt="Foliatti" />
                    </CardBack>
                </CardFlip>
                 <CardFlip className="md:w-72 md:h-72 w-44 h-44">
                    <CardFront>
                        <MinimalCard className="h-full">
                            <MinimalCardContent className="bg-primary-foliatti flex flex-col items-center justify-center text text-9xl md:text-[250px] text-center font-bold overflow-hidden relative text-transparent drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] rounded-[22px] w-full h-full" 
                            style={{
                                WebkitTextFillColor: "transparent",
                                WebkitTextStrokeWidth: "3px",
                                WebkitTextStrokeColor: "rgba(255, 255, 255, 0.8)"
                            }}
                            >
                               <span>
                                 4
                               </span>
                            </MinimalCardContent>
                        </MinimalCard>
                    </CardFront>
                    <CardBack>
                        <MinimalCardImage className="max-h-full h-full" src="/foliatti.png" alt="Foliatti" />
                    </CardBack>
                </CardFlip>
            </section>
            <h1 className="text-lg md:text-2xl font-base text-center text-foreground">Página no encontrada</h1>
                <Button variant="default" className="bg-primary-foliatti" onClick={() => {
                    router.history.back()}}>
                        Volver
                </Button>

        </div>
    </main>
    )
}