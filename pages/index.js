import IndiaMap from "../components/mapComponent";
import React, { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
export default function Home() {
  const [content, setContent] = useState("");
  const menu = useSelector((state) => state.menu.rupees);
  const status = useSelector((state) => state.menu.status);

  useEffect(() => {
    if (status === "failed")
      toast.error("There is some error while fetchind data");
  }, [status]);

  // Add commas and currency to the amount
  const addCommasAndCurrency = (amount) => {
    return amount.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });
  };

  return (
    <>
      <Box h="100%" bg="#F0EEED">
        <Toaster />
        <IndiaMap setTooltipContent={setContent} />
        <ReactTooltip>
          {menu === true
            ? content.split(":")[0] +
              addCommasAndCurrency(parseInt(content.split(":")[1]))
            : content}
        </ReactTooltip>
      </Box>
    </>
  );
}
