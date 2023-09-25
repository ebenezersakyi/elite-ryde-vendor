import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function generateRandomColors() {
  // Generate random values for red, green, and blue
  var red = Math.floor(Math.random() * 256);
  var green = Math.floor(Math.random() * 256);
  var blue = Math.floor(Math.random() * 256);

  // Create the RGBA color strings with different alpha values
  var color1 = `rgba(${red}, ${green}, ${blue}, 1)`;
  var color2 = `rgba(${red}, ${green}, ${blue}, 0.2)`;

  // Return the array of generated colors
  return [color1, color2];
}

const useData = () => {
  const {user} = useAuth0()
  const [loading, setLoading] = useState(false)
  const [d, setD] = useState()
  async function fetchData(){
    let data_arr = []
    let labels_arr = []
    let border = []
    let mainColor = []
    try {
      setLoading(true)
      const response = await axios({
        url: `https://elite-ryde-management-api.azurewebsites.net/api/get-financial-details?id=${user.sub.slice(
          6
        )}`,
        method: "get",
      });

      if(response?.data?.status){
          response?.data?.data?.forEach((elem)=>{
            const color = generateRandomColors()
            data_arr.push(elem?.amount)
            labels_arr.push(elem?.car)
            border.push(color[0])
            mainColor.push(color[1])
          })

          
      }
    } catch (error) {
      console.log(error);
    }
    finally{
      setLoading(false)
      setD({
        data_arr, 
        border,
        labels_arr ,
        mainColor
      })
    }
  }

  useEffect(() => fetchData(), [])
  return [loading, d]
}

export default useData



export const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: 'GHS',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

