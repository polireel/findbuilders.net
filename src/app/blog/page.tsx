import Link from "next/link";
import { Calendar, User } from "lucide-react";

const NAVY = "#0F3D66";

export const metadata = {
  title: "Blog | FindBuilders.net",
  description: "Construction industry tips, contractor advice, and project planning guides.",
};

const posts = [
  {
    slug: "how-to-hire-a-contractor",
    title: "How to Hire the Right Contractor for Your Home Project",
    excerpt: "Hiring a contractor can be daunting. Here's everything you need to know about vetting candidates, checking licenses, and getting the best value for your money.",
    category: "Homeowner Tips",
    author: "FindBuilders Team",
    date: "March 10, 2026",
    readTime: "5 min read",
  },
  {
    slug: "construction-project-checklist",
    title: "The Ultimate Pre-Construction Checklist for Your Next Project",
    excerpt: "Before breaking ground, make sure you've covered all your bases. From permits to material ordering, this checklist will keep your project on track.",
    category: "Planning",
    author: "FindBuilders Team",
    date: "March 4, 2026",
    readTime: "7 min read",
  },
  {
    slug: "contractor-licensing",
    title: "Understanding Contractor Licensing Requirements by State",
    excerpt: "Licensing requirements vary widely by state and trade. Learn what certifications to look for when hiring a contractor in your area.",
    category: "Education",
    author: "FindBuilders Team",
    date: "February 28, 2026",
    readTime: "6 min read",
  },
  {
    slug: "budget-your-renovation",
    title: "How to Budget Your Home Renovation Without Overspending",
    excerpt: "Renovation costs can spiral quickly. These budgeting strategies will help you plan realistically and avoid common financial pitfalls.",
    category: "Homeowner Tips",
    author: "FindBuilders Team",
    date: "February 20, 2026",
    readTime: "8 min read",
  },
];

export default function BlogPage() {
  return (
    <>
      <div className="py-12" style={{ backgroundColor: NAVY }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">FindBuilders Blog</h1>
          <p className="text-blue-200">Tips, guides, and insights for homeowners and contractors</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-14">
        <div className="grid md:grid-cols-2 gap-7">
          {posts.map((post) => (
            <article key={post.slug} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-44 bg-gray-100 flex items-center justify-center">
                <img
                  src="/findbuilders/images/hero-bg.png"
                  alt={post.title}
                  className="w-full h-full object-cover opacity-70"
                />
              </div>
              <div className="p-5">
                <span
                  className="inline-block text-xs font-semibold px-2.5 py-1 rounded mb-3 text-white"
                  style={{ backgroundColor: NAVY }}
                >
                  {post.category}
                </span>
                <h2 className="font-bold text-gray-900 text-lg leading-snug mb-2 hover:underline cursor-pointer">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><User size={12} />{post.author}</span>
                  <span className="flex items-center gap-1"><Calendar size={12} />{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
