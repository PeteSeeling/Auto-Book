//file that contains the body of the app. This file will contain all of the components that will be rendered to the DOM. The App component will be rendered to the DOM in the index.js file.

//write a main component that will be used in the App component to display the main content of the page. The main component should be a div with a class of 'main'. The main component should render the book creation components
import { ChapterSubmit } from "../components/ChapterSubmit";


export default function Main() {

    
  return <div className="main">Main
  <ChapterSubmit />
    </div>
  ;
}