import { useProductsContext } from "../contexts/productsContext";

export const getIngredients = async () => {
    const { products } = useProductsContext();
    var localData = [];
    if (products != undefined && products.length > 0) {
        var counter = 0;
        for (var i = 0; i < products.length; i++) {
            var index = products[i].description.indexOf('(Ingredients:');
            if (index != -1) {
                var descIngredients = products[i].description.substring(index+14, products[i].description.length-1);
                var array = descIngredients.split(', ');
                for (var j = 0; j < array.length; j++) {
                    var ingredientExists = false;
                    if (counter < 20) { // ako jos uvijek nemamo 20 sastojaka, poredimo i ovaj trenutni
                        for (var k = 0; k < localData.length; k++) {
                            if (localData[k] != undefined && localData[k].label.trim().toLowerCase() === array[j].trim().toLowerCase()) {
                                ingredientExists = true;
                                break;
                            }
                        }        
                        if (!ingredientExists) {
                            counter++;
                            localData.push({
                                'label': array[j].toLowerCase()
                            });
                        }
                    } else if (counter >= 20) {
                        //setMockData(localData);
                        return localData;
                    }
                }
            }
            
        }
    }
}