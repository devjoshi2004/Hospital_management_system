"use client";

import React from "react";

const HeyForm = ({
  formId,
  url,
  width = "100",
  widthType = "%",
  height = "500",
  heightType = "px",
  autoResize = true,
  type = "standard",
}) => {
  return (
    <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
      <div
        data-heyform-id={formId}
        data-heyform-type={type}
        data-heyform-custom-url={url}
        data-heyform-width-type={widthType}
        data-heyform-width={width}
        data-heyform-height-type={heightType}
        data-heyform-height={height}
        data-heyform-auto-resize-height={autoResize.toString()}
      />
    </div>
  );
};

export default HeyForm;
