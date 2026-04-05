import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { ArrowLeft, Search } from "lucide-react";
import { useState } from "react";

export function SearchResults() {
  const search = useSearch({ strict: false }) as { q?: string };
  const query = search.q ?? "";
  const [inputValue, setInputValue] = useState(query);
  const navigate = useNavigate();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (inputValue.trim()) {
      navigate({ to: "/search", search: { q: inputValue.trim() } });
    }
  }

  return (
    <main className="min-h-screen">
      <section className="bg-hero py-10 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" size="sm" className="mb-4 -ml-2" asChild>
            <Link to="/" data-ocid="search.back.link">
              <ArrowLeft size={14} className="mr-1" /> Back to Home
            </Link>
          </Button>
          <h1 className="font-display font-bold text-3xl text-foreground mb-4">
            Search Results
          </h1>
          <form onSubmit={handleSearch} className="flex gap-2 max-w-xl">
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Search study materials..."
                className="pl-9 bg-card"
                data-ocid="search.search_input"
              />
            </div>
            <Button type="submit" data-ocid="search.search.primary_button">
              Search
            </Button>
          </form>
          {query && (
            <p className="text-sm text-muted-foreground mt-3">
              Showing results for:{" "}
              <span className="font-semibold text-foreground">"{query}"</span>
            </p>
          )}
        </div>
      </section>
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16 text-muted-foreground">
            <Search size={40} className="mx-auto mb-3 opacity-30" />
            <h2 className="font-semibold text-foreground mb-1">
              Search Results
            </h2>
            <p className="text-sm mb-4">
              Browse our categories to find exactly what you need.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button variant="outline" asChild>
                <Link to="/notes">Notes</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/past-questions">Past Questions</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/syllabus">Syllabus</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/exam-tips">Exam Tips</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
