import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";

import  {deleteList} from '../../actions/list'


const List = (props) => {
  const [list, setList] = useState([]);
  const [isData, setIsData] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(props);
    if (props.data && props.data.total > 0) {
      setList(props.data.lists);
      setIsData(true);
    }else{
      setIsData(false);
    }

  });

  const listDelete = (id) => {
    dispatch(deleteList(id))
  };

  return (
  <div className="row">
      {isData ? list.map((l, i) => (
          <div className="col-sm-6" key={i} >
            <div className="card">
              <div className="card-body" role="alert">
                <h2>{l.title}</h2>
                <br />
                <button className="btn btn-danger text-center" onClick={() => {listDelete(l._id)}}>Eliminar</button>
                <button className="btn btn-warning text-center" onClick={() => {props.updateList(true, l)}}>Editar</button>
                <Link to={`question/${l._id}`} className="btn btn-info">
                  Detalle
                </Link>
                <Link to={`/play/${l._id}`} className="btn btn-success btn-block">
                  Jugar
                </Link>
              </div>
            </div>
          </div>
        )) : <div className="alert alert-danger text-center" role="alert">No hay datos</div>}
  </div>
)};

export default List;
