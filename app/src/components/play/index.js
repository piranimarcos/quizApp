import { set } from "mongoose";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { getList } from "../../actions/list";

import QuestionTest from './questionTest'

const PlayComponent = () => { 

  const { list } = useSelector((state) => state.list);

  const { id } = useParams();
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getList())
  }, []);

  return (
    <div className="row">
      <QuestionTest data={list} id={id}/>
    </div>
  );
};

export default PlayComponent;
