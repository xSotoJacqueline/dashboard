import CardLoading from "../loading-card";

export function PendingDepositos() {
  return (
    <div className={`w-full flex flex-col gap-6 rounded-lg text-black h-full py-1`}>
        <CardLoading className="w-full min-h-[841.2px] max-h-[841.2px] md:min-h-[354.6px] lg:min-h-[185.3px] xl:min-h-[165.3px] md:max-h-[354.6px] lg:max-h-[185.3px] xl:max-h-[165.3px] animate-pulse" children={<p></p>} />

        <CardLoading className="w-full h-full animate-pulse" title={true} children={<div className='min-h-[125px] h-full bg-foreground/10 rounded-md animate-pulse' />} />

      <div className="h-fit grid grid-cols-1 md:grid-cols-2 gap-6">
            <CardLoading className="w-full h-full animate-pulse" title={true} children={<div className='min-h-[125px] h-full bg-foreground/10 rounded-md animate-pulse' />} />
            <CardLoading className="w-full h-full animate-pulse" title={true} children={<div className='min-h-[125px] h-full bg-foreground/10 rounded-md animate-pulse' />} />
      </div>

        <CardLoading className="w-full h-full animate-pulse" title={true} children={<div className='min-h-[125px] h-full bg-foreground/10 rounded-md animate-pulse' />} />

    </div>
  )
}
