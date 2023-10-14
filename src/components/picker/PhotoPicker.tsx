"use client";
import React from "react";
import { createPortal } from "react-dom";

interface PhotoPicker {
  onChange: () => void;
}

function PhotoPicker({ onChange }: PhotoPicker) {
  const component = (
    <input
      type="file"
      multiple
      accept=".png, .jpg, .jpeg"
      id="photo-picker"
      hidden
      onChange={onChange}
    />
  );
  return createPortal(
    component,
    document.getElementById("photo-picker-element") as HTMLElement
  );
}

export default PhotoPicker;
