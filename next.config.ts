import type { NextConfig } from "next";
import os from "os";

const allowedDevOrigins = Object.values(os.networkInterfaces())
  .flat()
  .filter(
    (iface): iface is NonNullable<typeof iface> =>
      !!iface &&
      iface.family === "IPv4" &&
      !iface.internal
  )
  .map((iface) => iface.address);

const nextConfig: NextConfig = {
  allowedDevOrigins,
};

export default nextConfig;