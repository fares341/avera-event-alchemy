import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, MessageCircle, Phone, X } from "lucide-react";
import { createContext, useContext, useState, type ReactNode } from "react";
import { CorporateWizard, WeddingForm } from "./intake-forms";

type Modal = "corporate" | "wedding" | null;
const InquiryContext = createContext<(modal: Modal) => void>(() => undefined);
export const useInquiry = () => useContext(InquiryContext);

const links = [
  ["/", "Home"], ["/corporate-events", "Corporate Events"], ["/portfolio", "Portfolio"],
  ["/luxury-weddings", "Luxury Weddings"], ["/methodology", "Methodology"],
  ["/venues-production", "Venues & Production"], ["/contact", "Contact"],
] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  const [menu, setMenu] = useState(false);
  const [modal, setModal] = useState<Modal>(null);
  return <InquiryContext.Provider value={setModal}>
    <div className="min-h-screen bg-sand text-ink">
      <header className="sticky top-0 z-40 border-b border-border bg-sand/95 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 lg:px-12">
          <Link to="/" className="flex shrink-0 items-center gap-3" aria-label="AVERA home">
            <span className="font-sora text-xl font-semibold">AVERA</span><span className="hidden h-5 w-px bg-border sm:block" />
            <span className="hidden max-w-36 text-[9px] font-semibold uppercase leading-tight text-warmgray sm:block">Corporate Event House<br />& Luxury Weddings</span>
          </Link>
          <nav className="hidden items-center gap-5 xl:flex" aria-label="Primary navigation">
            {links.map(([to,label]) => <div key={to} className="group relative">
              <Link to={to} activeProps={{className:"text-ochre"}} className="flex items-center gap-1 text-xs font-semibold text-mocha hover:text-ochre">{label}{to==="/corporate-events"&&<ChevronDown className="size-3"/>}</Link>
              {to==="/corporate-events"&&<div className="invisible absolute left-0 top-6 w-52 border border-border bg-card p-3 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100">{["Conferences","Galas","Launches","Exhibitions","VIP Banquets","Grand Openings"].map(x=><Link key={x} to="/corporate-events" className="block px-3 py-2 text-xs text-warmgray hover:bg-cream hover:text-ink">{x}</Link>)}</div>}
            </div>)}
          </nav>
          <div className="flex items-center gap-2">
            <a href="tel:01001200697" className="hidden items-center gap-2 text-xs font-semibold text-mocha lg:flex"><Phone className="size-4 text-ochre"/>01001200697</a>
            <button onClick={()=>setModal("corporate")} className="hidden rounded-md bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground md:block">Request Proposal</button>
            <button onClick={()=>setMenu(v=>!v)} className="grid size-10 place-items-center rounded-md border border-border xl:hidden" aria-label="Toggle menu">{menu?<X/>:<Menu/>}</button>
          </div>
        </div>
        {menu&&<nav className="border-t border-border bg-card px-5 py-5 xl:hidden">{links.map(([to,label])=><Link key={to} to={to} onClick={()=>setMenu(false)} className="block border-b border-border py-3 text-sm font-semibold">{label}</Link>)}<div className="mt-4 grid grid-cols-2 gap-2"><button onClick={()=>setModal("corporate")} className="rounded-md bg-primary px-3 py-3 text-xs font-semibold text-primary-foreground">Corporate Proposal</button><button onClick={()=>setModal("wedding")} className="rounded-md border border-border px-3 py-3 text-xs font-semibold">Wedding Consultation</button></div></nav>}
      </header>
      {children}
      <footer className="border-t border-border bg-card"><div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 md:grid-cols-3 lg:px-12"><div><p className="font-sora text-2xl font-semibold">AVERA</p><p className="mt-3 text-xs uppercase text-warmgray">Corporate Event House<br/>Strategy · Design · Execution</p></div><div><p className="text-xs font-semibold uppercase text-ochre">Cairo Studio</p><p className="mt-3 text-sm">Cairo, Egypt</p><a href="tel:01001200697" className="mt-2 block text-sm font-semibold">01001200697</a></div><div><p className="text-xs font-semibold uppercase text-ochre">Follow</p><div className="mt-3 flex flex-wrap gap-4 text-sm"><a href="#">LinkedIn</a><a href="#">Instagram</a><a href="#">Facebook</a><a href="#">TikTok</a></div></div></div><div className="border-t border-border px-5 py-5 text-center text-xs text-warmgray">© AVERA Event House. All Rights Reserved. Strategy · Design · Execution.</div></footer>
      <a href="https://wa.me/201001200697" target="_blank" rel="noreferrer" aria-label="Message AVERA on WhatsApp" className="fixed bottom-5 right-5 z-30 grid size-14 place-items-center rounded-full bg-ink text-sand shadow-xl"><MessageCircle/></a>
      {modal&&<div className="fixed inset-0 z-50 grid place-items-center bg-ink/60 p-3" role="dialog" aria-modal="true"><div className="max-h-[94vh] w-full max-w-4xl overflow-auto rounded-lg bg-sand shadow-2xl"><div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-sand px-5 py-4"><div><p className="font-sora text-lg font-semibold">{modal==="corporate"?"Request a Corporate Proposal":"Wedding Consultation"}</p><p className="text-xs text-warmgray">AVERA · Cairo, Egypt</p></div><button onClick={()=>setModal(null)} className="grid size-9 place-items-center rounded-md border border-border" aria-label="Close form"><X className="size-4"/></button></div>{modal==="corporate"?<CorporateWizard onClose={()=>setModal(null)}/>:<WeddingForm onClose={()=>setModal(null)}/>}</div></div>}
    </div>
  </InquiryContext.Provider>
}