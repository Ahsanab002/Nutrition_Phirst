import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, Loader2 } from "lucide-react";
import { createProduct, updateProduct, getCategories, type AdminProduct } from "@/services/adminService";
import { useToast } from "@/hooks/use-toast";

interface AddProductDialogProps {
  onProductAdded: (product: AdminProduct) => void;
  product?: AdminProduct | null;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const AddProductDialog = ({ onProductAdded, product = null, open: controlledOpen, onOpenChange }: AddProductDialogProps) => {
  const isControlled = controlledOpen !== undefined;
  const [openState, setOpenState] = useState(false);
  const open = isControlled ? controlledOpen! : openState;
    const handleOpenChange = (val: boolean) => {
    if (onOpenChange) onOpenChange(val);
    else setOpenState(val);
  };
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Array<{id: string, name: string}>>([]);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: product?.name || "",
    slug: product?.slug || "",
    description: product?.description || "",
    shortDescription: product?.shortDescription || "",
    sku: product?.sku || "",
    price: product?.price ? String(product.price) : "",
    comparePrice: product?.comparePrice ? String(product.comparePrice) : "",
    categoryId: product?.category?.id || "",
    quantity: product?.quantity ? String(product.quantity) : "0",
    isFeatured: product?.isFeatured || false,
    metaTitle: product?.metaTitle || "",
    metaDescription: product?.metaDescription || "",
    imageUrl: product?.images?.[0]?.url || "",
    imageAltText: product?.images?.[0]?.altText || ""
  });

  // Generate slug from name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleNameChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      name: value,
      slug: generateSlug(value),
      metaTitle: value
    }));
  };

  // Load categories when dialog opens
  useEffect(() => {
    if (open) {
      loadCategories();
      // If editing, pre-fill formData
      if (product) {
        setFormData({
          name: product.name || "",
          slug: product.slug || "",
          description: product.description || "",
          shortDescription: product.shortDescription || "",
          sku: product.sku || "",
          price: product.price ? String(product.price) : "",
          comparePrice: product.comparePrice ? String(product.comparePrice) : "",
          categoryId: product.category?.id || "",
          quantity: product.quantity ? String(product.quantity) : "0",
          isFeatured: product.isFeatured || false,
          metaTitle: product.metaTitle || "",
          metaDescription: product.metaDescription || "",
          imageUrl: product.images?.[0]?.url || "",
          imageAltText: product.images?.[0]?.altText || ""
        });
      }
    }
  }, [open, product]);

  const loadCategories = async () => {
    try {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Failed to load categories:', error);
      // Fallback to default categories if API fails
      setCategories([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Basic validation
      if (!formData.name || !formData.sku || !formData.price || !formData.categoryId) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }

      const productData = {
        name: formData.name,
        slug: formData.slug,
        description: formData.description || undefined,
        shortDescription: formData.shortDescription || undefined,
        sku: formData.sku,
        price: parseFloat(formData.price),
        comparePrice: formData.comparePrice ? parseFloat(formData.comparePrice) : undefined,
        categoryId: formData.categoryId,
        quantity: parseInt(formData.quantity),
        isFeatured: formData.isFeatured,
        metaTitle: formData.metaTitle || undefined,
        metaDescription: formData.metaDescription || undefined,
        images: formData.imageUrl ? [{
          url: formData.imageUrl,
          altText: formData.imageAltText || formData.name
        }] : undefined
      };

      let resultProduct;
      if (product && product.id) {
        // Editing existing product
        resultProduct = await updateProduct(product.id, productData);
        toast({
          title: "Success",
          description: "Product updated successfully",
        });
      } else {
        // Creating new product
        resultProduct = await createProduct(productData);
        toast({
          title: "Success",
          description: "Product created successfully",
        });
      }

      onProductAdded(resultProduct);
  handleOpenChange(false);

      // Reset form
      setFormData({
        name: "",
        slug: "",
        description: "",
        shortDescription: "",
        sku: "",
        price: "",
        comparePrice: "",
        categoryId: "",
        quantity: "0",
        isFeatured: false,
        metaTitle: "",
        metaDescription: "",
        imageUrl: "",
        imageAltText: ""
      });
    } catch (error: any) {
      console.error(product ? 'Update product error:' : 'Create product error:', error);
      toast({
        title: "Error",
        description: error.message || (product ? "Failed to update product" : "Failed to create product"),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {!product && (
        <DialogTrigger asChild>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </DialogTrigger>
      )}
  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product ? "Edit Product" : "Add New Product"}</DialogTitle>
          <DialogDescription>
            {product ? "Edit product details and save changes." : "Create a new product in your catalog. Fields marked with * are required."}
          </DialogDescription>
        </DialogHeader>
        
  <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Enter product name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sku">SKU *</Label>
              <Input
                id="sku"
                value={formData.sku}
                onChange={(e) => setFormData(prev => ({ ...prev, sku: e.target.value }))}
                placeholder="Enter SKU"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">URL Slug</Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
              placeholder="product-url-slug"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="shortDescription">Short Description</Label>
            <Textarea
              id="shortDescription"
              value={formData.shortDescription}
              onChange={(e) => setFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
              placeholder="Brief product description"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Full Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Detailed product description"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                placeholder="0.00"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="comparePrice">Compare Price</Label>
              <Input
                id="comparePrice"
                type="number"
                step="0.01"
                value={formData.comparePrice}
                onChange={(e) => setFormData(prev => ({ ...prev, comparePrice: e.target.value }))}
                placeholder="0.00"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
                placeholder="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="categoryId">Category *</Label>
            <Select value={formData.categoryId} onValueChange={(value) => setFormData(prev => ({ ...prev, categoryId: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                value={formData.imageUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="imageAltText">Image Alt Text</Label>
              <Input
                id="imageAltText"
                value={formData.imageAltText}
                onChange={(e) => setFormData(prev => ({ ...prev, imageAltText: e.target.value }))}
                placeholder="Image description"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="metaTitle">Meta Title</Label>
              <Input
                id="metaTitle"
                value={formData.metaTitle}
                onChange={(e) => setFormData(prev => ({ ...prev, metaTitle: e.target.value }))}
                placeholder="SEO title"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="featured"
                checked={formData.isFeatured}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isFeatured: checked }))}
              />
              <Label htmlFor="featured">Featured Product</Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="metaDescription">Meta Description</Label>
            <Textarea
              id="metaDescription"
              value={formData.metaDescription}
              onChange={(e) => setFormData(prev => ({ ...prev, metaDescription: e.target.value }))}
              placeholder="SEO description"
              rows={2}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {product ? "Save Changes" : "Create Product"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;
