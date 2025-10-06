import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, X, ShoppingBag, Truck, Shield, RotateCcw } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const { 
    items: cartItems, 
    updateQuantity, 
    removeItem, 
    subtotal, 
    getTotalSavings, 
    getTotalWithShipping 
  } = useCart();
  
  // Ensure page starts from top when navigated to
  useScrollToTop();

  const savings = getTotalSavings();
  const shipping = subtotal > 75 ? 0 : 7.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = getTotalWithShipping();

  const benefits = [
    { icon: Truck, text: "Free shipping on orders over $75" },
    { icon: Shield, text: "30-day money-back guarantee" },
    { icon: RotateCcw, text: "Easy returns & exchanges" }
  ];

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 lg:px-8 py-16">
          <div className="text-center space-y-6 max-w-md mx-auto">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto" />
            <h1 className="text-2xl font-serif font-bold text-foreground">
              Your cart is empty
            </h1>
            <p className="text-muted-foreground">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Button variant="premium" size="lg" asChild>
              <a href="/products">Continue Shopping</a>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
              Shopping Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
            </h1>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id} className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full sm:w-24 h-32 sm:h-24 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-serif text-lg font-semibold text-foreground">
                            {item.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="h-8 w-8"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-foreground">
                            ${item.price}
                          </span>
                          {item.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              ${item.originalPrice}
                            </span>
                          )}
                          {item.originalPrice && (
                            <Badge variant="destructive" className="text-xs">
                              Save ${((item.originalPrice - item.price) * item.quantity).toFixed(2)}
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-8 w-8"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                            className="w-16 text-center"
                            min="0"
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-8 w-8"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Benefits */}
            <Card className="p-6 bg-muted/20">
              <div className="grid sm:grid-cols-3 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <benefit.icon className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      {benefit.text}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="p-6 sticky top-24">
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
                Order Summary
              </h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                
                {savings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Savings</span>
                    <span>-${savings.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Button 
                variant="premium" 
                size="lg" 
                className="w-full mt-6"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </Button>
              
              <Button variant="minimal" size="lg" className="w-full mt-2" asChild>
                <a href="/products">Continue Shopping</a>
              </Button>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;