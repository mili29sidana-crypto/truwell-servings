import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { WaitlistForm } from "@/components/forms/waitlist-form";
import { CartDrawer } from "@/components/cart-drawer";
import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { FaInstagram } from "react-icons/fa";

function BrandVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.muted = false;
          video.play().catch(() => {
            video.muted = true;
            video.play().catch(() => {});
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="brand-video" className="bg-secondary">
      <video
        ref={videoRef}
        src="/truwell-brand-video.mov"
        controls
        playsInline
        className="w-full block"
        data-testid="brand-video"
      />
    </section>
  );
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function HomePage() {
  const [waitlistModalOpen, setWaitlistModalOpen] = useState(false);
  const [, setLocation] = useLocation();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden selection:bg-primary selection:text-primary-foreground">
      {/* Sticky Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/50 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo("hero")}>
            <img src="/truwell-logo-nobg.png" alt="Truwell Logo" className="h-10 w-auto" />
          </div>
          <div className="hidden md:flex items-center gap-8 font-medium text-sm text-foreground/80">
            <button onClick={() => scrollTo("who-we-are")} className="hover:text-primary transition-colors" data-testid="nav-who">Who We Are</button>
            <button onClick={() => scrollTo("what-we-do")} className="hover:text-primary transition-colors" data-testid="nav-what">What We Do</button>
            <button onClick={() => scrollTo("products")} className="hover:text-primary transition-colors" data-testid="nav-products">Products</button>
            <button onClick={() => scrollTo("science")} className="hover:text-primary transition-colors" data-testid="nav-science">The Science</button>
          </div>
          <div className="flex items-center gap-3">
            <CartDrawer />
            <Button onClick={() => setLocation("/product/coco-gut")} className="rounded-full px-6 font-semibold shadow-sm" data-testid="button-nav-cta">
              Shop Now
            </Button>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <section id="hero" className="relative min-h-[100dvh] pt-20 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.15),transparent_50%)]" />
        <div className="max-w-5xl mx-auto px-6 z-10 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-6xl md:text-8xl font-serif font-extrabold text-secondary leading-tight mb-6">
              stay well, <br className="hidden md:block" />
              <span className="text-primary italic">true well.</span>
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl max-w-2xl text-foreground/80 mb-10"
          >Making nutrition fun, snackable, and accessible for the everyday Indian diet. No pills, no chores - just delicious fuel for a better life.</motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button size="lg" className="rounded-full px-10 py-6 text-lg shadow-lg" onClick={() => scrollTo("products")} data-testid="button-hero-cta">
              Explore Products
            </Button>
          </motion.div>
        </div>
      </section>
      <BrandVideo />
      {/* Who We Are */}
      <section id="who-we-are" className="py-24 md:py-32 bg-card relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-sm font-bold tracking-widest uppercase text-primary mb-4">Who We Are</h2>
            <p className="text-3xl md:text-5xl font-serif font-medium leading-snug text-secondary">We are a group of young college students who believe nutrition shouldn't be a chore.</p>
            <div className="mt-8 text-lg text-muted-foreground max-w-3xl mx-auto space-y-6">
              <p>Founded by a passionate group of health enthusiasts, we're on a mission to transform the way the country fuels itself - one delicious bite at a time.</p>
              <p>
                We combine modern nutritional science with traditional Indian wisdom to create products that actually taste good.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
      {/* What We Do */}
      <section id="what-we-do" className="py-24 md:py-32 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNmZmZmZmYiLz48L3N2Zz4=')]" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-serif font-bold mb-6">We make nutrition fun.</h2>
              <p className="text-xl opacity-90 mb-8 leading-relaxed">
                We replace clinical, pill-based supplements with indulgent, snack-like formats. Snackable. Habit-forming. Designed for real Indian life.
              </p>
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold text-xl shrink-0">1</div>
                  <div>
                    <h3 className="text-2xl font-serif font-bold mb-2">Prepare the gut</h3>
                    <p className="opacity-90">High absorption sequence starts here. Fibre prepares the gut for maximum nutrient uptake.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold text-xl shrink-0">2</div>
                  <div>
                    <h3 className="text-2xl font-serif font-bold mb-2">Fuel the body</h3>
                    <p className="opacity-90">Vitamins and minerals absorb efficiently when the foundation is ready.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-card text-card-foreground p-8 md:p-12 rounded-[2rem] shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500"
            >
              <h3 className="text-3xl font-serif font-bold text-secondary mb-4">Our products are built to work together.</h3>
              <p className="text-lg text-muted-foreground mb-6">
                Not in isolation. By preparing your gut first, your body becomes primed to absorb the nutrients it actually needs.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Our Products */}
      <section id="products" className="py-24 md:py-32 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest uppercase text-primary mb-4">The Lineup</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-secondary">Our Products</h3>
          </div>

          <motion.div
            className="grid md:grid-cols-2 gap-8 md:gap-12"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Coco Gut */}
            <motion.div variants={fadeIn} className="bg-card border border-border rounded-[2rem] p-8 md:p-10 flex flex-col transition-all">
              <div className="mb-4 flex justify-between items-start">
                <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider">Available Now</span>
              </div>
              <div className="mb-6 rounded-2xl overflow-hidden bg-background aspect-[4/3] flex items-center justify-center">
                <img src="/coco-gut-pack.png" alt="Coco Gut" className="w-full h-full object-contain p-4" />
              </div>
              <h4 className="text-4xl font-serif font-bold text-secondary mb-2">Coco Gut</h4>
              <p className="text-xl text-primary font-medium mb-4">Truwell's Fibre Chocolate</p>
              <div className="flex-grow">
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  24g bar • 7.34g fibre • 3g sugar • clean label. Dark chocolate with chickpeas, inulin and psyllium husk. No additives, no emulsifiers.
                </p>
                <div className="bg-background rounded-xl p-4 mb-6">
                  <span className="font-bold text-secondary uppercase tracking-wider text-sm block mb-1">Function</span>
                  <span className="text-lg italic font-serif">"Prepare the gut."</span>
                </div>
              </div>
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-2xl font-bold text-secondary">Rs. 199</span>
                <span className="text-base text-muted-foreground line-through">Rs. 249</span>
              </div>
              <Button size="lg" className="w-full text-lg rounded-full" onClick={() => setLocation("/product/coco-gut")} data-testid="button-order-coco-gut">
                Order Now
              </Button>
            </motion.div>

            {/* B-Juvenate */}
            <motion.div variants={fadeIn} className="bg-card border border-border rounded-[2rem] p-8 md:p-10 flex flex-col transition-all md:self-start">
              <div className="mb-4 flex justify-between items-start">
                <span className="inline-block bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider">Coming Soon</span>
              </div>
              <h4 className="text-4xl font-serif font-bold text-secondary mb-2">B-Juvenate</h4>
              <p className="text-xl text-secondary/80 font-medium mb-4">Multivitamin B-complex sachets</p>
              <div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  B6, B9, B12 + Magnesium Citrate. Orange flavour. Designed specifically for Indian vegetarians and busy professionals.
                </p>
                <div className="bg-background rounded-xl p-4 mb-6">
                  <span className="font-bold text-secondary uppercase tracking-wider text-sm block mb-1">Function</span>
                  <span className="text-lg italic font-serif">"Fuel the body."</span>
                </div>
              </div>
              <Button size="lg" variant="outline" className="w-full text-lg rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground" onClick={() => setWaitlistModalOpen(true)} data-testid="button-waitlist-b-juvenate">
                Notify Me
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* Our Journey */}
      <section id="journey" className="py-24 md:py-32 bg-secondary text-secondary-foreground">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="font-bold tracking-widest uppercase text-primary mb-6 text-[29px]">Our Journey</h2>
              <p className="text-xl text-secondary-foreground/80 leading-relaxed mb-6">Truwell came together after realizing 70%+ Indians are fibre-deficient and 47% are Vitamin B12 deficient. Diabetes is rampant.</p>
              <p className="text-xl text-secondary-foreground/80 leading-relaxed">Existing supplements felt like medicine - we wanted to change that. Now we're building the first truly snackable nutraceutical brand for the country.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl overflow-hidden shadow-2xl"
            >
              <img src="/truwell-team.png" alt="The Truwell team" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>
      {/* The Science */}
      <section id="science" className="py-24 md:py-32 bg-card">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="font-bold tracking-widest uppercase text-primary mb-4 text-[16px]">The Science</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-secondary mb-6">Digestion determines absorption.</h3>
            <p className="text-xl text-muted-foreground">
              Absorption determines results. Our products are built to work together, not in isolation.
            </p>
          </div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeIn} className="bg-background p-8 rounded-2xl text-center border border-border shadow-sm">
              <div className="text-5xl font-serif font-bold text-primary mb-4">70%+</div>
              <p className="text-lg font-medium text-secondary">Indians are fibre deficient</p>
              <p className="text-sm text-muted-foreground mt-2">(NIN-ICMR data)</p>
            </motion.div>
            <motion.div variants={fadeIn} className="bg-background p-8 rounded-2xl text-center border border-border shadow-sm">
              <div className="text-5xl font-serif font-bold text-primary mb-4">47%</div>
              <p className="text-lg font-medium text-secondary">Vitamin B12 deficient</p>
              <p className="text-sm text-muted-foreground mt-2">(NIH data)</p>
            </motion.div>
            <motion.div variants={fadeIn} className="bg-background p-8 rounded-2xl text-center border border-border shadow-sm">
              <div className="text-5xl font-serif font-bold text-primary mb-4">$18B</div>
              <p className="text-lg font-medium text-secondary">India nutraceuticals market</p>
              <p className="text-sm text-muted-foreground mt-2">Growing rapidly</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-12 border-t border-secondary-foreground/10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <img src="/truwell-logo-nobg.png" alt="Truwell Logo" className="h-8 w-auto brightness-0 invert" />
          </div>
          <div className="text-center md:text-left">
            <p className="text-secondary-foreground/60 text-[18px]">stay well, true well.</p>
          </div>
          <div className="flex items-center gap-6">
            <a href="https://instagram.com/truwell.in" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-primary transition-colors flex items-center gap-2" data-testid="link-instagram">
              <FaInstagram />
              <span className="text-base font-medium">@truwell.in</span>
            </a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 mt-12 text-center text-sm text-secondary-foreground/40">
          <p>&copy; {new Date().getFullYear()} Truwell. All rights reserved.</p>
        </div>
      </footer>
      {/* Waitlist Dialog */}
      <Dialog open={waitlistModalOpen} onOpenChange={setWaitlistModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">Join B-Juvenate Waitlist</DialogTitle>
            <DialogDescription>
              Be the first to know when our B-complex sachets launch.
            </DialogDescription>
          </DialogHeader>
          <WaitlistForm productName="B-Juvenate" onSuccess={() => setWaitlistModalOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
