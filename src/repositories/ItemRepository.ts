import { EntityRepository, Repository } from 'typeorm';;
import ItemModel from '../models/itemModel';

@EntityRepository(ItemModel)
class ItemRepository extends Repository<ItemModel>{

    public async findByCategorie(categorie: string): Promise<ItemModel[] | null> {
        const foundItem = await this.find({
            where: [
                { category: categorie }
            ]
        });


        if (foundItem.length == 0) {
            throw new Error("Category doesn't not found");

        }

        return foundItem;
    }

    public async showAllFounded() {
        const foundItem = await this.find({
            where: [
                { situation: 1 }
            ]
        });


        if (foundItem.length == 0) {
            throw new Error("Categoria não encontrada");

        }

        return foundItem;
    }
}

export default ItemRepository;