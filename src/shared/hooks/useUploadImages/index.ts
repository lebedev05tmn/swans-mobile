import { uploadImage } from '@/src/shared/config/mediaApi';

const useUploadImages = async (images: string[]): Promise<string[]> => {
    const uploadImages: string[] = [];

    await Promise.all(
        images.map(async (item) => {
            const result = await uploadImage(item);
            uploadImages.push(result.body);
        }),
    );

    return uploadImages;
};

export default useUploadImages;
