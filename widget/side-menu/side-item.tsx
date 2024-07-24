import useMenuStore from "@/hooks/useMenuStore";
import Link from "next/link";
import React from "react";

interface listProps {
  items: {
    id: number;
    label: string;
    link: string;
    icon: React.ReactNode;
  };
  activeMenuWidthState: boolean;
  path: string;
}

export const SideItem: React.FC<listProps> = ({
  items,
  activeMenuWidthState,
  path,
}) => {
  const { activeMenu, setActiveMenu } = useMenuStore();
  const handleMenuClick = (link: string) => {
    setActiveMenu(link);
  };

  return (
    <Link href={items.link}>
      <li
        key={items.id}
        className={`${activeMenuWidthState === true ? "w-full" : ""} ${
          activeMenu === items.link ? "text-menu" : ""
        } mb-2 py-2 px-2 rounded-md text-center list-none last:mb-0 font-bold hover:bg-transparent/10`}
        onClick={() => handleMenuClick(items.link)}
      >
        <div className="flex items-center flex-wrap">
          <span className="mr-5">{items.icon}</span>
          {activeMenuWidthState && <h2 className="text-sm">{items.label}</h2>}
        </div>
      </li>
    </Link>
  );
};
