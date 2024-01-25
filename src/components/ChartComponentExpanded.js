import { ColorType, createChart } from "lightweight-charts";
import { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeProvider";

function ChartComponentExpanded({ chartList }) {
  const chartContainerRef = useRef();
  const { theme } = useTheme();

  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: {
          type: ColorType.solid,
          color: "transparent",
        },
        textColor: theme.secondTitles,
        fontSize: 10,
      },
      rightPriceScale: {
        visible: true,
        borderVisible: true,
        autoScale: true,
        borderColor: "#008fd2",
      },
      crosshair: {
        mode: 1,
        vertLine: {
          visible: false,
          labelBackgroundColor: "#008fd2",
        },
        horzLine: {
          visible: true,
          labelBackgroundColor: "#008fd2",
          style: 4,
        },
      },
      grid: {
        vertLines: {
          visible: false,
        },
        horzLines: {
          visible: false,
        },
      },
      timeScale: {
        visible: true,
        barSpacing: 50,
        borderVisible: true,
        secondsVisible: false,
        timeVisible: true,
        borderColor: "#008fd2",
      },
      handleScroll: true,
      handleScale: false,
      autoSize: true,
    });
    const newSeries = chart.addAreaSeries({
      lineColor: "#008fd2",
      topColor: "#008fd2",
      bottomColor: "rgba(41, 98, 255, 0)",
      priceLineVisible: false,
      lastValueVisible: false,
      crosshairMarkerVisible: true,
      lineWidth: 2,
    });

    newSeries.setData(chartList);
    return () => [chart.remove()];
  }, [chartList]);

  return (
    <div
      ref={chartContainerRef}
      style={{
        width: "calc(100% - 10px)",
        height: "100px",
      }}
    ></div>
  );
}

export default ChartComponentExpanded;
