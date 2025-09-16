import data from './placeholder-images.json';

type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

type PlaceholderImagesData = {
  [key: string]: ImagePlaceholder;
};

// Transform array into a key-value object for easier access
export const placeholderImages = (data.placeholderImages as ImagePlaceholder[]).reduce((acc, current) => {
    acc[current.id] = current;
    return acc;
}, {} as PlaceholderImagesData);
