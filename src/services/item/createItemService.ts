import { getRepository } from 'typeorm';
import itemModel from '../../models/itemModel';


interface Request {
  name: string;
  photo: string,
  category: string
  localization: string;
}


class createItemService {
  public async execute({ name, photo, category, localization }: Request): Promise<itemModel> {

    const customerRepository = getRepository(itemModel);


    if (name === "" || photo === "" || category === "" || localization === "") {
      throw new Error("Insert all data");
    }

    const item = customerRepository.create({
      name,
      photo,
      category,
      localization
    });

    await customerRepository.save(item);

    return item;
  }
}

export default createItemService;