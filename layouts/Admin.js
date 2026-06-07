// layouts/Admin.js  (diff: replaced <Onboarding> with <TourTooltip>)
// The tour now:
//  - lands on /admin/products (not /admin/dashboard)
//  - spotlights real DOM elements with a cutout overlay
//  - anchors a popover to each highlighted element
//  - navigates between pages during the tour as needed
//
// ⚠️  Add data-tour="..." attributes to key elements (see comments below)
//     so the tour can find them reliably even if Tailwind class names change.

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";
import Modal from "components/Modal";
import useDynamicState from "../utils/dynamicState";
import TabBody from "components/TabBody";
import useSession from "utils/useSession";
import FetchAPI from "controllers/fetchAPI";
import PageChange from "components/PreLoader";
import Toast from "components/Toast";
import TourTooltip from "components/Tour/TourTooltip"; // ← new

export default function Admin({ children }) {
  const router = useRouter();
  const { sessionData, loading } = useSession();
  const [showTour, setShowTour] = useState(false);

  let _as = useDynamicState(
    "modalToggle",
    "reloadChild",
    "alumni",
    "dashboard",
    "shopping",
    "products",
    "category",
    "sidebarToggle",
    "orders",
    "inventory",
    "resourcePlans",
    "wishList",
    "cart",
    "profile",
    "user",
    "groups",
    "toast",
    "finance"
  );

  // ── Tour: show once per user, landing on /admin/products ──────────────────
  useEffect(() => {
    if (!sessionData) return;
    const key = `lifestyle_onboarded_${sessionData.user.id}`;
    const seen = localStorage.getItem(key);
    if (!seen) {
      // Navigate to products first, then show the tour
      if (router.pathname !== "/admin/products") {
        router.push("/admin/products").then(() => setShowTour(true));
      } else {
        setShowTour(true);
      }
    }
  }, [sessionData]);

  const handleTourFinish = async () => {
    setShowTour(false);
    if (!sessionData) return;
    const key = `lifestyle_onboarded_${sessionData.user.id}`;
    localStorage.setItem(key, "true");
    try {
      await FetchAPI("/api/users", "PUT", {
        _id: sessionData.user.id,
        onboardingSeen: true,
      });
    } catch (e) {
      // non-critical — ignore
    }
  };

  useEffect(() => {
    const open = (e) => _as.setModalToggle(e.detail);
    const close = () => _as.setModalToggle(0);
    window.addEventListener('tour:openModal', open);
    window.addEventListener('tour:closeModal', close);
    return () => {
      window.removeEventListener('tour:openModal', open);
      window.removeEventListener('tour:closeModal', close);
    };
  }, [_as.setModalToggle]);

  // ── Toast auto-dismiss ────────────────────────────────────────────────────
  useEffect(() => {
    if (_as.toast) {
      const timer = setTimeout(() => _as.setToast(0), 2000);
      return () => clearTimeout(timer);
    }
  }, [_as.toast]);

  // ── User data fetch ───────────────────────────────────────────────────────
  useEffect(() => {
    const fetchData = async () => {
      if (!sessionData) return;
      try {
        const res = await FetchAPI("/api/users", "GET", sessionData.user);
        _as.setUser(res);
        const stored = localStorage.getItem("projectLifestyle_activeGroup");
        if (stored) {
          const groupExist =
            res?.groups?.some((g) => g._id === stored) || false;
          if (!groupExist)
            localStorage.setItem(
              "projectLifestyle_activeGroup",
              sessionData.user.groupId
            );
        } else {
          localStorage.setItem(
            "projectLifestyle_activeGroup",
            sessionData.user.groupId
          );
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [sessionData, _as.reloadChild]);

  // ── Cart persistence ──────────────────────────────────────────────────────
  useEffect(() => {
    const key = `projectLifestyle_cart_${localStorage.getItem(
      "projectLifestyle_activeGroup"
    )}`;
    const stored = localStorage.getItem(key);
    if (stored) _as.setCart(JSON.parse(stored));
  }, []);

  useEffect(() => {
    const key = `projectLifestyle_cart_${localStorage.getItem(
      "projectLifestyle_activeGroup"
    )}`;
    localStorage.setItem(key, JSON.stringify(_as.cart));
  }, [_as.cart]);

  // ── Page config ───────────────────────────────────────────────────────────
  let _ac = [
    {
      title: "Dashboard",
      route: "/admin/dashboard",
      tabSections: ["code Template", "Test Cases", "Documentation"],
      tabButtons: [["GROUP"], ["GROUP"], ["GROUP"]],
      setActiveTabSection: _as.setDashboardTab,
      activeTabSection: _as.dashboardTab,
      setModalToggle: _as.setModalToggle,
    },
    {
      title: "Products",
      route: "/admin/products",
      // ↓ Add data-tour attributes to the tab buttons inside AdminNavbar/TabBody
      //   so TourTooltip selectors can find them regardless of generated class names.
      //   e.g. <button data-tour="add-btn" ...>ADD</button>
      //        <button data-tour="cart-btn" ...>CART</button>
      //        tabs: data-tour="products-tab", data-tour="wishlist-tab", data-tour="inventory-tab"
      tabSections: ["Products List", "Category", "Wish List", "Inventory", "Resource Plan", "Orders"],
      tabButtons: [
        ["GROUP", "ADD", "CART"],
        ["GROUP", "ADD", "CART"],
        ["GROUP", "CART"],
        ["GROUP", "CART"],
        ["GROUP", "ADD", "CART"],
        ["GROUP", "CART"],
      ],
      setActiveTabSection: _as.setProductsTab,
      activeTabSection: _as.productsTab,
      setModalToggle: _as.setModalToggle,
    },
    {
      title: "Finance",
      route: "/admin/finance",
      tabSections: ["code Template", "Test Cases", "Documentation"],
      tabButtons: [["GROUP"], ["GROUP"], ["GROUP"]],
      setActiveTabSection: _as.setFinanceTab,
      activeTabSection: _as.financeTab,
      setModalToggle: _as.setModalToggle,
    },
    {},
    {
      title: "Documentation",
      route: "/admin/documentation",
      tabSections: [],
      tabButtons: [],
      setActiveTabSection: _as.setShoppingTab,
      activeTabSection: _as.shoppingTab,
      setModalToggle: _as.setModalToggle,
    },
    {
      title: "Profile",
      route: "/admin/profile",
      tabSections: ["My Profile", "Friends", "Groups", "Templates"],
      tabButtons: [
        ["GROUP", "CART"],
        ["GROUP", "ADD", "CART"],
        ["GROUP", "ADD", "CART"],
        ["GROUP", "CART"],
      ],
      setActiveTabSection: _as.setProfileTab,
      activeTabSection: _as.profileTab,
      setModalToggle: _as.setModalToggle,
    },
  ];

  return (
    <>
      {/* ── Tour overlay (renders above everything) ── */}
      {showTour && <TourTooltip onFinish={handleTourFinish} />}

      <div className="flex h-fit bg-[#F9FAFE]">
        <div className="md:relative fixed bottom-0 h-16">
          <Sidebar _ac={_ac} _as={_as} />
        </div>
        <div className="flex flex-col w-full h-screen">
          <div className="md:relative fixed bg-[#F9FAFE] z-3">
            <AdminNavbar _ac={_ac} _as={_as} />
          </div>
          <div className="bg-opacity-50 flex-grow p-4 md:py-0 py-44 max-w-full flex flex-col justify-between">
            <div className="bg-[#f9fafeb3] h-full w-full rounded-3xl p-3">
              {_as.toast != 0 && (
                <Toast message={`${_as.toast}`} setToast={_as.setToast} />
              )}
              {_as?.user?._id ? <TabBody _as={_as} /> : <PageChange />}
              <Modal _as={_as} />
            </div>
          </div>
          <div className="md:block hidden">
            <FooterAdmin />
          </div>
        </div>
      </div>
    </>
  );
}