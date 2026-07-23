import Image from "next/image";

const LOGO_SRC = "/asbidale-logo.png";

export function BrandMark({
  size = 40,
  priority = false,
}: {
  size?: number;
  priority?: boolean;
}) {
  return (
    <Image
      src={LOGO_SRC}
      alt="Asbidale Consultancy Services"
      width={size}
      height={size}
      priority={priority}
      className="brand-mark-img"
    />
  );
}
