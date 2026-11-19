import Image from "next/image";

export default function Brand({ compact = false }) {
  return (
    <span className="brand">
      <Image src="/foundly-logo.png" width={compact ? 32 : 40} height={compact ? 32 : 40} alt="" priority />
      <span>Foundly</span>
    </span>
  );
}
