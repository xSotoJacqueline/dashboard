import { Button, buttonVariants } from '@/components/ui/button';
import { createFileRoute, Link } from '@tanstack/react-router'
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react'
import { dark } from '@clerk/themes'
import { useTheme } from "@/hooks/use-theme"
import { Card } from '@/components/ui/card';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { AnimatePresence, motion } from 'framer-motion';

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { isDarkMode } = useTheme();
  const { isSignedIn } = useUser()

  return (
    <div className="flex flex-col items-center justify-center gap-3 p-10 h-full w-full">
      
      <Card className="justify-center relative border-2 border-foreground/5 items-center h-full w-full flex">

         <AnimatePresence>
          {isSignedIn && (
            <>
              {/* Mini gráfico de barras */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="absolute top-6 left-8 flex items-end gap-1"
              >
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: 12 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="w-1.5 bg-primary/30 rounded-sm" 
                />
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: 8 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  className="w-1.5 bg-primary/40 rounded-sm" 
                />
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: 16 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="w-1.5 bg-primary/50 rounded-sm" 
                />
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: 10 }}
                  transition={{ duration: 0.5, delay: 1.4 }}
                  className="w-1.5 bg-primary/35 rounded-sm" 
                />
              </motion.div>

              {/* Indicador de progreso circular */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute top-8 right-12 w-8 h-8"
              >
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="16"
                    cy="16"
                    r="12"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    className="text-primary/10"
                  />
                  <motion.circle
                    cx="16"
                    cy="16"
                    r="12"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    className="text-primary/40"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 0.65 }}
                    transition={{ duration: 1.5, delay: 1.6 }}
                    style={{
                      strokeDasharray: "75.4",
                      strokeDashoffset: "75.4"
                    }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[8px] font-medium text-primary/60">65%</span>
                </div>
              </motion.div>

              {/* Mini línea de tendencia */}
              <motion.div
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ opacity: 1, pathLength: 1 }}
                exit={{ opacity: 0, pathLength: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="absolute bottom-12 left-6"
              >
                <svg width="24" height="12" viewBox="0 0 24 12">
                  <motion.path
                    d="M2 10 L8 6 L14 8 L22 2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary/40"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, delay: 1.8 }}
                  />
                  <motion.circle
                    cx="22"
                    cy="2"
                    r="1.5"
                    fill="currentColor"
                    className="text-primary/60"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 3 }}
                  />
                </svg>
              </motion.div>

              {/* Indicador de métricas */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute bottom-8 right-8 flex flex-col items-end gap-1"
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: 16 }}
                  transition={{ duration: 0.8, delay: 2.2 }}
                  className="h-1 bg-green-500/40 rounded-full"
                />
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: 12 }}
                  transition={{ duration: 0.8, delay: 2.4 }}
                  className="h-1 bg-blue-500/40 rounded-full"
                />
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: 8 }}
                  transition={{ duration: 0.8, delay: 2.6 }}
                  className="h-1 bg-orange-500/40 rounded-full"
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Elementos decorativos simples cuando NO está autenticado */}
        <AnimatePresence>
          {!isSignedIn && (
            <>
              {/* Líneas simples de placeholder */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                exit={{ opacity: 0, scaleX: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute top-8 left-8 w-6 h-0.5 bg-muted-foreground/15"
                style={{ transformOrigin: 'left' }}
              />
              
              {/* Puntos de conexión */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="absolute top-12 right-12 w-2 h-2 bg-muted-foreground/20 rounded-full"
              />
              
              {/* Elemento rectangular simple */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute bottom-10 left-10 w-4 h-2 bg-muted-foreground/10 rounded-sm"
              />
              
              {/* Indicador minimalista */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.4, delay: 0.8 }}
                className="absolute bottom-12 right-16 w-3 h-3 border border-muted-foreground/20 rounded-full"
              />
            </>
          )}
        </AnimatePresence>


       <div className="text-center flex flex-col gap-3 items-center">
            <div className='min-h-10'>
              <AnimatePresence mode="wait">
                <SignedOut>
                  <motion.div
                    key="signedout"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <SignInButton mode="modal" appearance={{ theme: isDarkMode ? dark : "simple" }}>
                      <Button size={"sm"} className='rounded-full' variant={"default"}>Iniciar sesión</Button>
                    </SignInButton>
                  </motion.div>
                </SignedOut>
                <SignedIn>
                  <motion.div
                    key="signedin"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className='w-full flex items-center justify-between gap-3'
                  >
                    <UserButton appearance={{ elements: { menuItem__emailAddresses: { display: "none" }, profileSection__emailAddresses: { display: "none" } }, theme: isDarkMode ? dark : "simple" }} />
                    <Link viewTransition={{ types: ['slide-right'] }} className={buttonVariants({ variant: "outline", className: '!rounded-full' })} to="/dashboard/retiros">Entrar</Link>
                  </motion.div>
                </SignedIn>
              </AnimatePresence>
            </div>
            <ThemeSwitcher className='rounded-full'/>

        </div>

      </Card>

    </div>
  );
}