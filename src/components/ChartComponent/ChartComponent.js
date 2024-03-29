import { ColorType, createChart } from "lightweight-charts";
import { useEffect, useRef } from "react";
import { useTheme } from "../../context/ThemeProvider";

function ChartComponent({ chartList }) {
  const chartContainerRef = useRef();
  const { theme } = useTheme();

  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.solid, color: "transparent" },
      },
      rightPriceScale: {
        visible: false,
        borderVisible: false,
        autoScale: true,
      },
      crosshair: {
        mode: 2,
        vertLine: {
          visible: false,
        },
        horzLine: {
          visible: false,
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
        visible: false,
        //barSpacing: 6.5,
        borderVisible: false,
      },
      handleScroll: false,
      handleScale: false,
      autoSize: true,
      localization: {
        dateFormat: "hh-mm",
        locale: "en-US",
      },
    });
    const newSeries = chart.addAreaSeries({
      lineColor: "#008fd2",
      topColor: "#008fd2",
      bottomColor: "rgba(41, 98, 255, 0)",
      priceLineVisible: false,
      lastValueVisible: false,
      crosshairMarkerVisible: false,
      lineWidth: 2,
      lineType: 2,
    });

    newSeries.setData(chartList);
    chart.timeScale().fitContent();
    return () => [chart.remove()];
  }, [chartList]);

  return (
    <div
      ref={chartContainerRef}
      style={{
        marginTop: "10px",
        width: "122px",
        height: "34px",
        backgroundColor: theme.button,
        padding: "0px",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    ></div>
  );
}

export default ChartComponent;
