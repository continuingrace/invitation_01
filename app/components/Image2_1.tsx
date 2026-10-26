/* eslint-disable @next/next/no-img-element */
import { ImgHTMLAttributes } from "react";

type Image2_1Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src">;

export default function Image2_1({ alt = "", className = "", ...props }: Image2_1Props) {
  return <img {...props} alt={alt} className={`figma-image2-1 ${className}`.trim()} src="/figma/image2-1.png" />;
}
