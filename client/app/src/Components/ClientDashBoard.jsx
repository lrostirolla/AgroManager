import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {  useSelector } from "react-redux";
import { crops, states } from '../globals';

ChartJS.register(ArcElement, Tooltip, Legend);

function getTotalAreaByState(clients, tag){
  return clients.reduce((acc, farm) => {
    if (!acc[farm[tag]]) {
      acc[farm[tag]] = 0;
    }
    acc[farm[tag]] += farm.total_area;
    return acc;
  }, {});
}



function getTotalArea(totalAreaByState){
  return Object.values(totalAreaByState).reduce((sum, area) => sum + area, 0);
}

function getPercentageByState(totalAreaByState, totalArea){
  return Object.keys(totalAreaByState).map(state => ({
    state,
    percentage: ((totalAreaByState[state] / totalArea) * 100).toFixed(2)
  }));
}

function getPercentageByCrops(totalAreaByCrops, totalArea){
  return Object.keys(totalAreaByCrops).map(crop => ({
    crop,
    percentage: ((totalAreaByCrops[crop] / totalArea) * 100).toFixed(2)
  }));
}


function getDataByState(percentageByState){
  let data = [];

  function getStateNameById(id) {
    const state = states.find(state => state.id === id);
    return state ? state.name : null;
  }

  for(let d of percentageByState){
    data = [...data, {label : getStateNameById(Number(d.state)),value : Number(d.percentage)}]
  }
  return data;

}

function getDataByCrops(percentageByCrops){
  let data = [];

  function getStateNameById(id) {
    const _crops  = crops.find(crop => crop.id === id);
    return _crops ? _crops.name : null;
  }

  for(let d of percentageByCrops){
    data = [...data, {label : getStateNameById(d.crop),value : Number(d.percentage)}]
  }
  return data;

}


function getDataByArea(clients){
  let data = clients.reduce((acc, farm) => {
    if (!acc["x"]) {
      acc["x"] = 0;
    }
    if (!acc["y"]) {
      acc["y"] = 0;
    }    

    acc["x"] += farm.useful_area;
    acc["y"] += farm.vegetation_area;
    return acc;
  }, {});
  let total = data.x + data.y;

  return [
    {label : "Área Usada" , value : data.x/total},
    {label : "Área Preservada", value : data.y/total}
  ]
}

const PieChart = ({ data }) => {
  
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const chartData = {
    labels: data.map(item => item.label),
    datasets: [
      {
        data: data.map(item => ((item.value / total) * 100).toFixed(2)),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ]
      }
    ]
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'right'
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.raw}%`;
          }
        }
      }
    }
  };

  return <Doughnut data={chartData} options={options} />;
};

export function ClientDashBoard(){

  const clients           = useSelector((state) => state.clientes.clientes);
  const totalAreaByState  = getTotalAreaByState(clients, "state");
  const totalArea         = getTotalArea(totalAreaByState);
  const percentageByState = getPercentageByState(totalAreaByState, totalArea);
  const dataByState       = getDataByState(percentageByState);
  const totalAreaByCrops = getTotalAreaByState(clients, "crops");
  const percentageByCrops = getPercentageByCrops(totalAreaByCrops, totalArea);
  const dataByCrops       = getDataByCrops(percentageByCrops);

  let dataByUsefulSoil;  
  if(clients.length > 0){
    dataByUsefulSoil  = getDataByArea(clients);
  } else {
    dataByUsefulSoil = [];
  }
  return <>
    <div className = "row">
      <div className = "col-6">
        <h5>Total de Fazendas (Número de fazendas): {clients.length}</h5>
        <h5>Total de fazendas (Área Total em Hectáres) : {totalArea}</h5>
      </div>
    </div>
    <hr/>
    <div className = "row">
      <div className='col-4'>
        <h6>Percentual de área por estado</h6>
        <PieChart data={dataByState} />
      </div>

      <div className='col-4'>
        <h6>Percentual de área por cultura</h6>
        <PieChart data={dataByCrops} />
      </div>
      <div className='col-4'>
        <h6>Razão entre área cultivada e área de vegetação</h6>
        <PieChart data={dataByUsefulSoil} />
      </div>

    </div>
    
  </>

}

