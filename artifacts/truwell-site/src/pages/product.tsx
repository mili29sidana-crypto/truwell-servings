import { useState, useCallback } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { CartDrawer } from "@/components/cart-drawer";
import { ChevronLeft, ChevronRight, Check, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { FaInstagram } from "react-icons/fa";

const images = [
  { src: "/coco-gut-pack.png", alt: "Coco Gut Pack of 10" },
  { src: "/coco-gut-bar.png", alt: "Truwell Fibre Chocolates" },
  { src: "/coco-gut-ingredients.png", alt: "Ingredients Table" },
];

const PRODUCT = {
  id: 1,
  name: "Coco Gut",
  tagline: "Truwell's Fibre Chocolate",
  price: 199,
  originalPrice: 249,
  image: "/coco-gut-pack.png",
};

export default function ProductPage() {
  const [, setLocation] = useLocation();
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addItem } = useCart();
  const { toast } = useToast();

  const prevImage = useCallback(() => setActiveImage((i) => (i === 0 ? images.length - 1 : i - 1)), []);
  const nextImage = useCallback(() => setActiveImage((i) => (i === images.length - 1 ? 0 : i + 1)), []);

  const handleAddToCart = () => {
    addItem({ id: PRODUCT.id, name: PRODUCT.name, price: PRODUCT.price, image: PRODUCT.image }, qty);
    setAddedToCart(true);
    toast({ title: "Added to cart!", description: `${qty} x Coco Gut added.` });
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => setLocation("/")}
            className="flex items-center gap-2 text-secondary hover:text-primary transition-colors font-medium"
            data-testid="button-back-home"
          >
            <ChevronLeft className="w-5 h-5" />
            <img src="/truwell-logo-nobg.png" alt="Truwell" className="h-8 w-auto" />
          </button>
          <span className="text-sm font-medium text-muted-foreground hidden md:block">Coco Gut - Fibre Chocolate</span>
          <CartDrawer />
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-10 md:py-16">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">

          {/* Left: Image Carousel */}
          <div className="space-y-4">
            {/* Main image */}
            <div className="relative aspect-square bg-card rounded-2xl overflow-hidden border border-border shadow-sm select-none">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={images[activeImage].src}
                  alt={images[activeImage].alt}
                  className="w-full h-full object-contain p-4"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.25 }}
                  draggable={false}
                />
              </AnimatePresence>
              {/* Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/80 shadow border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                data-testid="carousel-prev"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/80 shadow border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                data-testid="carousel-next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              {/* Dot indicators */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-2 h-2 rounded-full transition-all ${i === activeImage ? "bg-primary w-5" : "bg-border"}`}
                    data-testid={`carousel-dot-${i}`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-20 h-20 rounded-xl border-2 overflow-hidden transition-all bg-card ${
                    i === activeImage ? "border-primary shadow-md" : "border-border opacity-60 hover:opacity-100"
                  }`}
                  data-testid={`thumbnail-${i}`}
                >
                  <img src={img.src} alt={img.alt} className="w-full h-full object-contain p-1" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Available Now</span>
              <span className="inline-block bg-secondary/10 text-secondary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Clean Label</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-serif font-bold text-secondary mb-1">Coco Gut</h1>
            <p className="text-xl text-primary font-medium mb-4">Truwell's Fibre Chocolate</p>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-secondary" data-testid="product-price">Rs. 199</span>
              <span className="text-lg text-muted-foreground line-through">Rs. 249</span>
              <span className="text-sm bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full">20% off</span>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { label: "Fibre", value: "7.34g" },
                { label: "Sugar", value: "3g" },
                { label: "Weight", value: "24g" },
              ].map((stat) => (
                <div key={stat.label} className="bg-card border border-border rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-primary font-serif">{stat.value}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-semibold text-secondary uppercase tracking-wider">Quantity</span>
              <div className="flex items-center border border-border rounded-full overflow-hidden">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-4 py-2 text-lg hover:bg-muted transition-colors"
                  data-testid="product-qty-minus"
                >
                  −
                </button>
                <span className="px-4 py-2 font-semibold text-secondary min-w-[2.5rem] text-center" data-testid="product-qty-value">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(20, q + 1))}
                  className="px-4 py-2 text-lg hover:bg-muted transition-colors"
                  data-testid="product-qty-plus"
                >
                  +
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3 mb-8">
              <Button
                size="lg"
                className="w-full rounded-full text-lg py-6 relative overflow-hidden"
                onClick={handleAddToCart}
                data-testid="button-add-to-cart"
              >
                {addedToCart ? (
                  <span className="flex items-center gap-2"><Check className="w-5 h-5" /> Added to Cart</span>
                ) : (
                  "Add to Cart"
                )}
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3 mb-8">
              {["No Emulsifiers", "No Additives", "Clean Label", "FSSAI Certified"].map((badge) => (
                <span key={badge} className="flex items-center gap-1.5 text-sm text-muted-foreground border border-border rounded-full px-3 py-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="mt-16 border-t border-border pt-12 space-y-10">

          {/* About */}
          <section>
            <h2 className="text-2xl font-serif font-bold text-secondary mb-4">About Coco Gut</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Coco Gut is Truwell's flagship product - a rich, indulgent dark chocolate bar that secretly does something extraordinary: it delivers <strong className="text-secondary">7.34g of dietary fibre</strong> in every 24g bar. That's almost a third of your recommended daily fibre intake, wrapped in a treat you'll actually look forward to.
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg mt-4">
              Made with dark chocolate, chickpeas, psyllium husk, and inulin - four powerhouse ingredients - it's designed to make gut health delicious, effortless, and habitual.
            </p>
          </section>

          {/* Why fibre */}
          <section>
            <h2 className="text-2xl font-serif font-bold text-secondary mb-4">Why Fibre Matters</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: "Gut Health", desc: "Feeds good gut bacteria, reduces bloating, and improves digestion." },
                { title: "Blood Sugar", desc: "Slows glucose absorption, helping manage blood sugar spikes - key for India's diabetic population." },
                { title: "Absorption", desc: "A healthy gut absorbs nutrients better. Fibre prepares the gut, making every meal count more." },
                { title: "Daily Habit", desc: "70%+ Indians are fibre deficient. One bar a day is a simple, delicious fix." },
              ].map((item) => (
                <div key={item.title} className="bg-card border border-border rounded-xl p-5">
                  <h3 className="font-bold text-secondary mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Ingredients table */}
          <section>
            <h2 className="text-2xl font-serif font-bold text-secondary mb-4">Ingredients Breakdown</h2>
            <div className="overflow-hidden rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-secondary text-secondary-foreground">
                    <th className="text-left px-5 py-3 font-bold">Ingredient</th>
                    <th className="text-center px-5 py-3 font-bold">Weight</th>
                    <th className="text-center px-5 py-3 font-bold">Fibre</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Dark Chocolate", weight: "11g", fibre: "0.9g" },
                    { name: "Chickpeas", weight: "6g", fibre: "0.44g" },
                    { name: "Psyllium Husk", weight: "3g", fibre: "2.4g" },
                    { name: "Inulin", weight: "4g", fibre: "3.6g" },
                  ].map((row, i) => (
                    <tr key={row.name} className={i % 2 === 0 ? "bg-background" : "bg-card"}>
                      <td className="px-5 py-3 text-secondary font-medium">{row.name}</td>
                      <td className="px-5 py-3 text-center text-muted-foreground">{row.weight}</td>
                      <td className="px-5 py-3 text-center text-muted-foreground">{row.fibre}</td>
                    </tr>
                  ))}
                  <tr className="bg-primary/10 font-bold">
                    <td className="px-5 py-3 text-secondary">Total</td>
                    <td className="px-5 py-3 text-center text-secondary">24g</td>
                    <td className="px-5 py-3 text-center text-primary">7.34g</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground mt-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
              Certified by FSSAI. No emulsifiers, artificial additives, or preservatives. What you see is what you eat.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-8 mt-16 border-t border-secondary-foreground/10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <img src="/truwell-logo-nobg.png" alt="Truwell" className="h-7 w-auto brightness-0 invert" />
          <p className="text-secondary-foreground/60 text-sm">stay well, true well.</p>
          <a href="https://instagram.com/truwell.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors text-sm">
            <FaInstagram className="text-lg" />
            @truwell.in
          </a>
        </div>
      </footer>
    </div>
  );
}
