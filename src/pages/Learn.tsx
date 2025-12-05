import { useState } from "react";
import banner1 from '@/assets/BANNER 3.jpg';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeafDecoration from "@/components/LeafDecoration";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight } from "lucide-react";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";

const Learn = () => {
  // Ensure page starts from top when navigated to
  useScrollToTop();
  
  const articles = [
    {
      id: 1,
      title: "The Science Behind MB-1: How Natural Ingredients Support Weight Management",
      excerpt:
        "Discover the research-backed ingredients that make MB-1 an effective natural alternative to traditional weight management solutions.",
      category: "Science",
      readTime: "5 min read",
      date: "Dec 15, 2024",
      featured: true,
      link: "https://www.healthline.com/nutrition/27-health-and-nutrition-tips",
    },
    {
      id: 2,
      title: "Building Lean Muscle Without the Bulk: The Tone Advantage",
      excerpt:
        "Learn how creatine and targeted nutrients can help you achieve a toned physique without unwanted muscle mass.",
      category: "Fitness",
      readTime: "4 min read",
      date: "Dec 10, 2024",
      featured: false,
      link: "https://www.hopkinsmedicine.org/health/wellness-and-prevention/the-brain-gut-connection",
    },
    {
      id: 3,
      title: "Gut Health 101: Why Your Microbiome Matters More Than You Think",
      excerpt:
        "Understanding the connection between digestive health and overall wellness, plus simple steps to optimize your gut.",
      category: "Wellness",
      readTime: "6 min read",
      date: "Dec 5, 2024",
      featured: false,
      link: "https://www.nccih.nih.gov/health/dietary-and-herbal-supplements",
    },
    {
      id: 4,
      title: "Sleep & Mood: The Hidden Connection to Weight Management",
      excerpt:
        "How quality sleep and balanced mood directly impact your metabolism and weight loss goals.",
      category: "Sleep",
      readTime: "3 min read",
      date: "Dec 1, 2024",
      featured: false,
      link: "#",
    },
  ];

  const [showAbout, setShowAbout] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Banner */}
        <section className="relative w-full h-64 md:h-96 flex items-center justify-center overflow-hidden">
          {/* Decorative leaves */}
          <div className="pointer-events-none absolute -left-12 top-12 z-20">
            <LeafDecoration className="opacity-40 scale-150 -rotate-12 animate-leaf-slow" size={200} color="var(--accent)" />
          </div>
          <div className="pointer-events-none absolute right-0 bottom-8 z-20">
            <LeafDecoration className="opacity-30 scale-125 rotate-45 animate-leaf-slow-reverse" size={180} color="var(--tertiary)" />
          </div>

          <img
            src="https://res.cloudinary.com/dvhethden/image/upload/v1764802509/banner_3_qy6sd2.jpg"
            alt="Learn Banner"
            className="absolute inset-0 w-full h-full object-cover object-center z-0"
            style={{ filter: 'brightness(0.7)' }}
          />
          <div className="relative z-10 text-center w-full">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 drop-shadow-lg">
              Learn with Nutrition pHirst
            </h1>
            <p className="text-xl text-white max-w-2xl mx-auto mb-8 drop-shadow">
              Discover evidence-based wellness insights, expert tips, and the science behind our targeted supplement solutions.
            </p>
          </div>
        </section>

        {/* About Us (Always Visible) */}
        {/**
        <section className="py-6 border-b border-border">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 shadow-sm">
              <h2 className="text-2xl font-serif font-bold">About Us</h2>
            </div>
            <div className="mt-4">
              <div className="p-6 rounded-xl bg-card shadow-elegant border border-border leading-relaxed space-y-3">
                <p className="text-muted-foreground">
                  We are a wellness-focused brand committed to creating targeted, evidence-informed supplements.
                  Our mission is to make feeling great feel simple — with clean formulas, thoughtful design, and
                  education that empowers everyday health decisions.
                </p>
                <p className="text-muted-foreground">
                  Founded by a small team of nutrition enthusiasts, formulators, and designers, we obsess over quality, transparency,
                  and real customer outcomes. Every product is crafted to solve a specific problem — whether that’s
                  sleep, stress, digestion, or sustainable energy.
                </p>
                <ul className="list-disc list-inside text-muted-foreground">
                  <li>Clean-label ingredients and third-party tested batches.</li>
                  <li>Formulations guided by published research and clinical feedback.</li>
                  <li>Thoughtful customer support and simple, beautiful packaging.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        */}

        {/* Featured Article */}
        <section className="relative py-12 overflow-hidden">
          {/* Decorative leaves */}
          <div className="pointer-events-none absolute -left-16 top-1/4">
            <LeafDecoration className="opacity-20 scale-150 rotate-90 animate-leaf-slow" size={220} color="var(--tertiary)" />
          </div>
          <div className="pointer-events-none absolute right-1/4 bottom-0">
            <LeafDecoration className="opacity-25 scale-90 -rotate-45 animate-leaf-slow-reverse" size={160} color="var(--accent)" />
          </div>

          <div className="container mx-auto px-4 lg:px-8">
            <div className="mb-8">
              <Badge className="mb-4">Featured Article</Badge>
              <Card className="overflow-hidden shadow-elegant">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="bg-gradient-product p-8 md:p-12 flex flex-col justify-center">
                    <Badge className="w-fit mb-4">{articles[0].category}</Badge>
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4">
                      {articles[0].title}
                    </h2>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {articles[0].excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{articles[0].date}</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {articles[0].readTime}
                        </div>
                      </div>
                      <a href={articles[0].link} target="_blank" rel="noopener noreferrer">
                        <Button variant="premium" size="sm" className="group">
                          Read More
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </a>
                    </div>
                  </div>
                  <div className="bg-muted/20 min-h-64 md:min-h-full flex items-center justify-center">
                    <div className="text-6xl text-muted-foreground/20">📖</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Article Grid */}
            <div className="relative">
              {/* Decorative leaves */}
              <div className="pointer-events-none absolute -left-8 top-1/3">
                <LeafDecoration className="opacity-30 scale-100 -rotate-180 animate-leaf-slow" size={140} color="var(--tertiary)" />
              </div>
              <div className="pointer-events-none absolute right-0 bottom-1/4">
                <LeafDecoration className="opacity-20 scale-125 rotate-12 animate-leaf-slow-reverse" size={180} color="var(--accent)" />
              </div>

              <div className="relative grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Decorative leaves for grid */}
                <div className="pointer-events-none absolute -left-8 top-1/3">
                  <LeafDecoration className="opacity-30 scale-100 -rotate-180 animate-leaf-slow" size={140} color="var(--tertiary)" />
                </div>
                <div className="pointer-events-none absolute right-0 bottom-1/4">
                  <LeafDecoration className="opacity-20 scale-125 rotate-12 animate-leaf-slow-reverse" size={180} color="var(--accent)" />
                </div>

                {articles.slice(1).map((article) => (
                  <Card key={article.id} className="group hover:shadow-hover transition-elegant">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary">{article.category}</Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {article.readTime}
                        </div>
                      </div>
                      <CardTitle className="font-serif text-lg group-hover:text-primary transition-colors">
                        {article.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{article.date}</span>
                        <a href={article.link} target="_blank" rel="noopener noreferrer">
                          <Button variant="ghost" size="sm" className="group p-0 h-auto">
                            Read More
                            <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
export default Learn;
