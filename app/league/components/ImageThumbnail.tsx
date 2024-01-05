"use client";

import { useState } from "react";
import { ImageSkeleton } from "learning/@/components/ui/ImageSkeleton/ImageSkeleton";
import Image from "next/image";

type ImageThumbnailProps = {
  web_name: string;
  photoExtension: string;
};

const ImageThumbnail = ({ web_name, photoExtension }: ImageThumbnailProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Image
        src={`https://resources.premierleague.com/premierleague/photos/players/250x250/p${photoExtension}`}
        alt={web_name}
        height={250}
        width={250}
        className={
          loaded
            ? "m-auto h-[50%] w-[50%] md:h-[250px] md:w-[250px]"
            : "h-0 w-0"
        }
        onLoad={() => {
          setLoaded(true);
        }}
      />
      {!loaded ? (
        <ImageSkeleton className="h-[250px] w-[250px] rounded-xl" />
      ) : null}
    </>
  );
};

export default ImageThumbnail;
