import "./App.css";
import NavBar from "./components/Nav/Navbar";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import About from "./components/About/About";
import MyTeam from "./components/Team/MyTeam";
import Rentbuy from "./components/RentBuy/Rentbuy";
import Contact from "./components/Contact/Contact";
import ListProperties from "./components/Listproperty/ListProperties";
import Signup from "./components/Signup/Signup";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotFoundPage from "./components/404/NotFoundPage";
import { AuthProvider } from "./context/AuthContext";
import DashBoard from "./Dashboard/Routes/Home/Home";
import List from "./Dashboard/List/List";
import Users from "./Dashboard/Users/Users";
import PrivateRoute from "./Dashboard/PrivateRoute";
import ForgotPassword from "./Dashboard/Routes/ForgotPassword/ForgotPassword";
import Profile from "./Dashboard/Routes/Profile/Profile";
import ViewProfile from "./Dashboard/Routes/Profile/ViewProfile";
import EditProfile from "./Dashboard/Routes/Profile/EditProfile";
import PropertyRequest from "./Dashboard/PropertyRequests/PropertyRequest";
import PropertyDetails from "./Dashboard/PropertyRequests/PropertyDetails";
import RentBuyDetails from "./components/RentBuy/RentBuyDetails";
import Updateemail from "./Dashboard/Routes/ForgotPassword/Updateemail";
import ListVacancy from "./Dashboard/Vacancies/ListVacancy";
import VacancyList from "./Dashboard/Vacancies/VacancyList";
import EdditList from "./Dashboard/List/EdditList";
import EdditVacancy from "./Dashboard/Vacancies/EdditVacancy";
function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <NavBar />
          <Switch>
            <Route path="/MyTeam" component={MyTeam} />
            <Route path="/" exact component={Home} />
            <Route path="/About" component={About} />
            <Route path="/Rentbuy" exact component={Rentbuy} />
            <Route path="/Rentbuy/:id" component={RentBuyDetails} />
            <Route path="/Contact" component={Contact} />
            <PrivateRoute path="/Updateemail" component={Updateemail} />
            {/* for bac end only */}
            <Route path="/login" component={ListProperties} />
            <Route path="/Signup" component={Signup} />

            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/editprofile" component={EditProfile} />
            <PrivateRoute path="/list" exact component={List} />
            <PrivateRoute path="/propertyrequest" component={PropertyRequest} />
            <PrivateRoute
              path="/propertydetails/:id"
              component={PropertyDetails}
            />
            <PrivateRoute path="/listvacancy" component={ListVacancy} />
            <PrivateRoute path="/vacancylist" exact component={VacancyList} />
            <PrivateRoute path="/vacancylist/:id" component={EdditVacancy} />
            <Route path="/ForgotPassword" component={ForgotPassword} />
            <PrivateRoute path="/Home" component={DashBoard} />
            <PrivateRoute path="/list/:id" component={EdditList} />
            {/* admin routes  EdditList*/}
            <PrivateRoute path="/users" component={Users} />
            <PrivateRoute path="/user/:userId" component={ViewProfile} />
            <Route component={NotFoundPage} />
            {/* admin sections */}
          </Switch>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
