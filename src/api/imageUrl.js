const getImageUrl = (product) => {
  return `${import.meta.env.VITE_PB_URL}/api/files/${product.collectionId}/${product.id}/${product.product_image}`;
};

export default getImageUrl;
