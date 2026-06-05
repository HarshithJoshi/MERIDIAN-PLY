import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Package } from "lucide-react";

const DEALERS = [
  { city: "Mumbai", region: "Western India", count: 3 },
  { city: "Delhi NCR", region: "Northern India", count: 3 },
  { city: "Bengaluru", region: "Southern India", count: 2 },
  { city: "Hyderabad", region: "Southern India", count: 3 },
  { city: "Chennai", region: "Southern India", count: 2 },
  { city: "Kolkata", region: "Eastern India", count: 2 },
];

export default function Portal() {
  const [query, setQuery] = useState("");
  const filtered = DEALERS.filter(
    (d) =>
      d.city.toLowerCase().includes(query.toLowerCase()) ||
      d.region.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section
      id="portal"
      data-testid="portal-section"
      className="relative bg-[#0B0B0B] py-24 md:py-32 lg:py-44 bg-grain"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-24">
        <div className="max-w-2xl">
          <span className="eyebrow">— Architect & Dealer Portal</span>
          <h2
            className="mt-4 font-display text-[40px] sm:text-[56px] md:text-[68px] leading-[1.02] text-[#F6F1E9]"
            style={{ fontWeight: 600, letterSpacing: "-0.025em" }}
          >
            Specifications,
            <br />
            <span className="italic text-[#B87333]" style={{ fontWeight: 500 }}>
              at your desk
            </span>
            .
          </h2>
          <p className="mt-6 text-[15px] md:text-[16px] text-[#F6F1E9]/65 max-w-xl">
            A working set of resources for architects, contractors, and our dealer network.
          </p>
        </div>

        <div className="mt-14 rounded-2xl md:rounded-3xl border border-white/10 glass overflow-hidden">
          <Tabs defaultValue="dealers">
            <div className="border-b border-white/10 px-5 md:px-7 py-4">
              <TabsList
                data-testid="portal-tabs"
                className="bg-white/[0.04] border border-white/10"
              >
                <TabsTrigger
                  value="dealers"
                  data-testid="portal-tab-dealers"
                  className="data-[state=active]:bg-[#F6F1E9] data-[state=active]:text-[#0B0B0B] text-[#F6F1E9]/70"
                >
                  <MapPin size={14} className="mr-2" /> Dealers
                </TabsTrigger>
                <TabsTrigger
                  value="samples"
                  data-testid="portal-tab-samples"
                  className="data-[state=active]:bg-[#F6F1E9] data-[state=active]:text-[#0B0B0B] text-[#F6F1E9]/70"
                >
                  <Package size={14} className="mr-2" /> Samples
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="dealers" className="p-5 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search city or region"
                  data-testid="portal-dealer-search"
                  className="w-full md:w-72 bg-white/[0.04] border border-white/10 rounded-full px-5 py-2.5 text-[13px] text-[#F6F1E9] placeholder:text-[#F6F1E9]/35 focus:outline-none focus:border-[#B87333]/60"
                />
                <span className="text-[11px] tracking-[0.22em] uppercase text-[#A3A3A3]">
                  {filtered.length} cities
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filtered.map((d) => (
                  <div
                    key={d.city}
                    data-testid={`dealer-row-${d.city}`}
                    className="rounded-xl border border-white/10 bg-white/[0.02] p-5 hover:border-[#B87333]/50 transition-colors"
                  >
                    <div className="flex items-baseline justify-between">
                      <span
                        className="font-display text-[17px] text-[#F6F1E9]"
                        style={{ fontWeight: 600 }}
                      >
                        {d.city}
                      </span>
                      <span className="font-mono text-[11px] text-[#B87333]">
                        {d.count} stores
                      </span>
                    </div>
                    <div className="mt-1 text-[12px] text-[#F6F1E9]/55">{d.region}</div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="samples" className="p-6 md:p-8">
              <p className="text-[14.5px] text-[#F6F1E9]/70 max-w-xl">
                Request physical sample swatches delivered to your studio. Complimentary
                for verified architects and design firms.
              </p>
              <a
                href="#contact"
                data-testid="portal-sample-cta"
                className="mt-6 inline-flex btn-pill btn-pill-copper"
              >
                Request Sample Kit
              </a>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
