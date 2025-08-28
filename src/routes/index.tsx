import * as React from "react"
import { createFileRoute, Link } from "@tanstack/react-router"
import { Card } from "@/components/ui/card"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react"
import { dark } from "@clerk/themes"
import { useTheme } from "@/hooks/use-theme"
import { ThemeSwitcher } from "@/components/theme-switcher"
// import { ChartSection } from "@/components/landing/ChartSectionVariant"
import { ChartLineIcon, ChartNoAxesCombinedIcon, CreditCardIcon, GiftIcon, HandCoinsIcon, SpeechIcon, UserIcon } from "lucide-react"
import { Scroller } from "@/components/ui/scroller"

export const Route = createFileRoute("/")({
  component: RouteComponent,
})

function RouteComponent() {
  const { isDarkMode } = useTheme();
  const { isSignedIn } = useUser()

  const [authTransition, setAuthTransition] = React.useState(false)
  React.useEffect(() => {
    setAuthTransition(true)
    const t = setTimeout(() => setAuthTransition(false), 520)
    return () => clearTimeout(t)
  }, [isSignedIn])

  const data = {
    projects: [
      {
        name: "Retiros",
        icon: CreditCardIcon,
      },
      {
        name: "Métricas",
        icon: ChartLineIcon,
      },
      {
        name: "Marketing",
        icon: SpeechIcon,
      },
      {
        name: "Jugadores",
        icon: UserIcon,
      },
      {
        name: "Bonos",
        icon: GiftIcon,
      },
      {
        name: "Depósitos",
        icon: HandCoinsIcon,
      },
      //     {
      //   name: "Sportsbook",
      //   icon: BookIcon,
      // },
      // {
      //   name: "Alcances",
      //   icon: ChartLineIcon,
      // },
      {
        name: "Benchmark",
        icon: ChartNoAxesCombinedIcon,
      }
    ],
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-6 h-[100dvh] w-full">
      <Card
        className="
          relative border-2 border-foreground/5
          w-full max-w-6xl
          h-[min(88vh,820px)]
          overflow-hidden
          flex flex-col
          rounded-2xl
          bg-background
          p-0
        "
      >
        <AuthTransitionOverlay active={authTransition} direction={isSignedIn ? 'in' : 'out'} />
        {/* Signed out */}
        <SignedOut>
          <div className="flex-1 grid place-content-center p-8 text-center animate-[reveal-up_520ms_ease-out_both]">
            <h1 className="text-3xl md:text-4xl font-semibold text-foreground">
              Accede para ver el panel
            </h1>
            <div className="mt-6">
              <SignInButton
                mode="modal"
                appearance={{ theme: isDarkMode ? dark : "simple" }}
              >
                <Button className="rounded-full">Iniciar sesión</Button>
              </SignInButton>
            </div>
            <div className="mt-6 opacity-80 justify-center flex">
              <ThemeSwitcher className="rounded-full" />
            </div>
          </div>
        </SignedOut>

        <SignedIn>
          <section className="flex-1">
            <div className="relative w-full min-h-[680px] h-full">
              <div className="flex items-center h-fit justify-between z-50 gap-3 mx-auto absolute inset-x-0 sm:w-[95%] w-[90%] top-5 sm:top-8 max-w-5xl">
                  <UserButton
                    appearance={{
                      elements: {
                        menuItem__emailAddresses: { display: "none" },
                        profileSection__emailAddresses: { display: "none" },
                      },
                      theme: isDarkMode ? dark : "simple",
                    }}
                  />
                  <ThemeSwitcher className="rounded-full bg-transparent" />
              </div>
              <GridAuroraBackground />

              {/* Hero central */}
              <div className="relative z-10 animate-[reveal-up_500ms_ease-out_both]">
                <div className="mx-auto max-w-4xl px-6 text-center pt-16">
                  <div className="leading-tight flex w-full gap-3 text-center items-cente justify-center tracking-tight ">
                    <span className="block text-[44px] md:text-[72px] text-foreground/80 font-bold">Foliatti </span>
                    <span className="text-[44px] md:text-[72px]">Casino</span>
                  </div>
                  <p className="mt-4 text-sm md:text-base text-foreground/60 max-w-2xl mx-auto">
                    Dashboard para visualizar y gestion de datos.
                  </p>
                  <div className="mt-6 flex w-full justify-center">
                    <Link 
                      viewTransition={{ types: ['elastic'] }} 
                      className={buttonVariants({ variant: "default", className: '!rounded-full w-fit' })} 
                      to="/dashboard/retiros"
                    >
                      Entrar
                    </Link>
                  </div>
                </div>
              </div>

              {/* Dock de vidrio */}
              <Scroller className="relative h-[500px] z-10 mt-8 md:mt-10 pb-28">
                <div
                  className="
                    relative mx-auto sm:w-[95%] w-[90%] max-w-5xl rounded-2xl
                    border border-foreground/10 bg-foreground/[0.06]
                    backdrop-blur-xl shadow-[0_10px_40px_-20px_rgba(0,0,0,0.4)]
                    overflow-hidden
                    animate-[reveal-up_560ms_80ms_ease-out_both]
                  "
                >
                  {/* Máscara para TODA la franja (light y dark compatibles) */}
                    <div className="dark:dock-fade-mask pointer-events-none absolute inset-0 max-sm:hidden" />
                  <div className="grid grid-cols-12 gap-4 p-4">
                    {/* Sidebar izquierda */}
                    <div className="col-span-12 sm:col-span-3 h-full sm:block hidden">
                      <div className="relative rounded-xl border h-full border-foreground/10 bg-foreground/[0.06] p-4 overflow-hidden">
                        <div
                          className="absolute -top-16 -left-16 w-44 h-44 rounded-full blur-3xl opacity-80 animate-[pulse-soft_4s_ease-in-out_infinite]"
                          style={{
                            background:
                              "radial-gradient(50% 50% at 50% 50%, rgba(16,185,129,0.45) 0%, rgba(16,185,129,0) 70%)",
                          }}
                        />
                        <div className="relative">
                          <div className="text-base font-bold pl-6 tracking-wide text-foreground/80">
                            Menú
                          </div>
                          <div className="mt-4 space-y-6 ">

                            {data.projects.map((project, i) => (
                              <div className="relative pl-6 flex flex-col" key={i}>
                                {project.name === "Retiros" &&
                                  <div className="absolute left-0 w-2 h-8 bg-primary rounded-r-full transition-all duration-300 ease-in-out animate-in slide-in-from-left-2" />
                                }
                                  <div className={`flex gap-3 h-fit items-center !text-base justify-start rounded-md text-[11px] text-foreground/60 animate-[reveal-up_480ms_ease-out_both] [animation-delay:calc(var(--d,0)*60ms)] ${
                                    project.name === "Retiros"
                                      ? 'text-primary font-bold pt-1'
                                      : 'hover:text-primary/70'
                                  }`}>
                                    <project.icon strokeWidth={2} />
                                    <span className="transition-all duration-300 ease-in-out">{project.name}</span>
                                  </div>

                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Centro con máscara adicional de “Cards” */}
                    <div className="col-span-12 sm:col-span-9">
                      <div className="relative rounded-2xl overflow-hidden">
                        <div className="dark:cards-fade-mask absolute inset-0 pointer-events-none" />
                        <div className="space-y-4">
                          {/* My Cards mini */}
                          <div className="rounded-xl border border-foreground/10 bg-foreground/[0.06] p-4 animate-[reveal-up_520ms_40ms_ease-out_both]">
                            <div className="flex items-center justify-between ">
                              <div className="flex items-center gap-2">
                                <div className="animate-pulse bg-foreground/10 size-5 rounded-sm  border border-foreground/10 "/>
                                <div className="w-24 h-4 rounded-full bg-foreground/10 border border-foreground/10 animate-pulse" />
                              </div>
                              <div className="size-6 rounded-full bg-foreground/10 border border-foreground/10" />
                            </div>
                            <div className="mt-3 h-20 rounded-lg bg-foreground/[0.04] border border-foreground/10 overflow-hidden relative">
                              <div
                                className="absolute inset-y-0 -left-1 w-1/2 bg-gradient-to-r from-transparent via-foreground/10 to-transparent"
                                style={{ animation: "shimmer 2.3s ease-in-out infinite" }}
                              />
                            </div>
                          </div>

                          <div className="rounded-xl border border-foreground/10 bg-foreground/[0.06] p-4 animate-[reveal-up_520ms_40ms_ease-out_both]">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="animate-pulse bg-foreground/10 size-5 rounded-sm  border border-foreground/10 "/>
                                <div className="w-24 h-4 rounded-full bg-foreground/10 border border-foreground/10 animate-pulse" />
                              </div>
                              <div className="size-6 rounded-full bg-foreground/10 border border-foreground/10" />
                            </div>
                            <div className="mt-3 h-20 rounded-lg bg-foreground/[0.04] border border-foreground/10 overflow-hidden relative">
                              <div
                                className="absolute inset-y-0 -left-1 w-1/2 bg-gradient-to-r from-transparent via-foreground/10 to-transparent"
                                style={{ animation: "shimmer 2.3s ease-in-out infinite" }}
                              />
                            </div>
                          </div>

                        <div className="rounded-xl border border-foreground/10 bg-foreground/[0.06] p-4 animate-[reveal-up_520ms_40ms_ease-out_both]">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="animate-pulse bg-foreground/10 size-5 rounded-sm  border border-foreground/10 "/>
                                <div className="w-24 h-4 rounded-full bg-foreground/10 border border-foreground/10 animate-pulse" />
                              </div>
                              <div className="size-6 rounded-full bg-foreground/10 border border-foreground/10" />
                            </div>
                            <div className="mt-3 h-20 rounded-lg bg-foreground/[0.04] border border-foreground/10 overflow-hidden relative">
                              <div
                                className="absolute inset-y-0 -left-1 w-1/2 bg-gradient-to-r from-transparent via-foreground/10 to-transparent"
                                style={{ animation: "shimmer 2.3s ease-in-out infinite" }}
                              />
                            </div>
                          </div>

                          
                        </div>
                      </div>
                    </div>

                    {/* <div className="col-span-12 sm:col-span-3">
                      <div className="z-10 rounded-xl border border-foreground/10 bg-foreground/[0.06] p-4 ">
                        <div className="flex items-center justify-between">
                          <span className="rounded-full border border-foreground/10 bg-foreground/10 px-2 py-1 text-[10px]">
                            Top
                          </span>
                          <span className="text-xs text-foreground/70">Retiros</span>
                         
                        </div>
                        <div className="mt-3 grid place-items-center">
                          <ChartSection />
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </Scroller>
            </div>
          </section>
        </SignedIn>

        {/* CSS helpers, animaciones y máscaras compatibles con light/dark */}
        <style>{`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          @keyframes rotate-slow {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }
          @keyframes gradient-pan {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes drift {
            0% { transform: translate(0,0) scale(1); }
            50% { transform: translate(8px,-6px) scale(1.02); }
            100% { transform: translate(0,0) scale(1); }
          }
          @keyframes reveal-up {
            0% { opacity: 0; transform: translateY(14px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes pulse-soft {
            0% { opacity: .65; }
            50% { opacity: .9; }
            100% { opacity: .65; }
          }

          /* Máscara de toda la franja del dock: luce bien en light y dark */
          .dock-fade-mask {
            -webkit-mask-image: radial-gradient(140% 110% at 50% 35%, #000 68%, transparent 96%);
            mask-image: radial-gradient(140% 110% at 50% 35%, #000 68%, transparent 96%);
          }
          /* Dark: usa negro con mayor opacidad */
          .dark .dock-fade-mask {
            background:
              radial-gradient(120% 120% at 60% 10%, rgba(0,0,0,0.00) 15%, rgba(0,0,0,0.22) 55%, rgba(0,0,0,0.48) 100%),
              linear-gradient(to bottom, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.40) 100%);
          }
          /* Light: tonos neutros suaves para no ensuciar el UI */
          :not(.dark) .dock-fade-mask {
            background:
              radial-gradient(120% 120% at 60% 10%, rgba(17,24,39,0.00) 15%, rgba(17,24,39,0.12) 55%, rgba(17,24,39,0.18) 100%),
              linear-gradient(to bottom, rgba(17,24,39,0.00) 0%, rgba(17,24,39,0.14) 100%);
          }

          /* Máscara adicional en la columna central de Cards */
          .cards-fade-mask {
            -webkit-mask-image: radial-gradient(120% 90% at 50% 40%, #000 65%, transparent 95%);
            mask-image: radial-gradient(120% 90% at 50% 40%, #000 65%, transparent 95%);
          }
          .dark .cards-fade-mask {
            background:
              radial-gradient(85% 80% at 60% 35%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.35) 70%, rgba(0,0,0,0.68) 100%),
              linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.45) 100%);
          }
          :not(.dark) .cards-fade-mask {
            background:
              radial-gradient(85% 80% at 60% 35%, rgba(17,24,39,0) 35%, rgba(17,24,39,0.12) 70%, rgba(17,24,39,0.16) 100%),
              linear-gradient(to bottom, rgba(17,24,39,0) 0%, rgba(17,24,39,0.12) 100%);
          }

          /* Respeto a reduced motion */
          @media (prefers-reduced-motion: reduce) {
            * { animation: none !important; transition: none !important; }
          }
          @keyframes auth-wipe {
            0% { transform: scaleX(0); opacity: 0; }
            25% { opacity: .55; }
            100% { transform: scaleX(1); opacity: 0; }
          }
          @media (prefers-reduced-motion: reduce) {
            .auth-wipe { animation: none !important; }
          }
        `}</style>
      </Card>
    </div>
  )
}

/* ---------- Fondo: grid + glow; animaciones suaves ---------- */
function GridAuroraBackground() {
  return (
    <div className="absolute inset-0">
      {/* Base */}
      <div className="absolute inset-0 bg-background" />
      {/* Grid adaptable al tema */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, hsl(var(--foreground)/0.08) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--foreground)/0.08) 1px, transparent 1px)",
          backgroundSize: "46px 46px",
          opacity: 0.6,
        }}
      />
      {/* Glow verdoso moviéndose suavemente */}
      <div
        className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full blur-3xl will-change-transform animate-[drift_14s_ease-in-out_infinite]"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(27, 209, 147, 0.55) 0%, rgba(27, 209, 147, 0) 70%)",
        }}
      />
      {/* Aurora multicolor desplazándose */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(60% 50% at 70% 40%, rgba(139,92,246,0.14) 0%, rgba(139,92,246,0) 60%), radial-gradient(40% 40% at 30% 60%, rgba(245,158,11,0.12) 0%, rgba(245,158,11,0) 60%)",
          backgroundSize: "200% 200%",
          animation: "gradient-pan 18s ease-in-out infinite",
        }}
      />
      {/* Viñeta sutil */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(110% 80% at 50% 50%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.35) 100%)",
        }}
      />
    </div>
  )
}

type AuthOverlayProps = {
  active: boolean
  direction: 'in' | 'out'
}

function AuthTransitionOverlay({ active, direction }: AuthOverlayProps) {
  if (!active) return null
  return (
    <div className="absolute inset-0 z-50 pointer-events-none overflow-hidden">
      <div
        className="
          absolute inset-y-0 left-0 w-full h-full
          bg-gradient-to-r from-foreground/5 via-foreground/15 to-foreground/5
          [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]
          auth-wipe
        "
        style={{
          animation: 'auth-wipe 520ms ease-out both',
          transformOrigin: direction === 'in' ? 'left' as const : 'right' as const,
        }}
      />
    </div>
  )
}
