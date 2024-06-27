import { IEntity } from "./types";

export const mapProduct = (item: any): IEntity.IProduct => ({
  id: item.id || 0,
  title: item.title || "",
  description: item.description || "",
  category: item.category || "",
  price: parseFloat(item.price) || 0,
  discountPercentage: parseFloat(item.discountPercentage) || 0,
  rating: parseFloat(item.rating) || 0,
  stock: item.stock || 0,
  tags: item.tags || [],
  brand: item.brand || "",
  weight: parseFloat(item.weight) || 0,
  dimensions: {
    width: parseFloat(item.dimensions.width) || 0,
    height: parseFloat(item.dimensions.height) || 0,
    depth: parseFloat(item.dimensions.depth) || 0,
  },
  warrantyInformation: item.warrantyInformation || "",
  shippingInformation: item.shippingInformation || "",
  availabilityStatus: item.availabilityStatus || "",
  reviews: item.reviews || [],
  returnPolicy: item.returnPolicy || "",
  minimumOrderQuantity: item.minimumOrderQuantity || 0,
  meta: {
    createdAt: item.meta?.createdAt || "",
    updatedAt: item.meta?.updatedAt || "",
    barcode: item.meta?.barcode || "",
    qrCode: item.meta?.qrCode || "",
  },
  images: item.images || [],
  thumbnail: item.thumbnail || "",
});
