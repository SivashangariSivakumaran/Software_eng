import React , {useState, useEffect, useCallback} from "react";
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as routez from '../../shared/routes';

import {getAllAmmunition, updateAmmunition} from "../../api/AmmunitionAPI"
import {replaceItemInArray} from "../../shared/utility";
import Table from "../../components/UI/Table/MaterialTable/Table";
import * as actions from '../../store/actions/index';


const AmmunitionTable = "Ammunation Table";


const tableOptions = {
  pageSize: 10,
  pageSizeOptions: [10, 30, 50]
};

const Ammunation = props => {
  let history = useHistory();
  if (!props.isAuthenticated){
    history.push(routez.SIGNIN);
  } 
  const [ammunition, setAmmunition] = useState([]);
  useEffect(() => {
    getAllAmmunition(props.stationID)
      .then((response) => {
        console.log(response.data);
        if (!response.error) {
          // (response.data).forEach(user => setUsers(user));
          setAmmunition(response.data)
        }
      })
}, [props.stationID]);

  const { addAlert } = props;
  // const [isLoading, setIsLoading] = useState(true);

  const updateAmmunitions = useCallback(
    (newAmmunition,oldAmmunition) => {
      return new Promise((resolve, reject) => {
        updateAmmunition(oldAmmunition.ammoModelID, newAmmunition)
              .then((response) => {
                  if (!response.error) {
                      addAlert({
                          message: "Ammunition Updated Successfully!",
                      });
                      setAmmunition(replaceItemInArray(ammunition, 'ammunitionID', newAmmunition, oldAmmunition.ammoModelID))
                      return resolve();
                  }
                  addAlert({
                    message: "Ammunition Updated Unsuccessfully!",
                  });
                  return reject();
              })
      });
    },
    [addAlert, ammunition]
  );


  const tableColumns = [
    { title: "Ammunition Model ID", field: "ammoModelID", editable: 'never' },
    { title: "count", field: "count", editable: 'never' }, 
    { title: "Name", field: "name", editable: 'never' }, 
    { title: "Remaning", field: "remaining" }, 
    { title: "Description", field: "description", editable: 'never' }, 
    { title: "Allocated Date", field: "allocatedDate", editable: 'never', type:'date' }, 
  ];

  if (false) {
    //return <Spinner />
  } else {
    return <Table
    data={ammunition}
    title={AmmunitionTable}
    columns={tableColumns}
    tableOptions={tableOptions}
    editable={{
      onRowUpdate: (newData, oldData) =>updateAmmunitions(newData, oldData ),
    }}
    />
  }
};

const mapStateToProps = (state) => {
  return {
      error: state.auth.error,
      stationID:state.auth.stationID,
      isAuthenticated: state.auth.token != null,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addAlert: alert => dispatch(actions.addAlert(alert))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Ammunation);

//export default (Ammunation);
