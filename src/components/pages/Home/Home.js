import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import classes from "./Home.module.css";
import { Progress } from 'antd';
const Home = () => {
  const { isAuth } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) {
      navigate("/signin");
    }
  }, [isAuth]);
  return (
    <div className={classes.main}>
      <div className={classes.cards}>
        <div className={classes.card}>
          <div className={classes.card_content}>
            <div className={classes.number}>1217</div>
            <div className={classes.card_name}> Posts</div>
          </div>
          <div className={classes.icon_box}>
            <i className="fas fa-th-large"></i>
          </div>
        </div>
        <div className={classes.card}>
          <div className={classes.card_content}>
            <div className={classes.number}>42</div>
            <div className={classes.card_name}>Tags</div>
          </div>
          <div className={classes.icon_box}>
            <i className="fa-solid fa-tags"></i>
          </div>
        </div>
        <div className={classes.card}>
          <div className={classes.card_content}>
            <div className={classes.number}>56k</div>
            <div className={classes.card_name}>Users</div>
          </div>
          <div className={classes.icon_box}>
            <i className="fa-solid fa-users"></i>
          </div>
        </div>
        <div className={classes.card}>
          <div className={classes.card_content}>
            <div className={classes.number}>4500</div>
            <div className={classes.card_name}>Files</div>
          </div>
          <div className={classes.icon_box}>
            <i className="fa-solid fa-folder-open"></i>
          </div>
        </div>
      </div>
      <div className={classes.charts}>
        <div className={classes.chart}>
          <h2>Statistics</h2>
       
          <Progress
      strokeColor={{
        '0%': '#108ee9',
        '100%': '#87d068',
      }}
      percent={99.9}
    />
    <Progress
      strokeColor={{
        from: '#108ee9',
        to: '#87d068',
      }}
      percent={99.9}
      status="active"
    />
    <Progress
      type="circle"
      strokeColor={{
        '0%': '#108ee9',
        '100%': '#87d068',
      }}
      percent={90}
    />
    <Progress
      type="circle"
      strokeColor={{
        '0%': '#108ee9',
        '100%': '#87d068',
      }}
      percent={100}
    />



         
        </div>
    
        <div className={classes.chart}>
          <h2>Authors</h2>
          <Progress strokeLinecap="square" percent={75} />
      

          
          <Progress type="circle" percent={90} />
          <br />
    <Progress percent={30} steps={5} />
    <br />
    <Progress percent={100} steps={5} size="small" strokeColor="#52c41a" />


     
        </div>
      </div>
    </div>
  );
};
export default Home;
