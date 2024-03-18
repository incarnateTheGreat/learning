"use client";

import { useState } from "react";
import classNames from "classnames";
import { ImageSkeleton } from "learning/@/components/ui/ImageSkeleton/ImageSkeleton";
import Image from "next/image";

type ImageThumbnailProps = {
  name: string;
  photoExtension: string;
  imageClassnames: string;
};

const ImageThumbnail = ({
  name,
  photoExtension,
  imageClassnames,
}: ImageThumbnailProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Image
        src={`https://resources.premierleague.com/premierleague/photos/players/250x250/p${photoExtension}`}
        alt={name}
        height={250}
        width={250}
        className={
          loaded
            ? classNames("playerImageAnim", imageClassnames)
            : "h-0 w-0 opacity-0"
        }
        onLoad={() => setLoaded(true)}
      />
      {!loaded ? (
        <ImageSkeleton
          className={classNames("rounded-xl md:m-0", imageClassnames)}
        />
      ) : null}
    </>
  );
};

export default ImageThumbnail;
