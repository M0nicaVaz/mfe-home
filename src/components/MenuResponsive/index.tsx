"use client";
import { useMediaQuery } from "react-responsive";
import MenuSide from "../MenuSide";
import MenuHorizontal from "../MenuHorizontal";
import MenuHamburger from "../MenuHamburger";

export default function MenuResponsive() {
  const isDesktop = useMediaQuery({ minWidth: 1200, maxWidth: 1799 });
  const isTablet = useMediaQuery({ minWidth: 600, maxWidth: 1199 });
  const isMobile = useMediaQuery({ maxWidth: 599 });
  const isDesktopLg = useMediaQuery({ minWidth: 1800 });

  if (isDesktop) return <MenuSide />;
  if (isDesktopLg) return <MenuSide />;
  if (isTablet) return <MenuHorizontal />;
  if (isMobile) return <MenuHamburger />;
  return null;
}
