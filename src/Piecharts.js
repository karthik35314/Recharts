import axios from "axios";
import React, { useCallback, useState,useEffect} from "react";
import { PieChart, Pie, Sector } from "recharts";
import "./App.css";


const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`GitFollowers ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};




export default function Piecharts() {
  const [activeIndex, setActiveIndex] = useState(0);
  const[Users,setUsers]=useState(null);
  const[followers,setFollowers]=useState([]);
  const[data,setData]=useState([]);
  
  
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );


  // useEffect(() => {
  //   axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
  //     setUsers(response.data);
    
     

  //     console.log(Users);
  //   });
  // }, []); 
  useEffect(()=>{
      fetchUsers()
    },[])


  const fetchUsers = async() => {
    const users = await axios.get("https://api.github.com/users");
    setUsers(users.data);
    users.data.map(async (user) => {
      const follow = await fetchFollowers(user)
    setFollowers((followers)=>[...followers, follow]);
    setData((data) => [...data, {name:follow.login, value: follow.followers}])
  
    })
   
  }

  const fetchFollowers = async (user) => {
      const follow =  await axios.get(user.url);
      return follow.data
    }
    console.log(followers)
  

  return (
    <div className="chartpie">
      
    <PieChart width={800} height={400} className="chart">
  
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={data}
        cx={200}
        cy={200}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
        onMouseEnter={onPieEnter}
        
      />
    </PieChart>
    </div>
  );
}
