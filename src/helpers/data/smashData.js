import prods from './getProducts';
import items from './getItems';

const itemsName = () => new Promise((resolve, reject) => {
  prods.getProducts()
    .then(allProds => items.getItems()
      .then((allItems) => {
        const itemName = [];
        allProds.forEach((prod) => {
          allItems.forEach((item) => {
            if (prod.id === item.productId) {
              const newObj = {
                itemId: item.id,
                postId: item.postId,
                prodName: prod.prodName,
              };
              itemName.push(newObj);
            }
            resolve(itemName);
          });
        });
      }))
    .catch(err => reject(err));
});


export default { itemsName };
