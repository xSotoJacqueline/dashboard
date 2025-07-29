import { SmartphoneIcon, TvIcon, Dice6Icon } from "lucide-react";
import { CasinoBetsCard } from "../sportbooks/casino-bets-card";
import { PopularBetsCard } from "../sportbooks/popular-bets-card";


export default function CasinoBetsTab() {
  return (
    <div className="w-full h-full flex flex-col gap-6">
        <CasinoBetsCard title="Casino Online" description="Distribución por deporte" Icon={SmartphoneIcon} />
        <CasinoBetsCard title="Casino Físico" description="Distribución por deporte" Icon={TvIcon} />
        <PopularBetsCard title="Tipos de Apuestas Más Populares" description="Distribución por tipo de apuesta" Icon={Dice6Icon} />
    </div>
  );
}   