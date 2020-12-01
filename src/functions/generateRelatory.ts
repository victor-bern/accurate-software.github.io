import ItemModel from "../models/itemModel";
import fs from 'fs';
import pdfkit from 'pdfkit';


const doc = new pdfkit();

export default (items: Array<ItemModel>): void => {
    doc.fontSize(30);
    doc.text("Relátorio de Items", 190);
    doc.moveDown(1);
    doc.fontSize(20);
    doc.text("Encontrados", 210);
    doc.moveDown(1);
    items.forEach(item => {
        if (item.situation === 1) {
            const date = new Date(item.updated_at).toLocaleDateString('pt-BR', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            })
            doc.fontSize(12);
            doc.text(`O item ${item.name} ainda já foi encontrado no dia ${date}`, 10);
            doc.moveDown(2);
        }
    })
    doc.fontSize(20);
    doc.text("Não Encontrados", 210);
    doc.moveDown(1);

    items.forEach(item => {
        doc.fontSize(12);
        doc.text(`O item ${item.name} ainda não foi encontrado`, 10);
        doc.moveDown(2);
    })
    doc.pipe(fs.createWriteStream('./uploads/relatory.pdf'));

    doc.end()
}