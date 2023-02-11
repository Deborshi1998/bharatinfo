import React, { useState, memo, useMemo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { Box, Center, Heading } from "@chakra-ui/react";
import INDIA_TOPO_JSON from "../assets/indiaMap.json";
import LinearGradient from "./LinearGradient";
import * as d3 from "d3";
import { useSelector } from "react-redux";
import PacmanLoader from "react-spinners/PacmanLoader";

/**
 * Courtesy: https://rawgit.com/Anujarya300/bubble_maps/master/data/geography-data/india.topo.json
 * Looking topojson for other countries/world?
 * Visit: https://github.com/markmarkoh/datamaps
 * Here it is saved as indiaMap.json
 */

function IndiaMap({ setTooltipContent }) {
  const mapData = useSelector((state) => state.menu);
  const [max, setmax] = useState(0); // max value of the data
  const [min, setmin] = useState(0); // min value of the data
  const [isLoading, setLoading] = useState(mapData.status); // loading, success, error
  const sortedMapDataArray = useMemo(() => { // useMemo hook to avoid unnecessary re-rendering
    const sortedArray = mapData.data.map((d) => d.value).sort((a, b) => a - b);

    const sortedCleanArray = sortedArray.filter((item) => item !== "NA");
    const minValue = d3.min(sortedCleanArray);
    setmax(minValue);
    const maxValue = d3.max(sortedCleanArray);
    setmin(maxValue);

    const normalizedArray = sortedCleanArray.map(
      (d) => ((d - minValue) / (maxValue - minValue)) * 100
    );
    return normalizedArray;
  }, [mapData.data]);

  const colorRange =
    mapData.datatype === "Higher_Better"
      ? ["green", "yellow", "red"]
      : ["red", "yellow", "green"];
  const PROJECTION_CONFIG = {
    scale: 500,
    center: [77.9629, 20.5937], // always in [East Latitude, North Longitude]
  };
  const DEFAULT_COLOR = "#000000";

  // all state's style
  const geographyStyle = { 
    default: {
      outline: "none",
    },
    hover: {
      fill: "#ccc",
      transition: "all 250ms",
      outline: "none",
    },
    pressed: {
      outline: "none",
    },
  };

  // color scale for each state
  const colorScale = d3
    .scaleLinear()
    .domain([0, 50, 100])
    .range(colorRange)
    .interpolate(d3.interpolateHcl);
  return (
    <Box w="80%" bg="white" mx="auto" boxShadow="lg" my="20px">
      <Center>
        <Heading as="h4" size="md" mt="10px" mb="10px">
          {mapData.title}
        </Heading>
      </Center>
      {isLoading === "loading" ? (
        <PacmanLoader color="#36d7b7" />
      ) : (
        <>
          <ComposableMap
            projectionConfig={PROJECTION_CONFIG}
            projection="geoMercator"
            width={600}
            height={300}
            data-tip=""
          >
            <ZoomableGroup zoom={1}>
              <Geographies geography={INDIA_TOPO_JSON}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const current = mapData.data.find((s) => s.id === geo.id);
                    const currentValue = current ? current.value : "NA";
                    const normalValue =
                      currentValue === "NA"
                        ? 0
                        : ((currentValue - min) / (max - min)) * 100;
                    return (
                      <Geography
                        id={geo.properties.name}
                        key={geo.rsmKey}
                        geography={geo}
                        stroke="#000"
                        style={geographyStyle}
                        fill={
                          currentValue !== "NA"
                            ? colorScale(normalValue)
                            : DEFAULT_COLOR
                        }
                        onMouseEnter={() => {
                          setTooltipContent(
                            `${geo.properties.name} : ${currentValue}`
                          );
                        }}
                        onMouseLeave={() => {
                          setTooltipContent("");
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
          <LinearGradient />
          <div>
            <h4
              style={{
                padding: "10px",
                fontWeight: "bold",
              }}
            >
              @Source: {mapData.source}
            </h4>
          </div>
          <a
            href="https://www.flaticon.com/free-icons/india"
            title="india icons"
          >
            India icons created by Freepik - Flaticon
          </a>
          
        </>
      )}
    </Box>
  );
}

export default memo(IndiaMap);
