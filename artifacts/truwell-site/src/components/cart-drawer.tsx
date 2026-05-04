import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { useCreateOrder } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";

export function CartDrawer() {
  const { items, removeItem, updateQty, clearCart, totalItems, totalAmount } = useCart();
  const [open, setOpen] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", city: "", pincode: "" });
  const createOrder = useCreateOrder();
  const { toast } = useToast();

  const handleCheckout = () => {
    if (items.length === 0) return;
    setCheckingOut(true);
  };

  const handleSubmitOrder = async () => {
    if (!form.name || !form.email || !form.phone || !form.address || !form.city || !form.pincode) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }
    const firstItem = items[0];
    createOrder.mutate(
      { data: { productId: firstItem.id, quantity: firstItem.quantity, ...form } },
      {
        onSuccess: () => {
          toast({ title: "Order placed!", description: "We'll be in touch soon. Stay well, true well." });
          clearCart();
          setCheckingOut(false);
          setOpen(false);
        },
        onError: () => {
          toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
        }
      }
    );
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          className="relative p-2 rounded-full hover:bg-primary/10 transition-colors"
          data-testid="button-cart-open"
          aria-label="Open cart"
        >
          <ShoppingCart className="w-6 h-6 text-secondary" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-serif text-2xl text-secondary">Your Cart</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-muted-foreground">
            <ShoppingCart className="w-16 h-16 opacity-20" />
            <p className="text-lg">Your cart is empty</p>
          </div>
        ) : !checkingOut ? (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 items-center border border-border rounded-xl p-3" data-testid={`cart-item-${item.id}`}>
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-secondary truncate">{item.name}</p>
                    <p className="text-primary font-bold">Rs. {item.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQty(item.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-primary/10 transition-colors"
                        data-testid={`cart-qty-minus-${item.id}`}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQty(item.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-primary/10 transition-colors"
                        data-testid={`cart-qty-plus-${item.id}`}
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors p-1"
                    data-testid={`cart-remove-${item.id}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-4 space-y-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span className="text-secondary">Total</span>
                <span className="text-primary">Rs. {totalAmount.toFixed(2)}</span>
              </div>
              <Button className="w-full rounded-full text-lg py-6" onClick={handleCheckout} data-testid="button-checkout">
                Proceed to Checkout
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Delivery Details</p>
              {(["name", "email", "phone", "address", "city", "pincode"] as const).map((field) => (
                <div key={field}>
                  <label className="text-sm font-medium text-secondary capitalize block mb-1">{field}</label>
                  <input
                    className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    value={form[field]}
                    onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                    placeholder={field === "pincode" ? "6-digit pincode" : field === "phone" ? "10-digit number" : ""}
                    data-testid={`checkout-input-${field}`}
                  />
                </div>
              ))}
              <div className="bg-muted rounded-xl p-3 text-sm text-muted-foreground">
                <p className="font-semibold text-secondary mb-1">Order Summary</p>
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>{item.name} x{item.quantity}</span>
                    <span>Rs. {(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold text-secondary mt-2 border-t border-border pt-2">
                  <span>Total</span>
                  <span>Rs. {totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div className="border-t border-border pt-4 space-y-2">
              <Button
                className="w-full rounded-full text-lg py-6"
                onClick={handleSubmitOrder}
                disabled={createOrder.isPending}
                data-testid="button-place-order"
              >
                {createOrder.isPending ? "Placing Order..." : "Place Order"}
              </Button>
              <button
                className="w-full text-sm text-muted-foreground hover:text-secondary transition-colors py-2"
                onClick={() => setCheckingOut(false)}
              >
                Back to cart
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
