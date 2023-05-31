import { Height, PinDropSharp } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import Select from "./Select";
import "./index.css";

const buildCategoriesTree = (data, result, depth = 0) => {
  data &&
    data.map(async (item) => {
      let node = {
        id: item.id || null,
        label:
          `----`.repeat(depth) +
          "|__.".repeat(depth ? 1 : 0) +
          " " +
          (item.title ? item.title.en : item.name || "errorInNaming"),
      };
      result.push(node);
      if (item.childrens && item.childrens.length)
        buildCategoriesTree(item.childrens, result, depth + 1);
    });
};
const buildUserGroup = (data, result, isRTL) => {
  data &&
    data.map(async (item) => {
      let node = {
        id: item.id || null,
        label: item.name
          ? item?.name
          : isRTL
          ? item?.title?.ar
          : item?.title?.en,
        value: item.id || null,
        children: [],
      };
      result.push(node);
      if (item.childrens && item.childrens.length)
        buildUserGroup(item.childrens, node.children);
    });
};
const buildTitle = (data, result) => {
  data &&
    data.map(async (item) => {
      let node = {
        id: item.id || null,
        label: item.title ? item.title : item.email,
        children: [],
      };
      result.push(node);
    });
};

const DropDownTree = ({
  data,
  value,
  isUserGroup,
  showTitle,
  className,
  name,
  handleChange,
  multiple,
  input,
  native,
  inputProps,
  renderValue,
  disabled,
  isRTL,
}) => {
  let result = [];
  if (isUserGroup) {
    buildUserGroup(data, result, isRTL);
  }
  if (isUserGroup == false) buildCategoriesTree(data, result);

  if (showTitle) {
    buildTitle(data, result);
  }
  if (!isUserGroup && !showTitle) {
    result.push({ id: null, label: "unCategorized" });
  }
  return (
    <Select
      variant="outlined"
      menuItems={result.map((item) => item.label)}
      value={value}
      name={name}
      className={className}
      selectingValues={result.map((item) => item.id)}
      onChange={handleChange}
      isUserGroup={isUserGroup}
      input={input}
      native={native}
      inputProps={inputProps}
      renderValue={renderValue}
      disabled={disabled}
    />
  );
};

export default DropDownTree;
