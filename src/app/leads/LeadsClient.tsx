"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Filter, SlidersHorizontal, X, AlertTriangle } from "lucide-react";
import { LeadCard } from "@/components/LeadCard";
import { useListLeads, useListCategories } from "@/lib/api-client";

export default function LeadsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [page, setPage] = useState(parseInt(searchParams.get("page") || "1"));
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  const { data: leadsData, isLoading, isError } = useListLeads({
    page,
    limit: 12,
    category: category || undefined,
    location: location || undefined,
    search: debouncedSearch || undefined,
  });

  const { data: categoriesData } = useListCategories();

  const updateUrl = (updates: Record<string, string | number | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value.toString());
      }
    });
    router.push(`/leads?${params.toString()}`);
  };

  const clearFilters = () => {
    setCategory("");
    setLocation("");
    setSearch("");
    setPage(1);
    router.push("/leads");
    setIsMobileFiltersOpen(false);
  };

  return (
    <>
      <div className="py-10" style={{ backgroundColor: "#0F3D66" }}>
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Contractor Dashboard — Browse Leads
          </h1>
          <p className="text-blue-200 text-base max-w-2xl">
            Browse verified, high-quality construction opportunities actively seeking quotes.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:hidden flex items-center justify-between mb-4">
            <div className="relative flex-1 mr-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search leads..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              />
            </div>
            <button
              className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl bg-white text-slate-700 font-medium hover:bg-slate-50"
              onClick={() => setIsMobileFiltersOpen(true)}
            >
              <SlidersHorizontal size={16} /> Filters
            </button>
          </div>

          <div className={`lg:w-1/4 shrink-0 ${isMobileFiltersOpen ? "fixed inset-0 z-50 bg-white p-6 overflow-y-auto" : "hidden lg:block"}`}>
            {isMobileFiltersOpen && (
              <div className="flex justify-between items-center mb-6 lg:hidden">
                <h2 className="text-xl font-bold text-slate-900">Filters</h2>
                <button onClick={() => setIsMobileFiltersOpen(false)} className="p-2 text-slate-500 bg-slate-100 rounded-full">
                  <X size={20} />
                </button>
              </div>
            )}
            <div className="bg-white lg:border lg:border-slate-200 rounded-2xl lg:p-6 lg:sticky lg:top-24 space-y-8">
              <div className="hidden lg:block">
                <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Search size={18} className="text-slate-400" /> Keyword Search
                </h3>
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Filter size={18} className="text-slate-400" /> Trade Category
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="radio" name="category" checked={category === ""} onChange={() => { setCategory(""); setPage(1); updateUrl({ category: null, page: 1 }); }} className="w-4 h-4 text-primary" />
                    <span className="text-slate-700 font-medium">All Trades</span>
                  </label>
                  {categoriesData?.categories?.map((cat) => (
                    <label key={cat.slug} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="category"
                        checked={category === cat.slug}
                        onChange={() => { setCategory(cat.slug); setPage(1); updateUrl({ category: cat.slug, page: 1 }); }}
                        className="w-4 h-4 text-primary"
                      />
                      <span className="text-slate-600 group-hover:text-slate-900">{cat.name}</span>
                      <span className="ml-auto text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{cat.leadsCount}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-4">Location</h3>
                <input
                  type="text"
                  placeholder="City, State, or Zip"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  value={location}
                  onChange={(e) => { setLocation(e.target.value); setPage(1); updateUrl({ location: e.target.value || null, page: 1 }); }}
                />
              </div>
              <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                {isMobileFiltersOpen && (
                  <button className="w-full py-3 rounded-xl bg-primary text-white font-semibold" onClick={() => setIsMobileFiltersOpen(false)}>Apply Filters</button>
                )}
                <button className="w-full py-2 text-slate-500 hover:text-red-600 font-medium" onClick={clearFilters}>Clear all filters</button>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-slate-600 font-medium">
                Showing {leadsData?.total || 0} available projects
              </p>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 h-64 animate-pulse">
                    <div className="w-24 h-6 bg-slate-200 rounded-full mb-4"></div>
                    <div className="w-3/4 h-6 bg-slate-200 rounded mb-2"></div>
                    <div className="w-full h-4 bg-slate-200 rounded mb-6"></div>
                  </div>
                ))}
              </div>
            ) : isError ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
                <AlertTriangle size={48} className="mx-auto text-red-500 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">Failed to load leads</h3>
                <p className="text-slate-500">Please try refreshing the page or adjusting your filters.</p>
              </div>
            ) : leadsData?.leads?.length === 0 ? (
              <div className="text-center py-24 bg-white rounded-2xl border border-dashed border-slate-200">
                <Search size={32} className="mx-auto text-slate-400 mb-4" />
                <h3 className="text-2xl font-bold text-slate-900 mb-2">No projects found</h3>
                <p className="text-slate-500 max-w-md mx-auto mb-8">Try expanding your search area or selecting different trades.</p>
                <button onClick={clearFilters} className="px-8 py-3 bg-primary text-white rounded-xl font-semibold">Clear All Filters</button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  {leadsData?.leads?.map((lead) => <LeadCard key={lead.id} lead={lead} />)}
                </div>
                {leadsData && leadsData.totalPages > 1 && (
                  <div className="mt-12 flex justify-center items-center gap-2">
                    <button
                      className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 disabled:opacity-50 hover:bg-slate-50"
                      disabled={page === 1}
                      onClick={() => { const p = page - 1; setPage(p); updateUrl({ page: p }); window.scrollTo(0, 0); }}
                    >
                      Previous
                    </button>
                    {[...Array(leadsData.totalPages)].map((_, i) => (
                      <button
                        key={i}
                        className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${page === i + 1 ? "bg-primary text-white" : "text-slate-600 hover:bg-slate-100"}`}
                        onClick={() => { setPage(i + 1); updateUrl({ page: i + 1 }); window.scrollTo(0, 0); }}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 disabled:opacity-50 hover:bg-slate-50"
                      disabled={page === leadsData.totalPages}
                      onClick={() => { const p = page + 1; setPage(p); updateUrl({ page: p }); window.scrollTo(0, 0); }}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
