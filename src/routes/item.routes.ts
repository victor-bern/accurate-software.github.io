import { Router } from 'express';
import fileUpload from 'express-fileupload';
import crypto from 'crypto';
import { getCustomRepository } from 'typeorm';


import ItemRepository from '../repositories/ItemRepository';
import CreateItemService from '../services/item/createItemService';
import findItemService from '../services/item/foundItemService';
import mimeTypeVerify from '../functions/mimetypeVerify';
import verifyFileSize from '../functions/verifyFileSize';
import generatyRelatory from '../functions/generateRelatory';


const itemRouter = Router();


itemRouter.get('/', async (req, res) => {
    const itemRepository = getCustomRepository(ItemRepository);

    const items = await itemRepository.find();


    generatyRelatory(items);

    return res.json(items);
});


itemRouter.get('/found', async (req, res) => {
    try {
        const itemRepository = getCustomRepository(ItemRepository);

        const items = await itemRepository.showAllFounded();

        return res.json(items);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }

})

itemRouter.get('/category/:category', async (req, res) => {
    try {
        const { category } = req.params;

        const itemRepository = getCustomRepository(ItemRepository);

        const items = await itemRepository.findByCategorie(category);



        return res.json(items);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }

})

itemRouter.put('/find/:id', async (req, res) => {
    try {

        const { id } = req.params;

        const findService = new findItemService();

        const founditem = await findService.execute(id);


        return res.json({ item: founditem });


    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})

itemRouter.post('/create', fileUpload(), async (req, res) => {
    try {
        const { name, category, localization } = req.body;

        if (!req.files) {
            throw new Error("No file selected")
        }

        const file = req.files.photo

        verifyFileSize(file.size);
        mimeTypeVerify(file.mimetype);

        const fileHash = crypto.randomBytes(10).toString('hex');
        const fileName = `${fileHash}-${file.name}`;

        file.mv('./uploads/' + fileName, (err) => {
            if (err) {
                throw new Error("Upload Error ")
            }
        });
        const createItem = new CreateItemService();


        const item = await createItem.execute({
            name,
            "photo": fileName,
            category,
            localization
        })

        return res.json(item);


    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})




export default itemRouter;