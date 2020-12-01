import { getRepository } from 'typeorm';
import itemModel from '../../models/itemModel';


class findItemService {
    public async execute(id: string): Promise<itemModel | undefined> {

        const customerRepository = getRepository(itemModel);

        const user = await customerRepository.findOne(id);

        if (user?.situation == 1) {
            throw new Error("Item already found");
        }

        if (!(await customerRepository.findOne(id))) {
            throw new Error("Item not found");
        }

        await customerRepository.update(id, {
            situation: 1
        })

        const oldUser = await customerRepository.findOne(id);

        return oldUser;
    }
}

export default findItemService;