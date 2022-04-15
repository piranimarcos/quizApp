import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getList } from "../../actions/list";

import CreateList from "./create";
import List from "./list";

const ListComponent = () => {
  const { list } = useSelector((state) => state.list);
  const { message } = useSelector((state) => state.message);

  const [isUpdateList, setIsUpdateList] = useState(false)
  const [listUpdate, setListUpdate] = useState({})
  

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getList());
  }, []);

  const updateList = (ul, list) => {
    setIsUpdateList(ul)
    setListUpdate(list)
  }


  console.log(message)
  return (
    
    <div>
      <header className="jumbotron">
        {message && message.messageOk && ( <div className="alert alert-success" role="alert"> {message.messageOk} </div> )}
        {message && message.message && ( <div className="alert alert-danger" role="alert"> {message} </div> )}

          

        <CreateList isUpdateList={isUpdateList} listUpdate={listUpdate} updateList={updateList}/>

        <List data={list} updateList={updateList}/>

      </header>
    </div>
  );
};

export default ListComponent;
