/* eslint-disable @next/next/no-img-element */
import { ImgHTMLAttributes } from "react";

type Image2Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string;
};

export default function Image2({ alt = "", className = "", src, ...props }: Image2Props) {
  return <img {...props} alt={alt} className={`ds-image2 ${className}`.trim()} src={src} />;
}
