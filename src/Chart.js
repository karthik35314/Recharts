import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
} from "recharts";

const renderCustomizedLabel = (props) => {
  const { x, y, width, value } = props;
  const radius = 10;

  return (
    <g>
      <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#8884d8" />
      <text
        x={x + width / 2}
        y={y - radius}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {value.split(" ")[1]}
      </text>
    </g>
  );
};

const Chart = () => {
  const [Users, setUsers] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const users = await axios.get("https://api.github.com/users");
    setUsers(users.data);
    users.data.map(async (user) => {
      const follow = await fetchFollowers(user);
      setFollowers((followers) => [...followers, follow]);
      setData((data) => [
        ...data,
        { name: follow.login, GitFollowers: follow.followers },
      ]);
    });
  };

  const fetchFollowers = async (user) => {
    const follow = await axios.get(user.url);
    return follow.data;
  };
  console.log(followers);

  return (
    <div className="chartbar">
      <BarChart
        width={900}
        height={400}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" fill="rgba(255, 255, 255, 0.3)" />
        <XAxis dataKey="name" />
        <YAxis tickCount={10} tick={[0, 2, 4, 6, 8, 10]} />
        <Tooltip />
        <Legend />
        <Bar dataKey="GitFollowers" fill="#8884d8" minPointSize={5} />
        <LabelList dataKey="name" content={renderCustomizedLabel} />
      </BarChart>
    </div>
  );
};

export default Chart;
