import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts, useLocation, redirect, Link } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { rootAuthLoader, getAuth } from "@clerk/react-router/ssr.server";
import { ClerkProvider, useUser } from "@clerk/react-router";
import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { XIcon, PanelLeftIcon, ChevronsUpDown, BadgeCheck, LogOut, ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon, CalendarIcon, CreditCardIcon, ChartLineIcon, SpeechIcon, UserIcon, GiftIcon, HandCoinsIcon, BookIcon, ChartNoAxesCombinedIcon, ChevronRight, ChevronLeft, ChevronDown, ChevronUp, TrendingUp, ChartLine, BarChart3, Users, UserRoundPlus, Circle, Calendar as Calendar$1, User, Clock, ArrowUp } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { UserProfile, SignOutButton } from "@clerk/clerk-react";
import { getDefaultClassNames, DayPicker } from "react-day-picker";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { es } from "date-fns/locale";
import { format } from "date-fns";
import * as RechartsPrimitive from "recharts";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Bar, LineChart, Line, LabelList, PieChart, Pie } from "recharts";
import NumberFlow, { NumberFlowGroup, useCanAnimate } from "@number-flow/react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { motion, MotionConfig } from "framer-motion";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
async function loader$1(args) {
  return rootAuthLoader(args);
}
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "UTF-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0"
      }), /* @__PURE__ */ jsx("title", {
        children: "Dashboard"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App({
  loaderData
}) {
  return /* @__PURE__ */ jsx(ClerkProvider, {
    loaderData,
    children: /* @__PURE__ */ jsx("main", {
      children: /* @__PURE__ */ jsx(Outlet, {})
    })
  });
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
const breakpoint = 768;
function useIsMobile({ MOBILE_BREAKPOINT = breakpoint } = {}) {
  const [isMobile, setIsMobile] = React.useState(void 0);
  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return !!isMobile;
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}
function Sheet({ ...props }) {
  return /* @__PURE__ */ jsx(SheetPrimitive.Root, { "data-slot": "sheet", ...props });
}
function SheetPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx(SheetPrimitive.Portal, { "data-slot": "sheet-portal", ...props });
}
function SheetOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SheetPrimitive.Overlay,
    {
      "data-slot": "sheet-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function SheetContent({
  className,
  children,
  side = "right",
  ...props
}) {
  return /* @__PURE__ */ jsxs(SheetPortal, { children: [
    /* @__PURE__ */ jsx(SheetOverlay, {}),
    /* @__PURE__ */ jsxs(
      SheetPrimitive.Content,
      {
        "data-slot": "sheet-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          side === "right" && "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          side === "left" && "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "top" && "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          side === "bottom" && "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          className
        ),
        ...props,
        children: [
          children,
          /* @__PURE__ */ jsxs(SheetPrimitive.Close, { className: "ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none", children: [
            /* @__PURE__ */ jsx(XIcon, { className: "size-4" }),
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      }
    )
  ] });
}
function SheetHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sheet-header",
      className: cn("flex flex-col gap-1.5 p-4", className),
      ...props
    }
  );
}
function SheetTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SheetPrimitive.Title,
    {
      "data-slot": "sheet-title",
      className: cn("text-foreground font-semibold", className),
      ...props
    }
  );
}
function SheetDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SheetPrimitive.Description,
    {
      "data-slot": "sheet-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function TooltipProvider({
  delayDuration = 0,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    TooltipPrimitive.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration,
      ...props
    }
  );
}
function Tooltip({
  ...props
}) {
  return /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsx(TooltipPrimitive.Root, { "data-slot": "tooltip", ...props }) });
}
function TooltipTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(TooltipPrimitive.Trigger, { "data-slot": "tooltip-trigger", ...props });
}
function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(TooltipPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
    TooltipPrimitive.Content,
    {
      "data-slot": "tooltip-content",
      sideOffset,
      className: cn(
        "bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx(TooltipPrimitive.Arrow, { className: "bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" })
      ]
    }
  ) });
}
const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "14rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";
const SidebarContext = React.createContext(null);
function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}
function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);
  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = React.useCallback(
    (value) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open]
  );
  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open2) => !open2) : setOpen((open2) => !open2);
  }, [isMobile, setOpen, setOpenMobile]);
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);
  const state = open ? "expanded" : "collapsed";
  const contextValue = React.useMemo(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  );
  return /* @__PURE__ */ jsx(SidebarContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsx(TooltipProvider, { delayDuration: 0, children: /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sidebar-wrapper",
      style: {
        "--sidebar-width": SIDEBAR_WIDTH,
        "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
        ...style
      },
      className: cn(
        "group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full",
        className
      ),
      ...props,
      children
    }
  ) }) });
}
function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
  if (collapsible === "none") {
    return /* @__PURE__ */ jsx(
      "div",
      {
        "data-slot": "sidebar",
        className: cn(
          "bg-white text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col",
          className
        ),
        ...props,
        children
      }
    );
  }
  if (isMobile) {
    return /* @__PURE__ */ jsx(Sheet, { open: openMobile, onOpenChange: setOpenMobile, ...props, children: /* @__PURE__ */ jsxs(
      SheetContent,
      {
        "data-sidebar": "sidebar",
        "data-slot": "sidebar",
        "data-mobile": "true",
        className: "bg-sidebar  max-h-[98vh] m-2 rounded-lg text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden",
        style: {
          "--sidebar-width": SIDEBAR_WIDTH_MOBILE
        },
        side,
        children: [
          /* @__PURE__ */ jsxs(SheetHeader, { className: "sr-only", children: [
            /* @__PURE__ */ jsx(SheetTitle, { children: "Sidebar" }),
            /* @__PURE__ */ jsx(SheetDescription, { children: "Displays the mobile sidebar." })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex h-full w-full flex-col", children })
        ]
      }
    ) });
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "group peer text-sidebar-foreground hidden md:block",
      "data-state": state,
      "data-collapsible": state === "collapsed" ? collapsible : "",
      "data-variant": variant,
      "data-side": side,
      "data-slot": "sidebar",
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            "data-slot": "sidebar-gap",
            className: cn(
              "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
              "group-data-[collapsible=offcanvas]:w-0",
              "group-data-[side=right]:rotate-180",
              variant === "floating" || variant === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
            )
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            "data-slot": "sidebar-container",
            className: cn(
              "absolute inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
              side === "left" ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
              // Adjust the padding for floating and inset variants.
              variant === "floating" || variant === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
              className
            ),
            ...props,
            children: /* @__PURE__ */ jsx(
              "div",
              {
                "data-sidebar": "sidebar",
                "data-slot": "sidebar-inner",
                className: "bg-sidebar rounded-2xl group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm",
                children
              }
            )
          }
        )
      ]
    }
  );
}
function SidebarTrigger({
  className,
  onClick,
  ...props
}) {
  const { toggleSidebar } = useSidebar();
  return /* @__PURE__ */ jsxs(
    Button,
    {
      "data-sidebar": "trigger",
      "data-slot": "sidebar-trigger",
      variant: "ghost",
      size: "icon",
      className: cn("size-7", className),
      onClick: (event) => {
        onClick?.(event);
        toggleSidebar();
      },
      ...props,
      children: [
        /* @__PURE__ */ jsx(PanelLeftIcon, {}),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
}
function SidebarRail({ className, ...props }) {
  const { toggleSidebar } = useSidebar();
  return /* @__PURE__ */ jsx(
    "button",
    {
      "data-sidebar": "rail",
      "data-slot": "sidebar-rail",
      "aria-label": "Toggle Sidebar",
      tabIndex: -1,
      onClick: toggleSidebar,
      title: "Toggle Sidebar",
      className: cn(
        "hover:after:bg-sidebar-border absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] sm:flex",
        "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className
      ),
      ...props
    }
  );
}
function SidebarInset({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "main",
    {
      "data-slot": "sidebar-inset",
      className: cn(
        "bg-background relative flex w-full flex-1 flex-col",
        "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
        className
      ),
      ...props
    }
  );
}
function SidebarHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sidebar-header",
      "data-sidebar": "header",
      className: cn("flex flex-col gap-2 p-2", className),
      ...props
    }
  );
}
function SidebarFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sidebar-footer",
      "data-sidebar": "footer",
      className: cn("flex flex-col gap-2 p-2", className),
      ...props
    }
  );
}
function SidebarContent({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sidebar-content",
      "data-sidebar": "content",
      className: cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className
      ),
      ...props
    }
  );
}
function SidebarGroup({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sidebar-group",
      "data-sidebar": "group",
      className: cn("relative flex w-full min-w-0 flex-col p-2", className),
      ...props
    }
  );
}
function SidebarGroupLabel({
  className,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "div";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "sidebar-group-label",
      "data-sidebar": "group-label",
      className: cn(
        "text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className
      ),
      ...props
    }
  );
}
function SidebarMenu({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "ul",
    {
      "data-slot": "sidebar-menu",
      "data-sidebar": "menu",
      className: cn("flex w-full min-w-0 flex-col gap-1", className),
      ...props
    }
  );
}
function SidebarMenuItem({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "li",
    {
      "data-slot": "sidebar-menu-item",
      "data-sidebar": "menu-item",
      className: cn("group/menu-item relative", className),
      ...props
    }
  );
}
const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline: "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  const { isMobile, state } = useSidebar();
  const button = /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "sidebar-menu-button",
      "data-sidebar": "menu-button",
      "data-size": size,
      "data-active": isActive,
      className: cn(sidebarMenuButtonVariants({ variant, size }), className),
      ...props
    }
  );
  if (!tooltip) {
    return button;
  }
  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip
    };
  }
  return /* @__PURE__ */ jsxs(Tooltip, { children: [
    /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: button }),
    /* @__PURE__ */ jsx(
      TooltipContent,
      {
        side: "right",
        align: "center",
        hidden: state !== "collapsed" || isMobile,
        ...tooltip
      }
    )
  ] });
}
function NavProjects({
  projects
}) {
  const { pathname } = useLocation();
  return /* @__PURE__ */ jsx(SidebarGroup, { className: "pl-0", children: /* @__PURE__ */ jsx(SidebarMenu, { className: "group-data-[collapsible=icon]:pl-0 flex flex-col gap-3 !pl-0", children: projects.map((item) => /* @__PURE__ */ jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxs("div", { className: "flex relative items-center justify-start gap-6 h-fit w-full pl-6 group-data-[collapsible=icon]:pl-2 ", children: [
    pathname?.startsWith(`${item.url.toLocaleLowerCase()}`) && /* @__PURE__ */ jsx("div", { className: "absolute group-data-[collapsible=icon]:hidden left-0 w-2 h-8 bg-primary-folatti rounded-r-full transition-all duration-300 ease-in-out animate-in slide-in-from-left-2" }),
    /* @__PURE__ */ jsx(SidebarMenuButton, { asChild: true, children: /* @__PURE__ */ jsxs("a", { href: item.url, className: `flex gap-3 h-fit items-center !text-base justify-start transition-all duration-300 ease-in-out ${pathname?.startsWith(`${item.url.toLocaleLowerCase()}`) ? "text-primary-folatti font-bold transform scale-105" : "hover:text-primary-folatti/70"}`, children: [
      /* @__PURE__ */ jsx(item.icon, { strokeWidth: 2.5, className: "transition-transform duration-300 ease-in-out" }),
      /* @__PURE__ */ jsx("span", { className: "transition-all duration-300 ease-in-out", children: item.name })
    ] }) })
  ] }) }, item.name)) }) });
}
function Avatar({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AvatarPrimitive.Root,
    {
      "data-slot": "avatar",
      className: cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      ),
      ...props
    }
  );
}
function AvatarImage({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AvatarPrimitive.Image,
    {
      "data-slot": "avatar-image",
      className: cn("aspect-square size-full", className),
      ...props
    }
  );
}
function AvatarFallback({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AvatarPrimitive.Fallback,
    {
      "data-slot": "avatar-fallback",
      className: cn(
        "bg-zinc-200 flex size-full items-center justify-center rounded-full",
        className
      ),
      ...props
    }
  );
}
function DropdownMenu({
  ...props
}) {
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Root, { "data-slot": "dropdown-menu", ...props });
}
function DropdownMenuTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Trigger,
    {
      "data-slot": "dropdown-menu-trigger",
      ...props
    }
  );
}
function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}) {
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Content,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset,
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
        className
      ),
      ...props
    }
  ) });
}
function DropdownMenuGroup({
  ...props
}) {
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Group, { "data-slot": "dropdown-menu-group", ...props });
}
function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": inset,
      "data-variant": variant,
      className: cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function DropdownMenuLabel({
  className,
  inset,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Label,
    {
      "data-slot": "dropdown-menu-label",
      "data-inset": inset,
      className: cn(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        className
      ),
      ...props
    }
  );
}
function DropdownMenuSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: cn("bg-border -mx-1 my-1 h-px", className),
      ...props
    }
  );
}
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsx(SheetPrimitive.Root, { "data-slot": "dialog", ...props });
}
function DialogTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(SheetPrimitive.Trigger, { "data-slot": "dialog-trigger", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx(SheetPrimitive.Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SheetPrimitive.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxs(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxs(
      SheetPrimitive.Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxs(
            SheetPrimitive.Close,
            {
              "data-slot": "dialog-close",
              className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ jsx(XIcon, {}),
                /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SheetPrimitive.Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}
function DialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SheetPrimitive.Description,
    {
      "data-slot": "dialog-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function NavUser() {
  const { isSignedIn, user: clerkUser, isLoaded } = useUser();
  const { isMobile } = useSidebar();
  return /* @__PURE__ */ jsx(SidebarMenu, { children: /* @__PURE__ */ jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxs(DropdownMenu, { children: [
    isLoaded && clerkUser && isSignedIn ? /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
      SidebarMenuButton,
      {
        size: "lg",
        className: "data-[state=open]:bg-sidebar-accent px-0  data-[state=open]:text-sidebar-accent-foreground",
        children: [
          /* @__PURE__ */ jsxs(Avatar, { className: "size-8 rounded-full", children: [
            /* @__PURE__ */ jsx(AvatarImage, { src: clerkUser?.imageUrl, alt: clerkUser?.username || clerkUser?.primaryEmailAddress?.emailAddress }),
            /* @__PURE__ */ jsx(AvatarFallback, { className: "rounded-full", children: clerkUser?.username?.[0] || clerkUser?.firstName?.[0] || "U" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid flex-1 text-left leading-tight", children: [
            /* @__PURE__ */ jsx("span", { className: "truncate font-bold text-base line-clamp-1", children: clerkUser?.username }),
            /* @__PURE__ */ jsx("span", { className: "truncate text-xs line-clamp-1", children: clerkUser?.primaryEmailAddress?.emailAddress })
          ] }),
          /* @__PURE__ */ jsx(ChevronsUpDown, { className: "ml-auto size-4" })
        ]
      }
    ) }) : /* @__PURE__ */ jsxs(
      SidebarMenuButton,
      {
        size: "lg",
        className: "data-[state=open]:bg-sidebar-accent px-0 h-fit data-[state=open]:text-sidebar-accent-foreground",
        children: [
          /* @__PURE__ */ jsx(Avatar, { className: "size-8 rounded-full", children: /* @__PURE__ */ jsx(AvatarFallback, { className: "rounded-full", children: "" }) }),
          /* @__PURE__ */ jsxs("div", { className: "grid flex-1 text-left gap-2 text-sm leading-tight", children: [
            /* @__PURE__ */ jsx("div", { className: "truncate font-medium w-1/2 h-2 rounded-full bg-zinc-300 animate-pulse" }),
            /* @__PURE__ */ jsx("div", { className: "truncate font-medium w-full h-2 rounded-full bg-zinc-300 animate-pulse" })
          ] }),
          /* @__PURE__ */ jsx(ChevronsUpDown, { className: "ml-auto size-4" })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      DropdownMenuContent,
      {
        className: "w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg",
        side: isMobile ? "bottom" : "right",
        align: "end",
        sideOffset: 4,
        children: [
          /* @__PURE__ */ jsx(DropdownMenuLabel, { className: "p-0 font-normal", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 px-1 py-1.5 text-left text-sm", children: [
            /* @__PURE__ */ jsxs(Avatar, { className: "h-8 w-8 rounded-lg", children: [
              /* @__PURE__ */ jsx(AvatarImage, { src: clerkUser?.imageUrl, alt: clerkUser?.username || clerkUser?.primaryEmailAddress?.emailAddress }),
              /* @__PURE__ */ jsx(AvatarFallback, { className: "rounded-lg", children: clerkUser?.username?.[0] || clerkUser?.firstName?.[0] || "U" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid flex-1 text-left text-sm leading-tight", children: [
              /* @__PURE__ */ jsx("span", { className: "truncate font-bold text-[18px] line-clamp-1", children: clerkUser?.username }),
              /* @__PURE__ */ jsx("span", { className: "truncate text-xs line-clamp-1", children: clerkUser?.primaryEmailAddress?.emailAddress })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
          /* @__PURE__ */ jsx(DropdownMenuGroup, { children: /* @__PURE__ */ jsxs(Dialog, { children: [
            /* @__PURE__ */ jsxs(DialogTrigger, { className: cn(buttonVariants({ variant: "ghost", size: "sm", className: "w-full justify-start font-normal focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4" })), children: [
              /* @__PURE__ */ jsx(BadgeCheck, {}),
              "Cuenta"
            ] }),
            /* @__PURE__ */ jsxs(DialogContent, { className: "!max-w-fit w-fit h-fit p-0", children: [
              /* @__PURE__ */ jsxs(DialogHeader, { className: "sr-only", children: [
                /* @__PURE__ */ jsx(DialogTitle, { className: "text-lg font-semibold", children: "Perfil de Usuario" }),
                /* @__PURE__ */ jsx(DialogDescription, { className: "text-sm text-muted-foreground", children: "Aquí puedes ver y editar tu información de usuario." })
              ] }),
              /* @__PURE__ */ jsx(UserProfile, { appearance: { elements: { menuItem__emailAddresses: { display: "none" }, profileSection__emailAddresses: { display: "none" } } } })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
          /* @__PURE__ */ jsx(SignOutButton, { children: /* @__PURE__ */ jsxs(DropdownMenuItem, { children: [
            /* @__PURE__ */ jsx(LogOut, {}),
            "Cerrar sesión"
          ] }) })
        ]
      }
    )
  ] }) }) });
}
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}) {
  const defaultClassNames = getDefaultClassNames();
  return /* @__PURE__ */ jsx(
    DayPicker,
    {
      showOutsideDays,
      className: cn(
        "bg-background group/calendar p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      ),
      captionLayout,
      formatters: {
        formatMonthDropdown: (date) => date.toLocaleString("default", { month: "short" }),
        ...formatters
      },
      classNames: {
        root: cn("w-fit", defaultClassNames.root),
        months: cn(
          "flex gap-4 flex-col md:flex-row relative",
          defaultClassNames.months
        ),
        month: cn("flex flex-col w-full gap-4", defaultClassNames.month),
        nav: cn(
          "flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          "absolute bg-popover inset-0 opacity-0",
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          "select-none font-medium",
          captionLayout === "label" ? "text-sm" : "rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5",
          defaultClassNames.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none",
          defaultClassNames.weekday
        ),
        week: cn("flex w-full mt-2", defaultClassNames.week),
        week_number_header: cn(
          "select-none w-(--cell-size)",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "text-[0.8rem] select-none text-muted-foreground",
          defaultClassNames.week_number
        ),
        day: cn(
          "relative w-full h-full p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none",
          defaultClassNames.day
        ),
        range_start: cn(
          "rounded-l-md bg-accent",
          defaultClassNames.range_start
        ),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn("rounded-r-md bg-accent", defaultClassNames.range_end),
        today: cn(
          "bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none",
          defaultClassNames.today
        ),
        outside: cn(
          "text-muted-foreground aria-selected:text-muted-foreground",
          defaultClassNames.outside
        ),
        disabled: cn(
          "text-muted-foreground opacity-50",
          defaultClassNames.disabled
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames
      },
      components: {
        Root: ({ className: className2, rootRef, ...props2 }) => {
          return /* @__PURE__ */ jsx(
            "div",
            {
              "data-slot": "calendar",
              ref: rootRef,
              className: cn(className2),
              ...props2
            }
          );
        },
        Chevron: ({ className: className2, orientation, ...props2 }) => {
          if (orientation === "left") {
            return /* @__PURE__ */ jsx(ChevronLeftIcon, { className: cn("size-4", className2), ...props2 });
          }
          if (orientation === "right") {
            return /* @__PURE__ */ jsx(
              ChevronRightIcon,
              {
                className: cn("size-4", className2),
                ...props2
              }
            );
          }
          return /* @__PURE__ */ jsx(ChevronDownIcon, { className: cn("size-4", className2), ...props2 });
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props2 }) => {
          return /* @__PURE__ */ jsx("td", { ...props2, children: /* @__PURE__ */ jsx("div", { className: "flex size-(--cell-size) items-center justify-center text-center", children }) });
        },
        ...components
      },
      ...props
    }
  );
}
function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}) {
  const defaultClassNames = getDefaultClassNames();
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);
  return /* @__PURE__ */ jsx(
    Button,
    {
      ref,
      variant: "ghost",
      size: "icon",
      "data-day": day.date.toLocaleDateString(),
      "data-selected-single": modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle,
      "data-range-start": modifiers.range_start,
      "data-range-end": modifiers.range_end,
      "data-range-middle": modifiers.range_middle,
      className: cn(
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 dark:hover:text-accent-foreground flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md [&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className
      ),
      ...props
    }
  );
}
function Popover({
  ...props
}) {
  return /* @__PURE__ */ jsx(PopoverPrimitive.Root, { "data-slot": "popover", ...props });
}
function PopoverTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(PopoverPrimitive.Trigger, { "data-slot": "popover-trigger", ...props });
}
function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}) {
  return /* @__PURE__ */ jsx(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsx(
    PopoverPrimitive.Content,
    {
      "data-slot": "popover-content",
      align,
      sideOffset,
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
        className
      ),
      ...props
    }
  ) });
}
function NavCalendar({}) {
  const [dateSelected, setDateSelected] = useState(void 0);
  return /* @__PURE__ */ jsx(SidebarMenu, { children: /* @__PURE__ */ jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxs(Popover, { children: [
    /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(SidebarMenuButton, { className: cn(buttonVariants({ variant: "outline", size: "default" }), "w-full justify-start font-normal group-data-[collapsible=icon]:!p-1.5"), children: [
      /* @__PURE__ */ jsx(CalendarIcon, { className: " h-4 w-4 opacity-50" }),
      dateSelected?.from ? /* @__PURE__ */ jsxs("span", { className: "group-data-[collapsible=icon]:hidden block", children: [
        format(new Date(dateSelected.from), "d MMM yyyy", { locale: es }),
        dateSelected.to ? ` - ${format(new Date(dateSelected.to), "d MMM yyyy", { locale: es })}` : ""
      ] }) : /* @__PURE__ */ jsx("span", { className: "group-data-[collapsible=icon]:hidden block", children: "Selecciona una fecha" })
    ] }) }),
    /* @__PURE__ */ jsx(PopoverContent, { className: "z-9999 w-auto p-0", align: "start", children: /* @__PURE__ */ jsx(
      Calendar,
      {
        mode: "range",
        numberOfMonths: 2,
        captionLayout: "dropdown",
        selected: dateSelected,
        onSelect: (date) => date?.from ? setDateSelected(date) : setDateSelected(void 0),
        disabled: (date) => date < /* @__PURE__ */ new Date("1900-01-01"),
        initialFocus: true
      }
    ) })
  ] }) }) });
}
const data = {
  projects: [
    {
      name: "Retiros",
      url: "/retiros",
      icon: CreditCardIcon
    },
    {
      name: "Métricas",
      url: "/metricas",
      icon: ChartLineIcon
    },
    {
      name: "Marketing",
      url: "/marketing",
      icon: SpeechIcon
    },
    {
      name: "Jugadores",
      url: "#",
      icon: UserIcon
    },
    {
      name: "Bonos",
      url: "#",
      icon: GiftIcon
    },
    {
      name: "Depósitos",
      url: "#",
      icon: HandCoinsIcon
    },
    {
      name: "Sportsbook",
      url: "#",
      icon: BookIcon
    },
    {
      name: "Alcances",
      url: "#",
      icon: ChartLineIcon
    },
    {
      name: "Benchmark",
      url: "#",
      icon: ChartNoAxesCombinedIcon
    }
  ]
};
function AppSidebar({ ...props }) {
  return /* @__PURE__ */ jsxs(Sidebar, { className: "ml-10 my-auto max-h-[95vh] rounded-2xl bg-white pl-0", collapsible: "icon", ...props, children: [
    /* @__PURE__ */ jsx(SidebarHeader, { className: "rounded-t-3xl mt-5 px-6", children: /* @__PURE__ */ jsx(SidebarGroupLabel, { className: "text-lg font-bold text-black", children: "Menú" }) }),
    /* @__PURE__ */ jsx(SidebarContent, { className: "overflow-hidden ", children: /* @__PURE__ */ jsx(NavProjects, { projects: data.projects }) }),
    /* @__PURE__ */ jsxs(SidebarFooter, { className: "px-7 group-data-[collapsible=icon]:px-2", children: [
      /* @__PURE__ */ jsx(SidebarGroupLabel, { className: "text-base px-0 font-bold text-black", children: "Filtrar período" }),
      /* @__PURE__ */ jsx(NavCalendar, {}),
      /* @__PURE__ */ jsx(NavUser, {})
    ] }),
    /* @__PURE__ */ jsx(SidebarRail, { className: "rounded-3xl max-h-[90cqh] my-auto" })
  ] });
}
function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  }
  if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup === "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup === "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}
function useComposedRefs(...refs) {
  return React.useCallback(composeRefs(...refs), refs);
}
const DATA_TOP_SCROLL = "data-top-scroll";
const DATA_BOTTOM_SCROLL = "data-bottom-scroll";
const DATA_LEFT_SCROLL = "data-left-scroll";
const DATA_RIGHT_SCROLL = "data-right-scroll";
const DATA_TOP_BOTTOM_SCROLL = "data-top-bottom-scroll";
const DATA_LEFT_RIGHT_SCROLL = "data-left-right-scroll";
const scrollerVariants = cva("", {
  variants: {
    orientation: {
      vertical: [
        "overflow-y-auto",
        "data-[top-scroll=true]:[mask-image:linear-gradient(0deg,#000_calc(100%_-_var(--scroll-shadow-size)),transparent)]",
        "data-[bottom-scroll=true]:[mask-image:linear-gradient(180deg,#000_calc(100%_-_var(--scroll-shadow-size)),transparent)]",
        "data-[top-bottom-scroll=true]:[mask-image:linear-gradient(#000,#000,transparent_0,#000_var(--scroll-shadow-size),#000_calc(100%_-_var(--scroll-shadow-size)),transparent)]"
      ],
      horizontal: [
        "overflow-x-auto",
        "data-[left-scroll=true]:[mask-image:linear-gradient(270deg,#000_calc(100%_-_var(--scroll-shadow-size)),transparent)]",
        "data-[right-scroll=true]:[mask-image:linear-gradient(90deg,#000_calc(100%_-_var(--scroll-shadow-size)),transparent)]",
        "data-[left-right-scroll=true]:[mask-image:linear-gradient(to_right,#000,#000,transparent_0,#000_var(--scroll-shadow-size),#000_calc(100%_-_var(--scroll-shadow-size)),transparent)]"
      ]
    },
    hideScrollbar: {
      true: "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
      false: ""
    }
  },
  defaultVariants: {
    orientation: "vertical",
    hideScrollbar: false
  }
});
const Scroller = React.forwardRef(
  (props, forwardedRef) => {
    const {
      orientation = "vertical",
      hideScrollbar,
      className,
      size = 40,
      offset = 0,
      scrollStep = 40,
      style,
      asChild,
      withNavigation = false,
      scrollTriggerMode = "press",
      ...scrollerProps
    } = props;
    const containerRef = React.useRef(null);
    const composedRef = useComposedRefs(forwardedRef, containerRef);
    const [scrollVisibility, setScrollVisibility] = React.useState({
      up: false,
      down: false,
      left: false,
      right: false
    });
    const onScrollBy = React.useCallback(
      (direction) => {
        const container = containerRef.current;
        if (!container) return;
        const scrollMap = {
          up: () => container.scrollTop -= scrollStep,
          down: () => container.scrollTop += scrollStep,
          left: () => container.scrollLeft -= scrollStep,
          right: () => container.scrollLeft += scrollStep
        };
        scrollMap[direction]();
      },
      [scrollStep]
    );
    const scrollHandlers = React.useMemo(
      () => ({
        up: () => onScrollBy("up"),
        down: () => onScrollBy("down"),
        left: () => onScrollBy("left"),
        right: () => onScrollBy("right")
      }),
      [onScrollBy]
    );
    React.useLayoutEffect(() => {
      const container = containerRef.current;
      if (!container) return;
      function onScroll() {
        if (!container) return;
        const isVertical = orientation === "vertical";
        if (isVertical) {
          const scrollTop = container.scrollTop;
          const clientHeight = container.clientHeight;
          const scrollHeight = container.scrollHeight;
          if (withNavigation) {
            setScrollVisibility((prev) => {
              const newUp = scrollTop > offset;
              const newDown = scrollTop + clientHeight < scrollHeight;
              if (prev.up !== newUp || prev.down !== newDown) {
                return {
                  ...prev,
                  up: newUp,
                  down: newDown
                };
              }
              return prev;
            });
          }
          const hasTopScroll = scrollTop > offset;
          const hasBottomScroll = scrollTop + clientHeight + offset < scrollHeight;
          const isVerticallyScrollable = scrollHeight > clientHeight;
          if (hasTopScroll && hasBottomScroll && isVerticallyScrollable) {
            container.setAttribute(DATA_TOP_BOTTOM_SCROLL, "true");
            container.removeAttribute(DATA_TOP_SCROLL);
            container.removeAttribute(DATA_BOTTOM_SCROLL);
          } else {
            container.removeAttribute(DATA_TOP_BOTTOM_SCROLL);
            if (hasTopScroll) container.setAttribute(DATA_TOP_SCROLL, "true");
            else container.removeAttribute(DATA_TOP_SCROLL);
            if (hasBottomScroll && isVerticallyScrollable)
              container.setAttribute(DATA_BOTTOM_SCROLL, "true");
            else container.removeAttribute(DATA_BOTTOM_SCROLL);
          }
        }
        const scrollLeft = container.scrollLeft;
        const clientWidth = container.clientWidth;
        const scrollWidth = container.scrollWidth;
        if (withNavigation) {
          setScrollVisibility((prev) => {
            const newLeft = scrollLeft > offset;
            const newRight = scrollLeft + clientWidth < scrollWidth;
            if (prev.left !== newLeft || prev.right !== newRight) {
              return {
                ...prev,
                left: newLeft,
                right: newRight
              };
            }
            return prev;
          });
        }
        const hasLeftScroll = scrollLeft > offset;
        const hasRightScroll = scrollLeft + clientWidth + offset < scrollWidth;
        const isHorizontallyScrollable = scrollWidth > clientWidth;
        if (hasLeftScroll && hasRightScroll && isHorizontallyScrollable) {
          container.setAttribute(DATA_LEFT_RIGHT_SCROLL, "true");
          container.removeAttribute(DATA_LEFT_SCROLL);
          container.removeAttribute(DATA_RIGHT_SCROLL);
        } else {
          container.removeAttribute(DATA_LEFT_RIGHT_SCROLL);
          if (hasLeftScroll) container.setAttribute(DATA_LEFT_SCROLL, "true");
          else container.removeAttribute(DATA_LEFT_SCROLL);
          if (hasRightScroll && isHorizontallyScrollable)
            container.setAttribute(DATA_RIGHT_SCROLL, "true");
          else container.removeAttribute(DATA_RIGHT_SCROLL);
        }
      }
      onScroll();
      container.addEventListener("scroll", onScroll);
      window.addEventListener("resize", onScroll);
      return () => {
        container.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      };
    }, [orientation, offset, withNavigation]);
    const composedStyle = React.useMemo(
      () => ({
        "--scroll-shadow-size": `${size}px`,
        ...style
      }),
      [size, style]
    );
    const activeDirections = React.useMemo(() => {
      if (!withNavigation) return [];
      return orientation === "vertical" ? ["up", "down"] : ["left", "right"];
    }, [orientation, withNavigation]);
    const ScrollerPrimitive = asChild ? Slot : "div";
    const ScrollerImpl = /* @__PURE__ */ jsx(
      ScrollerPrimitive,
      {
        "data-slot": "scroller",
        ...scrollerProps,
        ref: composedRef,
        style: composedStyle,
        className: cn(
          scrollerVariants({ orientation, hideScrollbar, className })
        )
      }
    );
    const navigationButtons = React.useMemo(() => {
      if (!withNavigation) return null;
      return activeDirections.filter((direction) => scrollVisibility[direction]).map((direction) => /* @__PURE__ */ jsx(
        ScrollButton,
        {
          "data-slot": "scroll-button",
          direction,
          onClick: scrollHandlers[direction],
          triggerMode: scrollTriggerMode
        },
        direction
      ));
    }, [
      activeDirections,
      scrollVisibility,
      scrollHandlers,
      scrollTriggerMode,
      withNavigation
    ]);
    if (withNavigation) {
      return /* @__PURE__ */ jsxs("div", { className: "relative w-full", children: [
        navigationButtons,
        ScrollerImpl
      ] });
    }
    return ScrollerImpl;
  }
);
Scroller.displayName = "Scroller";
const scrollButtonVariants = cva(
  "absolute z-10 transition-opacity [&>svg]:size-4 [&>svg]:opacity-80 hover:[&>svg]:opacity-100",
  {
    variants: {
      direction: {
        up: "-translate-x-1/2 top-2 left-1/2",
        down: "-translate-x-1/2 bottom-2 left-1/2",
        left: "-translate-y-1/2 top-1/2 left-2",
        right: "-translate-y-1/2 top-1/2 right-2"
      }
    },
    defaultVariants: {
      direction: "up"
    }
  }
);
const directionToIcon = {
  up: ChevronUp,
  down: ChevronDown,
  left: ChevronLeft,
  right: ChevronRight
};
const ScrollButton = React.forwardRef(
  (props, forwardedRef) => {
    const {
      direction,
      className,
      triggerMode = "press",
      onClick,
      ...buttonProps
    } = props;
    const [autoScrollTimer, setAutoScrollTimer] = React.useState(
      null
    );
    const onAutoScrollStart = React.useCallback(
      (event) => {
        if (autoScrollTimer !== null) return;
        if (triggerMode === "press") {
          const timer = window.setInterval(onClick ?? (() => {
          }), 50);
          setAutoScrollTimer(timer);
        } else if (triggerMode === "hover") {
          const timer = window.setInterval(() => {
            if (event) onClick?.(event);
          }, 50);
          setAutoScrollTimer(timer);
        }
      },
      [autoScrollTimer, onClick, triggerMode]
    );
    const onAutoScrollStop = React.useCallback(() => {
      if (autoScrollTimer === null) return;
      window.clearInterval(autoScrollTimer);
      setAutoScrollTimer(null);
    }, [autoScrollTimer]);
    const eventHandlers = React.useMemo(() => {
      const triggerModeHandlers = {
        press: {
          onPointerDown: onAutoScrollStart,
          onPointerUp: onAutoScrollStop,
          onPointerLeave: onAutoScrollStop,
          onClick: () => {
          }
        },
        hover: {
          onPointerEnter: onAutoScrollStart,
          onPointerLeave: onAutoScrollStop,
          onClick: () => {
          }
        },
        click: {
          onClick
        }
      };
      return triggerModeHandlers[triggerMode] ?? {};
    }, [triggerMode, onAutoScrollStart, onAutoScrollStop, onClick]);
    React.useEffect(() => {
      return () => onAutoScrollStop();
    }, [onAutoScrollStop]);
    const Icon = directionToIcon[direction];
    return /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        ...buttonProps,
        ...eventHandlers,
        ref: forwardedRef,
        className: cn(scrollButtonVariants({ direction, className })),
        children: /* @__PURE__ */ jsx(Icon, {})
      }
    );
  }
);
ScrollButton.displayName = "ScrollButton";
async function loader(args) {
  const CLERK_SIGN_IN_FORCE_REDIRECT_URL = process.env.CLERK_SIGN_IN_FORCE_REDIRECT_URL;
  const CLERK_SIGN_IN_URL = process.env.CLERK_SIGN_IN_URL;
  if (!CLERK_SIGN_IN_FORCE_REDIRECT_URL) {
    throw new Error("Add your Clerk Sign In Force Redirect URL to the .env file");
  } else if (!CLERK_SIGN_IN_URL) {
    throw new Error("Add your Clerk Sign In URL to the .env file");
  }
  const {
    userId
  } = await getAuth(args);
  if (!userId) {
    return redirect(`${CLERK_SIGN_IN_URL}/sign-in?redirect_url=${CLERK_SIGN_IN_FORCE_REDIRECT_URL}/retiros`);
  }
}
const _layout = UNSAFE_withComponentProps(function Layout2() {
  return /* @__PURE__ */ jsx("div", {
    className: "h-screen w-scree bg-[#F7F7F7] mx-auto flex justify-center items-center",
    children: /* @__PURE__ */ jsx("div", {
      className: "w-full relative",
      children: /* @__PURE__ */ jsxs(SidebarProvider, {
        children: [/* @__PURE__ */ jsx(AppSidebar, {}), /* @__PURE__ */ jsxs(SidebarInset, {
          className: "md:ml-15 w-full  mx-5 sm:mx-10  my-auto max-h-[95vh] overflow-hidden bg-[#F7F7F7]",
          children: [/* @__PURE__ */ jsx("header", {
            className: " md:hidden md:fix flex h-fit shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12",
            children: /* @__PURE__ */ jsx(SidebarTrigger, {
              className: "-ml-1"
            })
          }), /* @__PURE__ */ jsx(Scroller, {
            hideScrollbar: true,
            className: "h-[95vh] overflow-x-hidden ",
            children: /* @__PURE__ */ jsx(Outlet, {})
          })]
        })]
      })
    })
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _layout,
  loader
}, Symbol.toStringTag, { value: "Module" }));
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card border-2 text-card-foreground flex flex-col gap-6 rounded-xl py-6",
        className
      ),
      ...props
    }
  );
}
function CardHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-header",
      className: cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      ),
      ...props
    }
  );
}
function CardTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-title",
      className: cn("leading-none font-semibold", className),
      ...props
    }
  );
}
function CardDescription({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-6", className),
      ...props
    }
  );
}
const THEMES = { light: "", dark: ".dark" };
const ChartContext = React.createContext(null);
function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }
  return context;
}
function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}) {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;
  return /* @__PURE__ */ jsx(ChartContext.Provider, { value: { config }, children: /* @__PURE__ */ jsxs(
    "div",
    {
      "data-slot": "chart",
      "data-chart": chartId,
      className: cn(
        "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border flex aspect-video justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx(ChartStyle, { id: chartId, config }),
        /* @__PURE__ */ jsx(RechartsPrimitive.ResponsiveContainer, { children })
      ]
    }
  ) });
}
const ChartStyle = ({ id, config }) => {
  const colorConfig = Object.entries(config).filter(
    ([, config2]) => config2.theme || config2.color
  );
  if (!colorConfig.length) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    "style",
    {
      dangerouslySetInnerHTML: {
        __html: Object.entries(THEMES).map(
          ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig.map(([key, itemConfig]) => {
            const color = itemConfig.theme?.[theme] || itemConfig.color;
            return color ? `  --color-${key}: ${color};` : null;
          }).join("\n")}
}
`
        ).join("\n")
      }
    }
  );
};
const ChartTooltip = RechartsPrimitive.Tooltip;
function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey
}) {
  const { config } = useChart();
  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload?.length) {
      return null;
    }
    const [item] = payload;
    const key = `${labelKey || item?.dataKey || item?.name || "value"}`;
    const itemConfig = getPayloadConfigFromPayload(config, item, key);
    const value = !labelKey && typeof label === "string" ? config[label]?.label || label : itemConfig?.label;
    if (labelFormatter) {
      return /* @__PURE__ */ jsx("div", { className: cn("font-medium", labelClassName), children: labelFormatter(value, payload) });
    }
    if (!value) {
      return null;
    }
    return /* @__PURE__ */ jsx("div", { className: cn("font-medium", labelClassName), children: value });
  }, [
    label,
    labelFormatter,
    payload,
    hideLabel,
    labelClassName,
    config,
    labelKey
  ]);
  if (!active || !payload?.length) {
    return null;
  }
  const nestLabel = payload.length === 1 && indicator !== "dot";
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl",
        className
      ),
      children: [
        !nestLabel ? tooltipLabel : null,
        /* @__PURE__ */ jsx("div", { className: "grid gap-1.5", children: payload.map((item, index) => {
          const key = `${nameKey || item.name || item.dataKey || "value"}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);
          const indicatorColor = color || item.payload.fill || item.color;
          return /* @__PURE__ */ jsx(
            "div",
            {
              className: cn(
                "[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5",
                indicator === "dot" && "items-center"
              ),
              children: formatter && item?.value !== void 0 && item.name ? formatter(item.value, item.name, item, index, item.payload) : /* @__PURE__ */ jsxs(Fragment, { children: [
                itemConfig?.icon ? /* @__PURE__ */ jsx(itemConfig.icon, {}) : !hideIndicator && /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: cn(
                      "shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)",
                      {
                        "h-2.5 w-2.5": indicator === "dot",
                        "w-1": indicator === "line",
                        "w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed",
                        "my-0.5": nestLabel && indicator === "dashed"
                      }
                    ),
                    style: {
                      "--color-bg": indicatorColor,
                      "--color-border": indicatorColor
                    }
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: cn(
                      "flex flex-1 justify-between leading-none",
                      nestLabel ? "items-end" : "items-center"
                    ),
                    children: [
                      /* @__PURE__ */ jsxs("div", { className: "grid gap-1.5", children: [
                        nestLabel ? tooltipLabel : null,
                        /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: itemConfig?.label || item.name })
                      ] }),
                      item.value && /* @__PURE__ */ jsx("span", { className: "text-foreground font-mono font-medium tabular-nums", children: item.value.toLocaleString() })
                    ]
                  }
                )
              ] })
            },
            item.dataKey
          );
        }) })
      ]
    }
  );
}
function getPayloadConfigFromPayload(config, payload, key) {
  if (typeof payload !== "object" || payload === null) {
    return void 0;
  }
  const payloadPayload = "payload" in payload && typeof payload.payload === "object" && payload.payload !== null ? payload.payload : void 0;
  let configLabelKey = key;
  if (key in payload && typeof payload[key] === "string") {
    configLabelKey = payload[key];
  } else if (payloadPayload && key in payloadPayload && typeof payloadPayload[key] === "string") {
    configLabelKey = payloadPayload[key];
  }
  return configLabelKey in config ? config[configLabelKey] : config[key];
}
const chartData$3 = [
  { date: "2024-04-01", desktop: 222, mobile: 150 },
  { date: "2024-04-02", desktop: 97, mobile: 180 },
  { date: "2024-04-03", desktop: 167, mobile: 120 },
  { date: "2024-04-04", desktop: 242, mobile: 260 },
  { date: "2024-04-05", desktop: 373, mobile: 290 },
  { date: "2024-04-06", desktop: 301, mobile: 340 },
  { date: "2024-04-07", desktop: 245, mobile: 180 },
  { date: "2024-04-08", desktop: 409, mobile: 320 },
  { date: "2024-04-09", desktop: 59, mobile: 110 },
  { date: "2024-04-10", desktop: 261, mobile: 190 },
  { date: "2024-04-11", desktop: 327, mobile: 350 },
  { date: "2024-04-12", desktop: 292, mobile: 210 },
  { date: "2024-04-13", desktop: 342, mobile: 380 },
  { date: "2024-04-14", desktop: 137, mobile: 220 },
  { date: "2024-04-15", desktop: 120, mobile: 170 },
  { date: "2024-04-16", desktop: 138, mobile: 190 },
  { date: "2024-04-17", desktop: 446, mobile: 360 },
  { date: "2024-04-18", desktop: 364, mobile: 410 },
  { date: "2024-04-19", desktop: 243, mobile: 180 },
  { date: "2024-04-20", desktop: 89, mobile: 150 },
  { date: "2024-04-21", desktop: 137, mobile: 200 },
  { date: "2024-04-22", desktop: 224, mobile: 170 },
  { date: "2024-04-23", desktop: 138, mobile: 230 },
  { date: "2024-04-24", desktop: 387, mobile: 290 },
  { date: "2024-04-25", desktop: 215, mobile: 250 },
  { date: "2024-04-26", desktop: 75, mobile: 130 },
  { date: "2024-04-27", desktop: 383, mobile: 420 },
  { date: "2024-04-28", desktop: 122, mobile: 180 }
];
const chartConfig$3 = {
  views: {
    label: "Page Views"
  },
  desktop: {
    label: "Desktop",
    color: "var(--chart-2)"
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-1)"
  }
};
function BarChartMarketing({ className, title, description: description2 }) {
  return /* @__PURE__ */ jsxs(Card, { className: `w-full h-full pb-0 border-0 col-span-1 min-h-96 md:min-h-0 ${className}`, children: [
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsx(CardTitle, { className: "text-xl font-semibold", children: title }),
      /* @__PURE__ */ jsx(CardDescription, { className: "text-sm text-muted-foreground", children: description2 ?? "Visitantes únicos en los últimos 28 días" })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { className: "relative sm:pt-0 h-[calc(100%-theme(spacing.24))]", children: /* @__PURE__ */ jsx(ChartContainer, { config: chartConfig$3, className: "h-full !aspect-auto ", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(
      BarChart,
      {
        accessibilityLayer: true,
        data: chartData$3,
        margin: {
          left: -30
        },
        children: [
          /* @__PURE__ */ jsx(CartesianGrid, { vertical: false }),
          /* @__PURE__ */ jsx(
            XAxis,
            {
              dataKey: "date",
              tickLine: false,
              axisLine: false,
              tickMargin: 8,
              minTickGap: 32,
              tickFormatter: (value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric"
                });
              }
            }
          ),
          /* @__PURE__ */ jsx(
            YAxis,
            {
              type: "number",
              domain: [0, "dataMax"],
              tickFormatter: (value) => `${value}`
            }
          ),
          /* @__PURE__ */ jsx(
            ChartTooltip,
            {
              content: /* @__PURE__ */ jsx(
                ChartTooltipContent,
                {
                  className: "w-[150px]",
                  nameKey: "views",
                  labelFormatter: (value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    });
                  }
                }
              )
            }
          ),
          /* @__PURE__ */ jsx(Bar, { dataKey: "desktop", fill: "var(--color-lunes)", radius: 8 })
        ]
      }
    ) }) }) })
  ] });
}
const Progress = React.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ jsx(
  ProgressPrimitive.Root,
  {
    ref,
    className: cn("bg-secondary relative h-4 w-full overflow-hidden rounded-full", className),
    ...props,
    children: /* @__PURE__ */ jsx(
      ProgressPrimitive.Indicator,
      {
        className: "bg-primary-folatti h-full w-full flex-1 transition-all",
        style: { transform: `translateX(-${100 - (value || 0)}%)` }
      }
    )
  }
));
Progress.displayName = ProgressPrimitive.Root.displayName;
function TrafficSources({ className, trafficSources }) {
  const totalAllVisits = trafficSources.reduce((sum, src) => sum + src.totalVisits, 0);
  return /* @__PURE__ */ jsxs(Card, { className: cn(`w-full h-fit md:h-full md:pb-0 border-0 col-span-1`, className), children: [
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsx(CardTitle, { className: "text-xl font-semibold", children: "Fuentes de Tráfico" }),
      /* @__PURE__ */ jsx(CardDescription, { className: "text-sm text-muted-foreground", children: "De dónde vienen tus visitantes" })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { className: "relative sm:pt-0 h-full", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col justify-betweenh-full", children: trafficSources.map((source) => {
      const impactPercentage = source.totalVisits / totalAllVisits * 100;
      return /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ jsx("span", { className: "text-base font-medium", children: source.source }),
        /* @__PURE__ */ jsxs("div", { className: "w-full flex items-start gap-2", children: [
          /* @__PURE__ */ jsx(
            Progress,
            {
              className: "h-3",
              value: impactPercentage
            }
          ),
          /* @__PURE__ */ jsx(NumberFlowGroup, { children: /* @__PURE__ */ jsxs(
            "div",
            {
              style: { ["--number-flow-char-height"]: "0.85em" },
              className: "flex flex-col items-center font-semibold -mt-1",
              children: [
                /* @__PURE__ */ jsx(
                  NumberFlow,
                  {
                    value: source.totalVisits,
                    locales: "en-US",
                    format: { style: "decimal" },
                    className: "text-sm text- font-bold"
                  }
                ),
                /* @__PURE__ */ jsx(
                  NumberFlow,
                  {
                    value: source.referenceVisits,
                    locales: "en-US",
                    format: { style: "percent", maximumFractionDigits: 2, signDisplay: "always" },
                    className: cn(
                      "text-xs transition-colors duration-300",
                      source.referenceVisits < 0 ? "text-red-500" : "text-emerald-500"
                    )
                  }
                )
              ]
            }
          ) })
        ] })
      ] }, source.source);
    }) }) })
  ] });
}
function TrafficTab({ trafficSources }) {
  return /* @__PURE__ */ jsxs("div", { className: "w-full h-full grid grid-cols-1 md:grid-cols-6 gap-6", children: [
    /* @__PURE__ */ jsx(BarChartMarketing, { className: "col-span-1 md:col-span-4", title: "Tráfico por día" }),
    /* @__PURE__ */ jsx(TrafficSources, { className: "col-span-1 md:col-span-2", trafficSources })
  ] });
}
const MotionNumberFlow$2 = motion.create(NumberFlow);
const MotionArrowUp$2 = motion.create(TrendingUp);
function GeneralCard({ value, Icon, title, description, label, percentageValue, valueFormat, className }) {
  const canAnimate = useCanAnimate();
  return /* @__PURE__ */ jsx(Card, { className: "border-0 h-full col-span-1", children: /* @__PURE__ */ jsxs(CardContent, { className: cn(`flex px-4 flex-col ${description ? "" : "gap-3"}`, className), children: [
    /* @__PURE__ */ jsxs("section", { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center gap-2", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold line-clamp-1", children: title }),
        /* @__PURE__ */ jsx(Icon, { size: 20, strokeWidth: 2, className: "text-primary-folatti" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-600 line-clamp-1", children: description }) })
    ] }),
    /* @__PURE__ */ jsx(
      NumberFlow,
      {
        value: valueFormat === "percent" ? value / 100 : value,
        locales: "en-US",
        format: { style: valueFormat, currency: "USD" },
        className: "text-4xl font-bold"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex xl:flex-row  lg:items-start lg:flex-col items-center justify-between w-full", children: [
      /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-600", children: label }),
      /* @__PURE__ */ jsx(
        MotionConfig,
        {
          transition: {
            layout: canAnimate ? { duration: 0.9, bounce: 0, type: "spring" } : { duration: 0 }
          },
          children: /* @__PURE__ */ jsxs(
            motion.span,
            {
              className: cn(
                percentageValue > 0 ? "bg-emerald-400" : "bg-red-500",
                "inline-flex gap-1 items-center px-[0.3em] text-lg text-white transition-colors duration-300"
              ),
              layout: true,
              style: { borderRadius: 999 },
              children: [
                /* @__PURE__ */ jsx(
                  MotionArrowUp$2,
                  {
                    className: "mr-0.5 size-[0.70em]",
                    absoluteStrokeWidth: true,
                    strokeWidth: 3,
                    layout: true,
                    transition: {
                      rotate: canAnimate ? { type: "spring", duration: 0.5, bounce: 0 } : { duration: 0 }
                    },
                    animate: { rotate: percentageValue > 0 ? 0 : -180 },
                    initial: false
                  }
                ),
                /* @__PURE__ */ jsx(
                  MotionNumberFlow$2,
                  {
                    value: percentageValue,
                    className: "font-medium text-sm",
                    format: { style: "percent", maximumFractionDigits: 2, signDisplay: "always" },
                    style: { ["--number-flow-char-height"]: "0.85em", ["--number-flow-mask-height"]: "0.3em" },
                    layout: true,
                    layoutRoot: true
                  }
                )
              ]
            }
          )
        }
      )
    ] })
  ] }) });
}
function ScrollArea({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    ScrollAreaPrimitive.Root,
    {
      "data-slot": "scroll-area",
      className: cn("relative", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx(
          ScrollAreaPrimitive.Viewport,
          {
            "data-slot": "scroll-area-viewport",
            className: "focus-visible:ring-ring/50 h-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1",
            children
          }
        ),
        /* @__PURE__ */ jsx(ScrollBar, {}),
        /* @__PURE__ */ jsx(ScrollAreaPrimitive.Corner, {})
      ]
    }
  );
}
function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    ScrollAreaPrimitive.ScrollAreaScrollbar,
    {
      "data-slot": "scroll-area-scrollbar",
      orientation,
      className: cn(
        "flex touch-none p-px transition-colors select-none",
        orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent",
        orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(
        ScrollAreaPrimitive.ScrollAreaThumb,
        {
          "data-slot": "scroll-area-thumb",
          className: "bg-border relative flex-1 rounded-full"
        }
      )
    }
  );
}
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}
function CampaignTab({ campaignValues, campaignPerformanceValues }) {
  return /* @__PURE__ */ jsxs("div", { className: "w-full h-full flex flex-col  gap-6", children: [
    /* @__PURE__ */ jsx("div", { className: "grid w-full h-fit grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: campaignValues.map((metric, index) => /* @__PURE__ */ jsx(
      GeneralCard,
      {
        value: metric.value,
        title: metric.title,
        Icon: metric.Icon,
        label: metric.label,
        percentageValue: metric.percentageValue,
        valueFormat: metric.valueFormat,
        className: "items-center justify-center"
      },
      index
    )) }),
    /* @__PURE__ */ jsxs(Card, { className: `w-full h-fit pb-0 border-0`, children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx(CardTitle, { className: "text-xl font-semibold", children: "Rendimiento de Campañas" }),
        /* @__PURE__ */ jsx(CardDescription, { className: "text-sm text-muted-foreground", children: "Resultados detallados de tus campañas activas" })
      ] }),
      /* @__PURE__ */ jsx(CardContent, { className: " @container-normal relative sm:pt-0 h-fit", children: /* @__PURE__ */ jsx(ScrollArea, { className: "w-full h-[500px] ", children: /* @__PURE__ */ jsx("div", { className: "h-fit w-full flex flex-col gap-4", children: campaignPerformanceValues.map((campaign, index) => /* @__PURE__ */ jsxs(Card, { className: "flex flex-row items-center justify-between px-3 py-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold", children: campaign.title }),
          /* @__PURE__ */ jsx(Badge, { className: "rounded-full px-4 bg-foreground", children: campaign.status === "active" ? "Activo" : campaign.status === "inactive" ? "Inactivo" : "Finalizado" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-6 text-sm text-foreground", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
            /* @__PURE__ */ jsx("span", { className: "font-bold text-base", children: (campaign.alcance * 100).toFixed(2).toLocaleString().slice(0, 3) }),
            /* @__PURE__ */ jsx("span", { className: "font-semibold -mt-2", children: "Alcance" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center ", children: [
            /* @__PURE__ */ jsxs("span", { className: "font-bold text-base", children: [
              (campaign.ctr * 100).toFixed(2).toLocaleString().slice(0, 3),
              "%"
            ] }),
            /* @__PURE__ */ jsx("span", { className: "font-semibold -mt-2", children: "CTR" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
            /* @__PURE__ */ jsx("span", { className: "font-bold text-base", children: (campaign.conversiones * 100).toFixed(2).toLocaleString().slice(0, 3) }),
            /* @__PURE__ */ jsx("span", { className: "font-semibold -mt-2", children: "Conversiones" })
          ] })
        ] })
      ] }, index)) }) }) })
    ] })
  ] });
}
function Tabs({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    TabsPrimitive.Root,
    {
      "data-slot": "tabs",
      className: cn("flex flex-col gap-2", className),
      ...props
    }
  );
}
const TabsList = React.forwardRef(({ className, ...props }, ref) => {
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0
  });
  const tabsListRef = useRef(null);
  const updateIndicator = React.useCallback(() => {
    if (!tabsListRef.current) return;
    const activeTab = tabsListRef.current.querySelector(
      '[data-state="active"]'
    );
    if (!activeTab) return;
    const activeRect = activeTab.getBoundingClientRect();
    const tabsRect = tabsListRef.current.getBoundingClientRect();
    requestAnimationFrame(() => {
      setIndicatorStyle({
        left: activeRect.left - tabsRect.left,
        top: activeRect.top - tabsRect.top,
        width: activeRect.width,
        height: activeRect.height
      });
    });
  }, []);
  const { state } = useSidebar();
  useEffect(() => {
    const timeoutId = setTimeout(updateIndicator, 300);
    return () => clearTimeout(timeoutId);
  }, [state]);
  useEffect(() => {
    const timeoutId = setTimeout(updateIndicator, 0);
    window.addEventListener("resize", updateIndicator);
    const observer = new MutationObserver(updateIndicator);
    if (tabsListRef.current) {
      observer.observe(tabsListRef.current, {
        attributes: true,
        childList: true,
        subtree: true
      });
    }
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", updateIndicator);
      observer.disconnect();
    };
  }, [updateIndicator]);
  return /* @__PURE__ */ jsxs("div", { className: "relative", ref: tabsListRef, children: [
    /* @__PURE__ */ jsx(
      TabsPrimitive.List,
      {
        ref,
        "data-slot": "tabs-list",
        className: cn(
          "bg-background text-muted-foreground relative inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
          className
        ),
        ...props
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute w-full flex justify-center items-end transition-all duration-300 ease-in-out",
        style: indicatorStyle,
        children: /* @__PURE__ */ jsx("div", { className: "w-10 border-b-2 border-foreground" })
      }
    )
  ] });
});
TabsList.displayName = TabsPrimitive.List.displayName;
const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Trigger,
  {
    ref,
    "data-slot": "tabs-trigger",
    className: cn(
      "data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 z-10",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
const TabsContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Content,
  {
    ref,
    "data-slot": "tabs-content",
    className: cn("flex-1 outline-none mt-2", className),
    ...props
  }
));
TabsContent.displayName = TabsPrimitive.Content.displayName;
const MotionNumberFlow$1 = motion.create(NumberFlow);
const MotionArrowUp$1 = motion.create(TrendingUp);
function PlayersTab() {
  const canAnimate = useCanAnimate();
  return /* @__PURE__ */ jsxs("div", { style: { containerType: "size" }, className: "w-full h-full flex flex-col gap-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "h-fit md:h-[65cqh] w-full grid grid-cols-1 md:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsx(BarChartMarketing, { className: "w-full h-full col-span-1 min-h-96 md:min-h-0", title: "Jugadores activos diarios", description: "Promedio: 1500" }),
      /* @__PURE__ */ jsx(BarChartMarketing, { className: "w-full h-full col-span-1 min-h-96 md:min-h-0", title: "Registros por días", description: "Nuevos usuarios registrados" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "h-full md:h-[35cqh] w-full grid grid-cols-2 md:grid-cols-6 gap-6", children: [
      /* @__PURE__ */ jsxs(Card, { className: "w-full h-full border-0 gap-0 col-span-2 md:col-span-3 lg:col-span-2 space-y-0", children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "text-xl font-semibold", children: "Retención 7 días" }) }),
        /* @__PURE__ */ jsx(CardContent, { className: " @container-normal relative sm:pt-0 h-full", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 justify-between h-full w-full", children: [
          /* @__PURE__ */ jsx("div", { className: "h-fit w-full flex gap-4", children: /* @__PURE__ */ jsx(
            NumberFlow,
            {
              value: 0.078,
              format: { style: "percent", maximumFractionDigits: 2 },
              className: "text-4xl font-bold"
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "flex xl:flex-row  lg:items-start lg:flex-col items-center justify-between w-full", children: /* @__PURE__ */ jsx(Progress, { value: 70, className: "" }) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "w-full h-full border-0 gap-0 col-span-2 md:col-span-3 lg:col-span-2 space-y-0", children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "text-xl font-semibold", children: "Sesión promedio" }) }),
        /* @__PURE__ */ jsx(CardContent, { className: " @container-normal flex relative sm:pt-0 h-full", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 justify-between h-full w-full", children: [
          /* @__PURE__ */ jsxs("div", { className: "h-fit w-full flex gap-4", children: [
            /* @__PURE__ */ jsx(
              NumberFlow,
              {
                value: 22,
                format: { style: "decimal" },
                suffix: "m",
                className: "text-4xl font-bold"
              }
            ),
            /* @__PURE__ */ jsx(
              NumberFlow,
              {
                value: 22,
                format: { style: "decimal" },
                suffix: "s",
                className: "text-4xl font-bold"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex xl:flex-row  lg:items-start items-center justify-between w-full", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-600", children: "Ultimos 28 días" }),
            /* @__PURE__ */ jsx(
              MotionConfig,
              {
                transition: {
                  layout: canAnimate ? { duration: 0.9, bounce: 0, type: "spring" } : { duration: 0 }
                },
                children: /* @__PURE__ */ jsxs(
                  motion.span,
                  {
                    className: cn(
                      "bg-emerald-400",
                      "inline-flex gap-1 items-center px-[0.3em] text-lg text-white transition-colors duration-300"
                    ),
                    layout: true,
                    style: { borderRadius: 999 },
                    children: [
                      /* @__PURE__ */ jsx(
                        MotionArrowUp$1,
                        {
                          className: "mr-0.5 size-[0.70em]",
                          absoluteStrokeWidth: true,
                          strokeWidth: 3,
                          layout: true,
                          transition: {
                            rotate: canAnimate ? { type: "spring", duration: 0.5, bounce: 0 } : { duration: 0 }
                          },
                          animate: { rotate: 0 },
                          initial: false
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        MotionNumberFlow$1,
                        {
                          value: 2,
                          className: "font-medium text-sm",
                          format: { style: "percent", maximumFractionDigits: 2, signDisplay: "always" },
                          style: { ["--number-flow-char-height"]: "0.85em", ["--number-flow-mask-height"]: "0.3em" },
                          layout: true,
                          layoutRoot: true
                        }
                      )
                    ]
                  }
                )
              }
            )
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "w-full h-full border-0 gap-0 col-span-2 md:col-span-6 lg:col-span-2 space-y-0", children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "text-xl font-semibold", children: "Sesión promedio" }) }),
        /* @__PURE__ */ jsx(CardContent, { className: " @container-normal relative sm:pt-0 h-full", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 justify-between h-full w-full", children: [
          /* @__PURE__ */ jsx("div", { className: "h-fit w-full flex gap-4", children: /* @__PURE__ */ jsx(
            NumberFlow,
            {
              value: 0.078,
              format: { style: "percent", maximumFractionDigits: 2 },
              className: "text-4xl font-bold"
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "flex xl:flex-row  lg:items-start items-center justify-between w-full", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-600", children: "Ultimos 28 días" }),
            /* @__PURE__ */ jsx(
              MotionConfig,
              {
                transition: {
                  layout: canAnimate ? { duration: 0.9, bounce: 0, type: "spring" } : { duration: 0 }
                },
                children: /* @__PURE__ */ jsxs(
                  motion.span,
                  {
                    className: cn(
                      "bg-emerald-400",
                      "inline-flex gap-1 items-center px-[0.3em] text-lg text-white transition-colors duration-300"
                    ),
                    layout: true,
                    style: { borderRadius: 999 },
                    children: [
                      /* @__PURE__ */ jsx(
                        MotionArrowUp$1,
                        {
                          className: "mr-0.5 size-[0.70em]",
                          absoluteStrokeWidth: true,
                          strokeWidth: 3,
                          layout: true,
                          transition: {
                            rotate: canAnimate ? { type: "spring", duration: 0.5, bounce: 0 } : { duration: 0 }
                          },
                          animate: { rotate: 0 },
                          initial: false
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        MotionNumberFlow$1,
                        {
                          value: 2,
                          className: "font-medium text-sm",
                          format: { style: "percent", maximumFractionDigits: 2, signDisplay: "always" },
                          style: { ["--number-flow-char-height"]: "0.85em", ["--number-flow-mask-height"]: "0.3em" },
                          layout: true,
                          layoutRoot: true
                        }
                      )
                    ]
                  }
                )
              }
            )
          ] })
        ] }) })
      ] })
    ] })
  ] });
}
const marketing = UNSAFE_withComponentProps(function Metricas() {
  const fetchData = () => {
    const random = Math.floor(Math.random() * 100.55);
    return (random - 40) / 1e3;
  };
  const fetchDataValue = () => {
    const random = Math.floor(Math.random() * 1e4);
    return random;
  };
  const fetchRandomVisits = () => {
    return Math.floor(Math.random() * 1500) + 100;
  };
  const fetchRandomPercentage = () => {
    const random = Math.floor(Math.random() * 100.55);
    return (random - 40) / 1e3;
  };
  const values = [{
    value: fetchDataValue(),
    valueFormat: "decimal",
    percentageValue: fetchData(),
    title: "Tráfico Total",
    Icon: ChartLine,
    label: "Últimos 28 días"
  }, {
    value: fetchDataValue(),
    valueFormat: "percent",
    percentageValue: fetchData(),
    title: "Bonus Rate ",
    Icon: BarChart3,
    label: "Últimos 28 días"
  }, {
    value: fetchDataValue(),
    valueFormat: "decimal",
    percentageValue: fetchData(),
    title: "Jugadores Únicos",
    Icon: Users,
    label: "Últimos 28 días"
  }, {
    value: fetchDataValue(),
    valueFormat: "decimal",
    percentageValue: fetchData(),
    title: "Registros Totales",
    Icon: UserRoundPlus,
    label: "Últimos 28 días"
  }];
  const campaignValues = [{
    value: fetchData(),
    valueFormat: "percent",
    percentageValue: fetchData(),
    title: "CTR Promedio",
    Icon: Circle,
    label: "Últimos 28 días"
  }, {
    value: fetchDataValue(),
    valueFormat: "percent",
    percentageValue: fetchData(),
    title: "Alcance Total",
    Icon: ChartLine,
    label: "Últimos 28 días"
  }, {
    value: fetchDataValue(),
    valueFormat: "decimal",
    percentageValue: fetchData(),
    title: "Conversiones",
    Icon: UserRoundPlus,
    label: "Últimos 28 días"
  }];
  const campaignPerformanceValues = [{
    title: "CTR Promedio",
    status: "active",
    alcance: fetchData(),
    ctr: fetchData(),
    conversiones: fetchData()
  }, {
    title: "Alcance Total",
    status: "active",
    alcance: fetchDataValue(),
    ctr: fetchData(),
    conversiones: fetchData()
  }, {
    title: "Conversiones",
    status: "inactive",
    alcance: fetchDataValue(),
    ctr: fetchData(),
    conversiones: fetchData()
  }];
  const trafficSources = [{
    source: "Directo",
    totalVisits: fetchRandomVisits(),
    referenceVisits: fetchRandomPercentage()
  }, {
    source: "Orgánico",
    totalVisits: fetchRandomVisits(),
    referenceVisits: fetchRandomPercentage()
  }, {
    source: "Referido",
    totalVisits: fetchRandomVisits(),
    referenceVisits: fetchRandomPercentage()
  }, {
    source: "Social",
    totalVisits: fetchRandomVisits(),
    referenceVisits: fetchRandomPercentage()
  }, {
    source: "Email",
    totalVisits: fetchRandomVisits(),
    referenceVisits: fetchRandomPercentage()
  }];
  return /* @__PURE__ */ jsxs("div", {
    className: "w-full flex flex-col gap-6 rounded-lg text-black h-full py-1",
    children: [/* @__PURE__ */ jsx("div", {
      className: "grid w-full h-fit grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
      children: values.map((metric, index) => /* @__PURE__ */ jsx(GeneralCard, {
        value: metric.value,
        title: metric.title,
        Icon: metric.Icon,
        label: metric.label,
        percentageValue: metric.percentageValue,
        valueFormat: metric.valueFormat
      }, index))
    }), /* @__PURE__ */ jsxs(Tabs, {
      defaultValue: "traffic",
      className: "w-full h-full",
      children: [/* @__PURE__ */ jsxs(ScrollArea, {
        className: "whitespace-nowrap",
        children: [/* @__PURE__ */ jsxs(TabsList, {
          className: "w-full",
          children: [/* @__PURE__ */ jsx(TabsTrigger, {
            value: "traffic",
            children: "Tráfico"
          }), /* @__PURE__ */ jsx(TabsTrigger, {
            value: "campaigns",
            children: "Campañas"
          }), /* @__PURE__ */ jsx(TabsTrigger, {
            value: "players",
            children: "Jugadores"
          })]
        }), /* @__PURE__ */ jsx(ScrollBar, {
          orientation: "horizontal"
        })]
      }), /* @__PURE__ */ jsx(TabsContent, {
        className: "w-full h-full",
        value: "traffic",
        children: /* @__PURE__ */ jsx(TrafficTab, {
          trafficSources
        })
      }), /* @__PURE__ */ jsx(TabsContent, {
        className: "w-full h-full",
        value: "campaigns",
        children: /* @__PURE__ */ jsx(CampaignTab, {
          campaignPerformanceValues,
          campaignValues
        })
      }), /* @__PURE__ */ jsx(TabsContent, {
        className: "w-full h-full",
        value: "players",
        children: /* @__PURE__ */ jsx(PlayersTab, {})
      })]
    })]
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: marketing
}, Symbol.toStringTag, { value: "Module" }));
const chartData$2 = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 }
];
const chartConfig$2 = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)"
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)"
  }
};
function ChartLineLabel({ title }) {
  return /* @__PURE__ */ jsxs(Card, { className: "w-full h-ful border-0 pb-0 col-span-1", children: [
    /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "text-xl font-semibold", children: title }) }),
    /* @__PURE__ */ jsx(CardContent, { className: " h-[calc(100%-theme(spacing.24))]", children: /* @__PURE__ */ jsx(ChartContainer, { config: chartConfig$2, className: "h-[150px] !aspect-auto", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(LineChart, { data: chartData$2, margin: { top: 20, right: 30, bottom: 20, left: 20 }, children: [
      /* @__PURE__ */ jsx(CartesianGrid, { vertical: false }),
      /* @__PURE__ */ jsx(
        XAxis,
        {
          dataKey: "month",
          tickLine: false,
          axisLine: false,
          tickMargin: 8,
          tickFormatter: (value) => value.slice(0, 3)
        }
      ),
      /* @__PURE__ */ jsx(
        ChartTooltip,
        {
          cursor: false,
          content: /* @__PURE__ */ jsx(ChartTooltipContent, { indicator: "line" })
        }
      ),
      /* @__PURE__ */ jsx(
        Line,
        {
          dataKey: "desktop",
          type: "natural",
          stroke: "var(--color-lunes)",
          strokeWidth: 2,
          dot: {
            stroke: "var(--color-green-folatti)"
          },
          activeDot: {
            r: 6
          },
          children: /* @__PURE__ */ jsx(
            LabelList,
            {
              position: "top",
              offset: 12,
              className: "fill-foreground",
              fontSize: 12
            }
          )
        }
      )
    ] }) }) }) })
  ] });
}
const chartData$1 = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 }
];
const chartConfig$1 = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)"
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)"
  }
};
function ChartLineLabelBottom({ className, title }) {
  return /* @__PURE__ */ jsxs(Card, { className: `w-full h-full pb-0 border-0 col-span-1 ${className}`, children: [
    /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "text-xl font-semibold", children: title }) }),
    /* @__PURE__ */ jsx(CardContent, { className: "relative sm:pt-0 h-[calc(100%-theme(spacing.24))]", children: /* @__PURE__ */ jsx(ChartContainer, { config: chartConfig$1, className: "h-[25cqh] !aspect-auto", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(LineChart, { data: chartData$1, margin: { top: 20, right: 30, bottom: 20, left: 20 }, children: [
      /* @__PURE__ */ jsx(CartesianGrid, { vertical: false }),
      /* @__PURE__ */ jsx(
        XAxis,
        {
          dataKey: "month",
          tickLine: false,
          axisLine: false,
          tickMargin: 8,
          tickFormatter: (value) => value.slice(0, 3)
        }
      ),
      /* @__PURE__ */ jsx(
        ChartTooltip,
        {
          cursor: false,
          content: /* @__PURE__ */ jsx(ChartTooltipContent, { indicator: "line" })
        }
      ),
      /* @__PURE__ */ jsx(
        Line,
        {
          dataKey: "desktop",
          type: "natural",
          stroke: "var(--color-lunes)",
          strokeWidth: 2,
          dot: {
            fill: "var(--color-desktop)"
          },
          activeDot: {
            r: 6
          },
          children: /* @__PURE__ */ jsx(
            LabelList,
            {
              position: "top",
              offset: 12,
              className: "fill-foreground",
              fontSize: 12
            }
          )
        }
      )
    ] }) }) }) })
  ] });
}
const metricas = UNSAFE_withComponentProps(function Metricas2() {
  const fetchData = () => {
    const random = Math.floor(Math.random() * 100.55);
    return (random - 40) / 1e3;
  };
  const fetchDataValue = () => {
    const random = Math.floor(Math.random() * 100);
    return random;
  };
  const values = [{
    value: fetchDataValue(),
    valueFormat: "decimal",
    percentageValue: fetchData(),
    title: "CTVL",
    description: "Customer Lifetime Value",
    Icon: BarChart3,
    label: "Últimos 28 días"
  }, {
    value: fetchDataValue(),
    valueFormat: "currency",
    percentageValue: fetchData(),
    title: "ARPU",
    description: "Ingreso Promedio por Usuario",
    Icon: BarChart3,
    label: "Últimos 28 días"
  }, {
    value: fetchDataValue(),
    valueFormat: "percent",
    percentageValue: fetchData(),
    title: "Deserción",
    description: "Tasa de deserción",
    Icon: BarChart3,
    label: "Últimos 28 días"
  }, {
    value: fetchDataValue(),
    valueFormat: "decimal",
    percentageValue: fetchData(),
    title: "Adquisición",
    description: "Usuarios adquiridos",
    Icon: BarChart3,
    label: "Últimos 28 días"
  }, {
    value: fetchDataValue(),
    valueFormat: "percent",
    percentageValue: fetchData(),
    title: "Retención",
    description: "Tasa de retención",
    Icon: BarChart3,
    label: "Últimos 28 días"
  }];
  return /* @__PURE__ */ jsxs("div", {
    className: "w-full flex flex-col gap-6 rounded-lg text-black h-full py-1",
    children: [/* @__PURE__ */ jsx("div", {
      className: "grid w-full h-fit grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6",
      children: values.map((metric, index) => /* @__PURE__ */ jsx(GeneralCard, {
        value: metric.value,
        title: metric.title,
        description: metric.description,
        Icon: metric.Icon,
        label: metric.label,
        percentageValue: metric.percentageValue,
        valueFormat: metric.valueFormat
      }, index))
    }), /* @__PURE__ */ jsxs("div", {
      className: "h-fit grid grid-cols-1 md:grid-cols-2 gap-6",
      children: [/* @__PURE__ */ jsx(ChartLineLabel, {
        title: "Tasa de Adquisición"
      }), /* @__PURE__ */ jsx(ChartLineLabel, {
        title: "Tasa de Desereción"
      })]
    }), /* @__PURE__ */ jsx("div", {
      className: "w-full h-full max-h-full flex gap-6",
      children: /* @__PURE__ */ jsx(ChartLineLabelBottom, {
        title: "Customer Lifetime Value"
      })
    })]
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: metricas
}, Symbol.toStringTag, { value: "Module" }));
const chartData = [
  { day: "lunes", visitors: 14.5, fill: "var(--lunes)" },
  { day: "martes", visitors: 14.5, fill: "var(--martes)" },
  { day: "miércoles", visitors: 14.5, fill: "var(--miercoles)" },
  { day: "jueves", visitors: 14.5, fill: "var(--jueves)" },
  { day: "viernes", visitors: 14.5, fill: "var(--viernes)" },
  { day: "sábado", visitors: 14.5, fill: "var(--sabado)" },
  { day: "domingo", visitors: 14.5, fill: "var(--domingo)" }
];
const chartConfig = {
  visitors: {
    label: "Visitors"
  },
  lunes: {
    label: "lunes",
    color: "var(--lunes)"
  },
  martes: {
    label: "martes",
    color: "var(--martes)"
  },
  miercoles: {
    label: "miércoles",
    color: "var(--miercoles)"
  },
  jueves: {
    label: "jueves",
    color: "var(--jueves)"
  },
  viernes: {
    label: "viernes",
    color: "var(--viernes)"
  },
  sabado: {
    label: "sábado",
    color: "var(--sabado)"
  },
  domingo: {
    label: "domingo",
    color: "var(--domingo)"
  }
};
function ChartSection() {
  const isMobile = useIsMobile({ MOBILE_BREAKPOINT: 900 });
  return /* @__PURE__ */ jsxs(Card, { className: "h-full flex border-0 min-h-fit", children: [
    /* @__PURE__ */ jsxs(CardHeader, { className: "flex gap-2 items-center", children: [
      /* @__PURE__ */ jsx(Calendar$1, { className: "w-5 h-5 text-purple-600" }),
      /* @__PURE__ */ jsx(CardTitle, { className: "font-semibold text-lg", children: "Días en los que más retiros se realizan" })
    ] }),
    /* @__PURE__ */ jsxs(CardContent, { className: "h-fit w-full flex sm:flex-row flex-col justify-center items-center sm:items-stretch sm:justify-between", children: [
      /* @__PURE__ */ jsx("div", { className: "w-full sm:w-fit h-full max-w-xs", children: /* @__PURE__ */ jsxs("table", { className: "w-full h-full", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "text-left text-lg font-bold text-primary-folatti", children: [
          /* @__PURE__ */ jsx("th", { className: "flex pl-8 justify-center", children: "Día" }),
          /* @__PURE__ */ jsx("th", { className: "pr-2 text-right", children: "%" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: chartData.map((item, index) => /* @__PURE__ */ jsxs("tr", { className: "h-9", children: [
          /* @__PURE__ */ jsx("td", { className: "align-middle", children: /* @__PURE__ */ jsxs("div", { className: "flex relative items-center gap-3 justify-center", children: [
            /* @__PURE__ */ jsx("div", { className: "w-3 absolute left-1 h-3 rounded-full", style: { backgroundColor: item.fill } }),
            /* @__PURE__ */ jsx("span", { className: "pl-8 text-base font-semibold", children: item.day })
          ] }) }),
          /* @__PURE__ */ jsx("td", { className: "text-sm pl-4 font-medium text-right", children: item.visitors })
        ] }, index)) })
      ] }) }),
      /* @__PURE__ */ jsx(ChartContainer, { config: chartConfig, className: "h-[320px] w-[320px] !aspect-auto", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(PieChart, { children: [
        /* @__PURE__ */ jsx(
          ChartTooltip,
          {
            content: /* @__PURE__ */ jsx(ChartTooltipContent, { hideLabel: true })
          }
        ),
        /* @__PURE__ */ jsx(
          Pie,
          {
            data: chartData,
            dataKey: "visitors",
            nameKey: "day",
            innerRadius: !isMobile ? 60 : 40,
            outerRadius: !isMobile ? 160 : 100
          }
        )
      ] }) }) })
    ] })
  ] });
}
function Collapsible({
  ...props
}) {
  return /* @__PURE__ */ jsx(CollapsiblePrimitive.Root, { "data-slot": "collapsible", ...props });
}
function CollapsibleTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(
    CollapsiblePrimitive.CollapsibleTrigger,
    {
      "data-slot": "collapsible-trigger",
      ...props
    }
  );
}
function CollapsibleContent({
  ...props
}) {
  return /* @__PURE__ */ jsx(
    CollapsiblePrimitive.CollapsibleContent,
    {
      "data-slot": "collapsible-content",
      ...props
    }
  );
}
const playersData = [
  {
    id: 1,
    name: "xsotojacqueline",
    details: {
      montoPromedio: "$100",
      numeroRetiros: "5",
      periodo: "Últimos 28 días"
    }
  },
  { id: 2, name: "rodrigoespino" },
  { id: 3, name: "gyroo" },
  { id: 4, name: "jahz32" },
  { id: 5, name: "oscar20_play" }
];
function PlayersSection() {
  const [expandedPlayer, setExpandedPlayer] = useState(null);
  return /* @__PURE__ */ jsx(Card, { className: "border-0 h-full", children: /* @__PURE__ */ jsxs(CardContent, { className: "p-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
      /* @__PURE__ */ jsx(User, { className: "w-5 h-5" }),
      /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: "Jugadores que más retiran" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-1", children: playersData.map((player) => /* @__PURE__ */ jsxs(
      Collapsible,
      {
        open: expandedPlayer === player.id,
        onOpenChange: (open) => setExpandedPlayer(open ? player.id : null),
        children: [
          /* @__PURE__ */ jsx(CollapsibleTrigger, { asChild: true, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-3 hover:bg-gray-100 rounded cursor-pointer", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold", children: player.id }),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: player.name })
            ] }),
            /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4" })
          ] }) }),
          player.details && /* @__PURE__ */ jsxs(CollapsibleContent, { className: "px-9 py-2 space-y-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm", children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Monto promedio de retiro:" }),
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: player.details.montoPromedio })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm", children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Número de retiros en el mes:" }),
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: player.details.numeroRetiros })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center text-sm", children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: player.details.periodo }),
              /* @__PURE__ */ jsx(ChevronDown, { className: "w-4 h-4" })
            ] })
          ] })
        ]
      },
      player.id
    )) })
  ] }) });
}
function PeakHoursSection() {
  return /* @__PURE__ */ jsx(Card, { className: "border-0", children: /* @__PURE__ */ jsxs(CardContent, { className: "p-4 h-full", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
      /* @__PURE__ */ jsx(Clock, { className: "w-5 h-5" }),
      /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: "Hora pico de retiros" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600 mb-2", children: "Hora más común de retiro" }),
    /* @__PURE__ */ jsxs("div", { className: "text-5xl font-bold mb-2", children: [
      "2:00 ",
      /* @__PURE__ */ jsx("span", { className: "text-xl", children: "PM" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-600 mb-1", children: [
      "% de retiros en ese horario: ",
      /* @__PURE__ */ jsx("span", { className: "text-green-600 font-medium", children: "18.35 %" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600", children: "Últimos 28 días" })
  ] }) });
}
const MotionNumberFlow = motion.create(NumberFlow);
const MotionArrowUp = motion.create(ArrowUp);
function MetricsCardsVariant({ value, className }) {
  const canAnimate = useCanAnimate();
  return /* @__PURE__ */ jsx("div", { className: cn(className), children: /* @__PURE__ */ jsx(Card, { className: "border-0", children: /* @__PURE__ */ jsxs(CardContent, { className: "p-6", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 mb-4", children: /* @__PURE__ */ jsx(BarChart3, { className: "w-6 h-6 text-gray-600" }) }),
    /* @__PURE__ */ jsx("div", { className: "mb-2", children: /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-600", children: "Total de retiros" }) }),
    /* @__PURE__ */ jsx("div", { className: "text-5xl font-bold mb-2", children: "420" }),
    /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600 mb-3", children: "Transacciones gay x2" }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between w-full", children: [
      /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-600", children: "Últimos 28 días" }),
      /* @__PURE__ */ jsx(
        MotionConfig,
        {
          transition: {
            layout: canAnimate ? { duration: 0.9, bounce: 0, type: "spring" } : { duration: 0 }
          },
          children: /* @__PURE__ */ jsxs(
            motion.span,
            {
              className: cn(
                value > 0 ? "bg-emerald-400" : "bg-red-500",
                "inline-flex items-center px-[0.3em] text-lg text-white transition-colors duration-300"
              ),
              layout: true,
              style: { borderRadius: 999 },
              children: [
                /* @__PURE__ */ jsx(
                  MotionArrowUp,
                  {
                    className: "mr-0.5 size-[0.75em]",
                    absoluteStrokeWidth: true,
                    strokeWidth: 3,
                    layout: true,
                    transition: {
                      rotate: canAnimate ? { type: "spring", duration: 0.5, bounce: 0 } : { duration: 0 }
                    },
                    animate: { rotate: value > 0 ? 0 : -180 },
                    initial: false
                  }
                ),
                /* @__PURE__ */ jsx(
                  MotionNumberFlow,
                  {
                    value,
                    className: "font-semibold text-sm",
                    format: { style: "percent", maximumFractionDigits: 2 },
                    style: { ["--number-flow-char-height"]: "0.85em", ["--number-flow-mask-height"]: "0.3em" },
                    layout: true,
                    layoutRoot: true
                  }
                )
              ]
            }
          )
        }
      )
    ] })
  ] }) }) });
}
function Retiros() {
  return /* @__PURE__ */ jsx("div", { className: "w-full rounded-lg text-black h-full", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-full xl:flex-row justify-between gap-6 ", children: [
    /* @__PURE__ */ jsxs("div", { className: "w-full flex flex-col gap- justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid  w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6 mb-8", children: [
        /* @__PURE__ */ jsx(MetricsCardsVariant, { className: "col-span-1", value: Math.floor(Math.random() * 100) + 1 }),
        /* @__PURE__ */ jsx(MetricsCardsVariant, { className: "col-span-1", value: Math.floor(Math.random() * 100) + 1 }),
        /* @__PURE__ */ jsx(MetricsCardsVariant, { className: "cols md:col-span-2 lg:col-span-1", value: Math.floor(Math.random() * 100) + 1 })
      ] }),
      /* @__PURE__ */ jsx(ChartSection, {})
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "w-full xl:w-80  h-full flex flex-col gap-6  justify-between", children: [
      /* @__PURE__ */ jsx(PlayersSection, {}),
      /* @__PURE__ */ jsx(PeakHoursSection, {})
    ] })
  ] }) });
}
const retiros = UNSAFE_withComponentProps(function RetirosPage() {
  return /* @__PURE__ */ jsx("div", {
    className: "w-full h-full",
    children: /* @__PURE__ */ jsx(Retiros, {})
  });
});
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: retiros
}, Symbol.toStringTag, { value: "Module" }));
function App2() {
  return /* @__PURE__ */ jsxs("div", {
    className: "flex flex-col items-center justify-center h-screen bg-gray-100",
    children: [/* @__PURE__ */ jsx("header", {
      className: "mb-4",
      children: /* @__PURE__ */ jsx("h1", {
        className: "text-2xl font-bold",
        children: "Welcome to the Dashboard"
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "justify-center items-center h-full",
      children: /* @__PURE__ */ jsx(Link, {
        className: buttonVariants({
          variant: "link"
        }),
        to: "/retiros",
        children: "Retiros"
      })
    })]
  });
}
const _index = UNSAFE_withComponentProps(App2);
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _index
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-kNi5arBc.js", "imports": ["/assets/chunk-EF7DTUVF-mit8K6YH.js", "/assets/index-DNtmnsHv.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-BJA9gH8k.js", "imports": ["/assets/chunk-EF7DTUVF-mit8K6YH.js", "/assets/index-DNtmnsHv.js", "/assets/index-D1MqboFF.js"], "css": ["/assets/root-B6lXGsjP.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_dashboard=/_layout": { "id": "routes/_dashboard=/_layout", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/_layout-DFb0SjtA.js", "imports": ["/assets/chunk-EF7DTUVF-mit8K6YH.js", "/assets/index-B9w7XjTb.js", "/assets/index-BDXlbxsl.js", "/assets/index-D1MqboFF.js", "/assets/utils-CBfrqCZ4.js", "/assets/index-CJkwlibf.js", "/assets/button-DEDI9oFW.js", "/assets/createLucideIcon-9PaDAJ6E.js", "/assets/user-AkbrnWCD.js", "/assets/index-DNtmnsHv.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_dashboard=/marketing": { "id": "routes/_dashboard=/marketing", "parentId": "routes/_dashboard=/_layout", "path": "marketing", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/marketing-axcyI-se.js", "imports": ["/assets/chunk-EF7DTUVF-mit8K6YH.js", "/assets/proxy-BeJ3K0rp.js", "/assets/card-general-DGPNlutl.js", "/assets/utils-CBfrqCZ4.js", "/assets/index-BDXlbxsl.js", "/assets/index-CJkwlibf.js", "/assets/index-B9w7XjTb.js", "/assets/button-DEDI9oFW.js", "/assets/createLucideIcon-9PaDAJ6E.js", "/assets/index-DNtmnsHv.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_dashboard=/metricas": { "id": "routes/_dashboard=/metricas", "parentId": "routes/_dashboard=/_layout", "path": "metricas", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/metricas-nS0wmwK0.js", "imports": ["/assets/chunk-EF7DTUVF-mit8K6YH.js", "/assets/proxy-BeJ3K0rp.js", "/assets/utils-CBfrqCZ4.js", "/assets/card-general-DGPNlutl.js", "/assets/createLucideIcon-9PaDAJ6E.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_dashboard=/retiros": { "id": "routes/_dashboard=/retiros", "parentId": "routes/_dashboard=/_layout", "path": "retiros", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/retiros-Df5vpFdZ.js", "imports": ["/assets/chunk-EF7DTUVF-mit8K6YH.js", "/assets/proxy-BeJ3K0rp.js", "/assets/index-BDXlbxsl.js", "/assets/user-AkbrnWCD.js", "/assets/utils-CBfrqCZ4.js", "/assets/index-CJkwlibf.js", "/assets/createLucideIcon-9PaDAJ6E.js", "/assets/index-DNtmnsHv.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/_index-felsDJW7.js", "imports": ["/assets/chunk-EF7DTUVF-mit8K6YH.js", "/assets/button-DEDI9oFW.js", "/assets/index-CJkwlibf.js", "/assets/utils-CBfrqCZ4.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-157c12cc.js", "version": "157c12cc", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/_dashboard=/_layout": {
    id: "routes/_dashboard=/_layout",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/_dashboard=/marketing": {
    id: "routes/_dashboard=/marketing",
    parentId: "routes/_dashboard=/_layout",
    path: "marketing",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/_dashboard=/metricas": {
    id: "routes/_dashboard=/metricas",
    parentId: "routes/_dashboard=/_layout",
    path: "metricas",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/_dashboard=/retiros": {
    id: "routes/_dashboard=/retiros",
    parentId: "routes/_dashboard=/_layout",
    path: "retiros",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route5
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
