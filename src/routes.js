import { Navigate, Route, Routes as RoutesRRD } from 'react-router-dom';
import RoleBasedComponent from './components/RoleBasedComponent';
import DashBoardComponent from './pages/dashboard/DashBoardComponent';


const Routes = () => {


    return (<RoutesRRD >
        <Route exact path="/" element={<DashBoardComponent></DashBoardComponent>} />
        <Route
            path="*"
            element={<Navigate to="/" replace={true} />}
        />
    </RoutesRRD>);
};


export default Routes;