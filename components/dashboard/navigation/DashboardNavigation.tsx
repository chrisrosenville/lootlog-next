"use client";

import "./DashboardNavigation.css";

import { useQuery } from "@tanstack/react-query";

// Components
import { DashboardNavigationItem } from "./DashboardNavigationItem";

// Icons
import {
  FiBox,
  FiEdit,
  FiFolder,
  FiHeart,
  FiInbox,
  FiSettings,
  FiUser,
  FiUsers,
} from "react-icons/fi";

export const DashboardNavigation = () => {
  return (
    <div className="h-[calc(100vh-64px)] min-w-16 flex-1 border-r border-neutral-700">
      {/* Navigation */}
      <ul className="flex h-full flex-col items-center gap-2 py-4">
        <DashboardNavigationItem
          title="My account"
          href="/user"
          icon={<FiUser size={24} />}
        />

        {/* Authors & Admins */}
        {/* {user?.isAdmin
          ? user?.isAuthor && (
              <>
                <DashboardNavigationItem
                  title="New article"
                  href="/author/new-article"
                  icon={<FiEdit />}
                />
                <DashboardNavigationItem
                  title="My articles"
                  href="/author/my-articles"
                  icon={<FiFolder />}
                />
              </>
            )
          : null} */}

        {/* <DashboardNavigationItem
          title="Likes"
          href="/user/likes"
          icon={<FiHeart />}
        />

        <DashboardNavigationItem
          title="Settings"
          href="/user/settings"
          icon={<FiSettings />}
        /> */}

        {/* Admin */}
        {/* {user?.isAdmin && (
          <>

            <div className="dashboard-nav-divider"></div>

            <DashboardNavigationItem
              title="Articles"
              href="/admin/articles"
              icon={<FiInbox />}
            />

            <DashboardNavigationItem
              title="Categories"
              href="/admin/categories"
              icon={<FiBox />}
            />

            <DashboardNavigationItem
              title="Users"
              href="/admin/users"
              icon={<FiUsers />}
            />
          </>
        )} */}
      </ul>
    </div>
  );
};
