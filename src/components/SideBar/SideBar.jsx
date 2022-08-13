import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import classes from "./SideBar.module.css";
const { Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem(
    "Posts",
    "1",
    <Link className={classes.sideItem} to="/posts">
      <i className="fas fa-th-large"></i>
    </Link>
  ),
  getItem(
    "Tgas",
    "2",
    <Link className={classes.sideItem} to="/tags">
      <i className="fa-solid fa-tags"></i>
    </Link>
  ),
  getItem(
    "Users",
    "3",
    <Link className={classes.sideItem} to="/tags">
      <i className="fa-solid fa-users"></i>
    </Link>
  ),
  getItem(
    "Files",
    "4",
    <Link className={classes.sideItem} to="/files">
      <i className="fa-solid fa-folder-open"></i>
    </Link>
  ),
  getItem(
    "Api logs",
    "5",
    <Link className={classes.sideItem} to="/api/logs">
      <i className="fa-solid fa-file-waveform"></i>
    </Link>
  ),
];

export default function SideBar() {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (v) => {
    setCollapsed(v);
  };

  return (
    <div>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        className={classes.sider}
      >
        <div className={classes.siderContainer}>
          <div className="logo">

          </div>
          <Menu
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
            className={classes.menu}
          />
        </div>
      </Sider>
    </div>
  );
}
