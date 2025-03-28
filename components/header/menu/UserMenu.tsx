import Link from "next/link";

import { FaUserCircle } from "react-icons/fa";
import { FiUser } from "react-icons/fi";

export const UserMenu = async () => {
  return (
    <Link href={"/dashboard/user"}>
      <FiUser size={24} className="cursor-pointer" />
      {/* {!isLoggedIn && <FiUser size={24} className="cursor-pointer" />}
      {isLoggedIn && <FaUserCircle size={28} className="cursor-pointer" />} */}
    </Link>
  );
};
