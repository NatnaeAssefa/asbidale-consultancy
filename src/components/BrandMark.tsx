import Image from "next/image";

export function BrandMark() {
  return (
    <Image
      src="/logo.png"
      alt="Asbidale Consultancy Services Pvt. Ltd. Co."
      width={34}
      height={34}
      priority
    />
  );
}
