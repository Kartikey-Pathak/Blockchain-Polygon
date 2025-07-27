import { useEffect, useState } from 'react';
import Chart from 'react-google-charts';
function Chartdisplay({ chartdata }) {

    const [data, setdata] = useState([["Date", "Prices"]])

    useEffect(() => {
        let datacopy = [["Date", "Prices"]];
        if (chartdata.prices) {
            chartdata.prices.map((e) => {
                datacopy.push([`${new Date(e[0]).toLocaleDateString().slice(0, -5)}`, e[1]])
            })
            setdata(datacopy);
        }
    }, [chartdata])

    const options = {
    title: 'Price History (Last 10 Days)',
     curveType: 'function', // smooth curves
      backgroundColor: 'transparent',
        hAxis: {
      title: 'Date',
      textStyle: { color: '#000000' },
      titleTextStyle: { color: '#000000', fontSize: 14 },
      gridlines: { color: 'transparent' },
    },
    vAxis: {
      title: 'Price ₹',
      textStyle: { color: '#000000' },
      titleTextStyle: { color: '#000000', fontSize: 14 },
      gridlines: { color: '#333333' },
      baselineColor: '#666666',
    },
      };

    return (
        <Chart
         
           options={options}
           chartType='LineChart'
           data={data}
           height="100%"
           width="100%"
        />
    )
}
export default Chartdisplay;