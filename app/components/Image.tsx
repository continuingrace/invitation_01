/* eslint-disable @next/next/no-img-element */
import { ImgHTMLAttributes } from "react";

type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string;
  size?: "character" | "flag";
};

export default function Image({ alt = "", className = "", size = "character", ...props }: ImageProps) {
  return <img {...props} alt={alt} className={`ds-image ds-image-${size} ${className}`.trim()} />;
}
