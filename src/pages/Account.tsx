import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import { 
  User, Package, Heart, Settings, LogOut, X, Loader2, 
  CreditCard, Shield, Bell, Globe, Eye, EyeOff, Save,
  Trash2, Plus, Edit, Check, AlertCircle, Lock, Key, Download
} from "lucide-react";

const Account = () => {
  const { user, isAuthenticated, isLoading, login, signup, logout } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("login");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  
  // Ensure page starts from top when navigated to
  useScrollToTop();
  
  // Form states
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ 
    firstName: "", 
    lastName: "", 
    email: "", 
    password: "" 
  });

  // Handle login form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const result = await login(loginData.email, loginData.password);
      
      if (result.success) {
        toast({
          title: "Welcome back!",
          description: result.message,
        });
        setLoginData({ email: "", password: "" });
      } else {
        toast({
          title: "Login failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle signup form submission
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const fullName = `${signupData.firstName} ${signupData.lastName}`.trim();
    
    try {
      const result = await signup(signupData.email, signupData.password);
      
      if (result.success) {
        toast({
          title: "Account created!",
          description: result.message,
        });
        setSignupData({ firstName: "", lastName: "", email: "", password: "" });
      } else {
        toast({
          title: "Signup failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
  };

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  const orders = [
    {
      id: "ARR-1001",
      date: "Dec 15, 2024",
      status: "Delivered",
      total: 89.98,
      items: ["Clear Protein+", "Tone"]
    },
    {
      id: "ARR-1002", 
      date: "Nov 28, 2024",
      status: "Processing",
      total: 55.99,
      items: ["MB-1"]
    }
  ];

  const wishlist = [
    {
      id: "1",
      name: "Digestive Enzyme Complex",
      price: 34.99,
      inStock: true
    },
    {
      id: "2",
      name: "Sleep & Calm Gummies", 
      price: 29.99,
      inStock: false
    }
  ];

  // Show authentication forms if user is not logged in
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 lg:px-8 py-16">
          <div className="max-w-md mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger 
                  value="login" 
                  className={`transition-all duration-200 ${
                    activeTab === 'login' ? 'tab-selected' : ''
                  }`}
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger 
                  value="register" 
                  className={`transition-all duration-200 ${
                    activeTab === 'register' ? 'tab-selected' : ''
                  }`}
                >
                  Create Account
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-center font-serif">Welcome Back</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="loginEmail">Email</Label>
                        <Input 
                          id="loginEmail" 
                          type="email" 
                          placeholder="your@email.com"
                          value={loginData.email}
                          onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="loginPassword">Password</Label>
                        <Input 
                          id="loginPassword" 
                          type="password"
                          placeholder="Enter your password"
                          value={loginData.password}
                          onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                          required
                        />
                      </div>
                      <Button 
                        type="submit"
                        variant="premium" 
                        size="lg" 
                        className="w-full text-white-enhanced"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Signing In...
                          </>
                        ) : (
                          "Sign In"
                        )}
                      </Button>
                    </form>
                    <Button variant="ghost" className="w-full text-sm mt-4">
                      Forgot Password?
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="register">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-center font-serif">Join Arrae</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSignup} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input 
                            id="firstName" 
                            placeholder="John"
                            value={signupData.firstName}
                            onChange={(e) => setSignupData({...signupData, firstName: e.target.value})}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input 
                            id="lastName" 
                            placeholder="Doe"
                            value={signupData.lastName}
                            onChange={(e) => setSignupData({...signupData, lastName: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signupEmail">Email</Label>
                        <Input 
                          id="signupEmail" 
                          type="email" 
                          placeholder="your@email.com"
                          value={signupData.email}
                          onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signupPassword">Password</Label>
                        <Input 
                          id="signupPassword" 
                          type="password"
                          placeholder="At least 6 characters"
                          value={signupData.password}
                          onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                          minLength={6}
                          required
                        />
                      </div>
                      <Button 
                        type="submit"
                        variant="premium" 
                        size="lg" 
                        className="w-full text-white-enhanced"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Creating Account...
                          </>
                        ) : (
                          "Create Account"
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // Render different sections based on activeSection
  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return (
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="font-heading text-2xl">Profile Information</CardTitle>
              <p className="text-muted-foreground">Manage your personal information and preferences</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-medium">Full Name</Label>
                  <Input id="name" value={user?.email || ''} className="font-body" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-medium">Email Address</Label>
                  <Input id="email" value={user?.email || ''} className="font-body" />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-medium">Phone Number</Label>
                  <Input id="phone" placeholder="+1 (555) 123-4567" className="font-body" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="userRole" className="font-medium">Account Type</Label>
                  <Input id="userRole" value={user?.role || 'Customer'} readOnly className="font-body bg-muted" />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-heading text-lg font-semibold">Shipping Address</h3>
                <p className="text-sm text-muted-foreground">Add your shipping information for faster checkout</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="street" className="font-medium">Street Address</Label>
                    <Input id="street" placeholder="123 Main Street" className="font-body" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city" className="font-medium">City</Label>
                    <Input id="city" placeholder="Your city" className="font-body" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state" className="font-medium">State/Province</Label>
                    <Input id="state" placeholder="State/Province" className="font-body" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip" className="font-medium">ZIP/Postal Code</Label>
                    <Input id="zip" placeholder="12345" className="font-body" />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="premium" size="lg" className="font-button">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
                <Button variant="outline" size="lg" className="font-button">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case "orders":
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-2xl">Order History</h2>
              <Badge variant="secondary" className="font-body">3 Orders</Badge>
            </div>
            {orders.map((order) => (
              <Card key={order.id} className="hover:shadow-product transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-heading text-lg font-semibold">Order #{order.id}</h3>
                      <p className="text-sm text-muted-foreground font-body">{order.date}</p>
                    </div>
                    <Badge 
                      variant={order.status === "Delivered" ? "default" : "secondary"}
                      className="font-body"
                    >
                      {order.status}
                    </Badge>
                  </div>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm font-body">
                      Items: {order.items.join(", ")}
                    </p>
                    <p className="font-heading text-lg font-semibold">Total: ${order.total}</p>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="font-button">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    {order.status === "Delivered" && (
                      <Button variant="premium" size="sm" className="font-button">
                        <Package className="w-4 h-4 mr-2" />
                        Reorder
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case "wishlist":
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-2xl">Wishlist</h2>
              <Badge variant="secondary" className="font-body">{wishlist.length} Items</Badge>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((item) => (
                <Card key={item.id} className="hover:shadow-product transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-heading text-lg font-semibold group-hover:text-primary transition-colors">{item.name}</h3>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="font-heading text-xl font-bold mb-4 text-primary">${item.price}</p>
                    <Button
                      variant={item.inStock ? "premium" : "outline"}
                      size="sm"
                      className="w-full font-button"
                      disabled={!item.inStock}
                    >
                      {item.inStock ? "Add to Cart" : "Out of Stock"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case "settings":
        return (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="font-heading text-2xl mb-2">Account Settings</h2>
              <p className="text-muted-foreground font-body">Manage your account security and preferences</p>
            </div>

            {/* Security Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-primary" />
                  Security & Privacy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword" className="font-medium">Current Password</Label>
                    <div className="relative">
                      <Input 
                        id="currentPassword" 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Enter current password"
                        className="font-body pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="newPassword" className="font-medium">New Password</Label>
                    <div className="relative">
                      <Input 
                        id="newPassword" 
                        type={showNewPassword ? "text" : "password"} 
                        placeholder="Enter new password"
                        className="font-body pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  
                  <Button variant="premium" className="font-button">
                    <Key className="w-4 h-4 mr-2" />
                    Update Password
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Payment Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-primary" />
                  Payment Methods
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-6 bg-primary rounded flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-heading font-medium">**** **** **** 4242</p>
                      <p className="text-sm text-muted-foreground font-body">Expires 12/25</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="font-button">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="font-button text-destructive hover:text-destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full font-button">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Payment Method
                </Button>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading flex items-center">
                  <Bell className="w-5 h-5 mr-2 text-primary" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-heading font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground font-body">Receive updates about your orders and promotions</p>
                  </div>
                  <Button variant="outline" size="sm" className="font-button">
                    <Check className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-heading font-medium">SMS Notifications</p>
                    <p className="text-sm text-muted-foreground font-body">Get text alerts for order updates</p>
                  </div>
                  <Button variant="outline" size="sm" className="font-button">
                    <Check className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Privacy Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading flex items-center">
                  <Globe className="w-5 h-5 mr-2 text-primary" />
                  Privacy & Data
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-heading font-medium">Data Analytics</p>
                    <p className="text-sm text-muted-foreground font-body">Help us improve by sharing anonymous usage data</p>
                  </div>
                  <Button variant="outline" size="sm" className="font-button">
                    <Check className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="font-button">
                    <Download className="w-4 h-4 mr-2" />
                    Download Data
                  </Button>
                  <Button variant="outline" className="font-button text-destructive hover:text-destructive">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Enhanced Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4 shadow-elegant">
                  <User className="w-10 h-10 text-foreground" />
                </div>
                <h2 className="font-heading text-xl font-semibold">{user?.email || ''}</h2>
                <p className="text-sm text-muted-foreground font-body">{user?.email}</p>
                <Badge variant="secondary" className="mt-2 font-body">
                  {user?.role || 'Customer'}
                </Badge>
              </div>
              
              <nav className="space-y-1">
                {[
                  { id: "profile", label: "Profile", icon: User },
                  { id: "orders", label: "Orders", icon: Package },
                  { id: "wishlist", label: "Wishlist", icon: Heart },
                  { id: "settings", label: "Settings", icon: Settings },
                ].map((item) => (
                  <Button
                    key={item.id}
                    variant={activeSection === item.id ? "secondary" : "ghost"}
                    className={`w-full justify-start font-button transition-all duration-200 ${
                      activeSection === item.id 
                        ? "nav-selected" 
                        : "hover:bg-muted"
                    }`}
                    onClick={() => setActiveSection(item.id)}
                  >
                    <item.icon className={`w-4 h-4 mr-3 ${activeSection === item.id ? 'selected-icon' : 'icon-primary'}`} />
                    <span className={activeSection === item.id ? 'text-white-enhanced' : 'nav-text'}>
                      {item.label}
                    </span>
                  </Button>
                ))}
                
                <div className="border-t my-4"></div>
                
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-destructive hover:bg-destructive/10 font-button"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Sign Out
                </Button>
              </nav>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderContent()}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Account;