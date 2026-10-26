/* eslint-disable @next/next/no-img-element */

type FallingLeafProps = {
  type: "maple" | "ginkgo";
};

export default function FallingLeaf({ type }: FallingLeafProps) {
  const src = type === "maple" ? "/figma/falling-maple-leaf.png" : "/figma/falling-ginkgo-leaf.png";

  return <img alt="" className="figma-falling-leaf-image" src={src} />;
}
