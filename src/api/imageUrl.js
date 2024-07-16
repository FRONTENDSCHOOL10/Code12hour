const getImageUrl = (item, fileName = 'product_image') => {
  return `${import.meta.env.VITE_PB_URL}/api/files/${item.collectionId}/${item.id}/${item[fileName]}`;
};

export default getImageUrl;
