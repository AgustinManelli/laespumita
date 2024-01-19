import { ColorType, createChart } from "lightweight-charts";
import { useEffect, useRef } from "react";

function ChartComponent({ chartList }) {
  const chartContainerRef = useRef();

  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.solid, color: "rgb(236, 239, 242)" },
      },
      rightPriceScale: {
        visible: false,
        borderVisible: false,
        autoScale: true,
      },
      OverlayPriceScaleOptions: {},
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
        barSpacing: 10,
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
    });

    newSeries.setData(chartList);
    return () => [chart.remove()];
  }, [chartList]);

  return (
    <div
      ref={chartContainerRef}
      style={{
        marginTop: "10px",
        width: "100px",
        height: "24px",
        right: "-120px",
        backgroundColor: "rgb(236, 239, 242)",
        padding: "5px",
        borderRadius: "10px",
      }}
    ></div>
  );
}

export default ChartComponent;
