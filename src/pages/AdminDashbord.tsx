import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  Package, 
  ShoppingCart, 
  DollarSign, 
  AlertTriangle,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter
} from "lucide-react";
import {
  getDashboardStats,
  getAllOrders,
  getAllUsers,
  getAdminProducts,
  updateOrderStatus,
  updateUserStatus,
  deleteProduct,
  type DashboardStats,
  type Order,
  type User,
  type AdminProduct
} from "@/services/adminService";
import AddProductDialog from "@/components/AddProductDialog";
import ErrorBoundary from '@/components/ErrorBoundary';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(false);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  // Handle edit product
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setEditDialogOpen(true);
  };

  // Handle product updated
  const handleProductUpdated = (updatedProduct) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    setEditDialogOpen(false);
    setEditingProduct(null);
    loadDashboardStats();
  };

  // Load dashboard stats
  const loadDashboardStats = async () => {
    console.log('Loading dashboard stats...');
    try {
      const stats = await getDashboardStats();
      setDashboardStats(stats);
      console.log('Dashboard stats loaded successfully:', stats);
    } catch (error) {
      console.error('Failed to load dashboard stats:', error);
    }
  };

  // Load orders
  const loadOrders = async (page = 1) => {
    setLoading(true);
    try {
      const statusParam = statusFilter && statusFilter !== 'all' ? statusFilter : undefined;
      const result = await getAllOrders({ 
        page, 
        limit: 20, 
        status: statusParam,
        search: searchTerm || undefined 
      });
      setOrders(result.orders);
      console.log('Orders loaded successfully:', result.orders.length);
    } catch (error) {
      console.error('Failed to load orders:', error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  // Load users
  const loadUsers = async (page = 1) => {
    setLoading(true);
    try {
      const result = await getAllUsers({ 
        page, 
        limit: 20,
        search: searchTerm || undefined 
      });
      setUsers(result.users);
      console.log('Users loaded successfully:', result.users.length);
    } catch (error) {
      console.error('Failed to load users:', error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // Load products
  const loadProducts = async (page = 1) => {
    console.log('Loading products tab...');
    setLoading(true);
    try {
      const statusParam = statusFilter && statusFilter !== 'all' ? statusFilter : undefined;
      const result = await getAdminProducts({ 
        page, 
        limit: 20,
        search: searchTerm || undefined,
        status: statusParam
      });
      console.log('Products API result:', result);
      console.log('Products array:', result.products);
      setProducts(result.products);
      console.log('Products loaded successfully:', result.products.length);
    } catch (error) {
      console.error('Failed to load products:', error);
      console.error('Error details:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Update order status
  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    try {
      await updateOrderStatus(orderId, { status });
      loadOrders(currentPage);
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  // Update user status
  const handleUpdateUserStatus = async (userId: string, isActive: boolean) => {
    try {
      await updateUserStatus(userId, { isActive });
      loadUsers(currentPage);
    } catch (error) {
      console.error('Failed to update user status:', error);
    }
  };

  // Delete product
  const handleDeleteProduct = async (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(productId);
        loadProducts(currentPage);
      } catch (error) {
        console.error('Failed to delete product:', error);
      }
    }
  };

  // Handle product added
  const handleProductAdded = (product: AdminProduct) => {
    setProducts(prev => [product, ...prev]);
    // Also reload dashboard stats to reflect new product count
    loadDashboardStats();
  };

  useEffect(() => {
    loadDashboardStats();
  }, []);

  useEffect(() => {
    if (activeTab === "orders") {
      loadOrders();
    } else if (activeTab === "users") {
      loadUsers();
    } else if (activeTab === "products") {
      loadProducts();
    }
  }, [activeTab, searchTerm, statusFilter]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'secondary';
      case 'confirmed': return 'default';
      case 'processing': return 'default';
      case 'shipped': return 'default';
      case 'delivered': return 'default';
      case 'cancelled': return 'destructive';
      case 'paid': return 'default';
      case 'failed': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-serif font-bold text-foreground">Admin Dashboard</h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Wrap tab content in ErrorBoundary to avoid blank page on runtime errors */}
          {/* @ts-ignore */}
          <ErrorBoundary>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
          </TabsList>

          {/* Dashboard Overview */}
          <TabsContent value="dashboard">
            {dashboardStats && (
              <>
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <Users className="h-8 w-8 text-blue-600" />
                        <div className="ml-4">
                          <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                          <p className="text-2xl font-bold">{dashboardStats.overview.totalUsers}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <Package className="h-8 w-8 text-green-600" />
                        <div className="ml-4">
                          <p className="text-sm font-medium text-muted-foreground">Products</p>
                          <p className="text-2xl font-bold">{dashboardStats.overview.totalProducts}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <ShoppingCart className="h-8 w-8 text-purple-600" />
                        <div className="ml-4">
                          <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                          <p className="text-2xl font-bold">{dashboardStats.overview.totalOrders}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <DollarSign className="h-8 w-8 text-yellow-600" />
                        <div className="ml-4">
                          <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                          <p className="text-2xl font-bold">{formatCurrency(Number(dashboardStats.overview.totalRevenue))}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <ShoppingCart className="h-8 w-8 text-orange-600" />
                        <div className="ml-4">
                          <p className="text-sm font-medium text-muted-foreground">Pending Orders</p>
                          <p className="text-2xl font-bold">{dashboardStats.overview.pendingOrders}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <AlertTriangle className="h-8 w-8 text-red-600" />
                        <div className="ml-4">
                          <p className="text-sm font-medium text-muted-foreground">Low Stock</p>
                          <p className="text-2xl font-bold">{dashboardStats.overview.lowStockProducts}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Orders */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {dashboardStats.recentOrders.map((order) => (
                          <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <p className="font-medium">{order.orderNumber}</p>
                              <p className="text-sm text-muted-foreground">{order.customerName}</p>
                              <p className="text-sm text-muted-foreground">{formatDate(order.createdAt)}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{formatCurrency(Number(order.totalAmount))}</p>
                              <Badge variant={getStatusBadgeVariant(order.status)}>{order.status}</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Top Products</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {dashboardStats.topProducts.map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-4">
                              {item.product?.images?.[0] && (
                                <img 
                                  src={item.product.images[0].url} 
                                  alt={item.product.name}
                                  className="w-12 h-12 object-cover rounded"
                                />
                              )}
                              <div>
                                <p className="font-medium">{item.product?.name}</p>
                                <p className="text-sm text-muted-foreground">{formatCurrency(Number(item.product?.price))}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{item.totalSold} sold</p>
                              <p className="text-sm text-muted-foreground">{item.orderCount} orders</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </TabsContent>

          {/* Orders Management */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Orders Management</CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search orders..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Filter status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                        <SelectItem value="PROCESSING">Processing</SelectItem>
                        <SelectItem value="SHIPPED">Shipped</SelectItem>
                        <SelectItem value="DELIVERED">Delivered</SelectItem>
                        <SelectItem value="CANCELLED">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {loading ? (
                    <div className="text-center py-8">Loading...</div>
                  ) : orders.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">No orders found</div>
                  ) : (
                    orders.map((order) => (
                      <div key={order.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h3 className="font-medium">{order.orderNumber}</h3>
                            <p className="text-sm text-muted-foreground">
                              {order.user.name} - {order.user.email}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{formatCurrency(Number(order.totalAmount))}</p>
                            <p className="text-sm text-muted-foreground">{formatDate(order.createdAt)}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Badge variant={getStatusBadgeVariant(order.status)}>{order.status}</Badge>
                            <Badge variant={getStatusBadgeVariant(order.paymentStatus)}>{order.paymentStatus}</Badge>
                            <span className="text-sm text-muted-foreground">{order.items.length} items</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Select value={order.status} onValueChange={(value) => handleUpdateOrderStatus(order.id, value)}>
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="PENDING">Pending</SelectItem>
                                <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                                <SelectItem value="PROCESSING">Processing</SelectItem>
                                <SelectItem value="SHIPPED">Shipped</SelectItem>
                                <SelectItem value="DELIVERED">Delivered</SelectItem>
                                <SelectItem value="CANCELLED">Cancelled</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Management */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Users Management</CardTitle>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {loading ? (
                    <div className="text-center py-8">Loading...</div>
                  ) : users.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">No users found</div>
                  ) : (
                    users.map((user) => (
                      <div key={user.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="font-medium">{user.name}</h3>
                              <Badge variant={user.role === 'ADMIN' ? 'default' : user.role === 'SUPER_ADMIN' ? 'destructive' : 'secondary'}>
                                {user.role}
                              </Badge>
                              {!user.isActive && <Badge variant="destructive">Inactive</Badge>}
                            </div>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                            <p className="text-sm text-muted-foreground">
                              {user.orderCount} orders • {user.reviewCount} reviews • Joined {formatDate(user.createdAt)}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button 
                              variant={user.isActive ? "destructive" : "default"}
                              size="sm"
                              onClick={() => handleUpdateUserStatus(user.id, !user.isActive)}
                            >
                              {user.isActive ? 'Deactivate' : 'Activate'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Management */}
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Products ({products.length})</CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                    <AddProductDialog onProductAdded={handleProductAdded} />
                    {editingProduct && (
                      <AddProductDialog
                        product={editingProduct}
                        open={editDialogOpen}
                        onOpenChange={(open) => {
                          setEditDialogOpen(open);
                          if (!open) setEditingProduct(null);
                        }}
                        onProductAdded={handleProductUpdated}
                      />
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">Loading...</div>
                ) : products.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">No products found</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Name</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Price</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Sale Price</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Stock</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Category</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product) => (
                          <tr key={product.id} className="border-b hover:bg-muted/50">
                            <td className="py-3 px-4">
                              <div>
                                <p className="font-medium">{product.name}</p>
                                <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className="font-medium">${Number(product.price).toFixed(2)}</span>
                            </td>
                            <td className="py-3 px-4">
                              {product.comparePrice ? (
                                <span className="font-medium">${Number(product.comparePrice).toFixed(2)}</span>
                              ) : (
                                <span className="text-muted-foreground">-</span>
                              )}
                            </td>
                            <td className="py-3 px-4">
                              <span className={`font-medium ${
                                product.quantity < 10 ? 'text-red-600' : 
                                product.quantity < 50 ? 'text-yellow-600' : 'text-green-600'
                              }`}>
                                {product.quantity}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span className="text-sm">{product.category.name}</span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-1">
                                <Badge variant={product.isActive ? 'default' : 'destructive'}>
                                  {product.isActive ? 'Active' : 'Inactive'}
                                </Badge>
                                {product.isFeatured && <Badge variant="secondary">Featured</Badge>}
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-2">
                                <Button variant="outline" size="sm" title="Edit" onClick={() => handleEditProduct(product)}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="destructive" 
                                  size="sm"
                                  title="Delete"
                                  onClick={() => handleDeleteProduct(product.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          </ErrorBoundary>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
