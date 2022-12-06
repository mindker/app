import { Image } from '@chakra-ui/react';

const ImageComponent = ({ src, alt, objectFit, boxSize, borderRadius, title, ml }) => {
  return (
    <Image
      src={src}
      alt={alt}
      objectFit={objectFit}
      boxSize={boxSize}
      borderRadius={borderRadius}
      title={title}
      ml={ml}
    />
  );
};

export default ImageComponent;
