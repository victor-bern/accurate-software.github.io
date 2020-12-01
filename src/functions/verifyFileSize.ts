export default (sizeFile: number) => {
    const maxSize = 1 * 1000 * 1000;


    if (sizeFile >= maxSize) {
        throw new Error("File Too Large");
    }
} 