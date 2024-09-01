import AddProperty from "../pages/AddProperty/AddProperty";
import AddTest from "../pages/AddTests/AddTest";
import ListTests from "../pages/ListTests/ListTests";
import TakeTest from "../pages/TakeTest/TakeTest";
import TestResults from "../pages/TestResults/TestResults";
import AllResults from "../pages/TestResults/AllResults";
import AllCourses from "../pages/Courses/AllCourses";
import CourseDetails from "../pages/Courses/CourseDetails";
import CourseView from "../pages/Courses/CourseView";
import ViewAllCourses from "../pages/Courses/ViewAllCourses";
import SignIn from "../pages/Authentication/SignIn";
import Calendar from "../pages/Calendar";
import FormElements from "../pages/Form/FormElements";
import FormLayout from "../pages/Form/FormLayout";
import QuerryTable from "../pages/Form/QuerryTable";
import MyTable from "../pages/Form/tableDetails";
import Settings from "../pages/Settings";
import Tables from "../pages/Tables";
import Buttons from "../pages/UiElements/Buttons";
import ScheduleWebinar from '../pages/ScheduleWebinar/ScheduleWebinar';

const routespath=[
    {
        path:"/",
        component:<SignIn/>,
        restricted:false

    },
    // {
    //     path:"/dashboard",
    //     component:<AddProperty/>,
    //     restricted:true

    // },

    {
        path:"/dashboard",
        component:<AddTest/>,
        restricted:true

    },

    {
        path:"/test-results/:testId",
        component:<TestResults/>,
        restricted:true

    },

    {
        path:"/courses",
        component:<AllCourses/>,
        restricted:true

    },

    {
        path:"/courses/:courseId",
        component:<CourseDetails/>,
        restricted:true

    },

    {
        path:"/view-courses",
        component:<ViewAllCourses/>,
        restricted:true

    },

    {
        path:"/view-courses/:courseId",
        component:<CourseView/>,
        restricted:true

    },

    {
        path:"/all-results",
        component:<AllResults/>,
        restricted:true

    },


    {
        path:"/all-tests",
        component:<ListTests/>,
        restricted:true

    },

    {
        path:"/take-test/:testId",
        component:<TakeTest/>,
        restricted:true

    },

    {
        path:"/schedule-webinar",
        component:<ScheduleWebinar/>,
        restricted:true

    },

    {
        path:"/propertys",
        component:<MyTable/>,
        restricted:true

    },
    {
        path:"/querys",
        component:<QuerryTable/>,
        restricted:true

    },
    // {
    //     path:"*",
    //     component:<Error/>,
    //     restricted:false

    // },
    {
        path:"/settings",
        component:<Buttons/>,
        restricted:true

    },
    // {
    //     path:"blog/:id",
    //     component:<Blogs/>,
    //     restricted:true

    // },

]
export default routespath;