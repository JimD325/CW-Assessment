import './Home.css'

export function Home (props) {
  return (
    <>
    <div id ="BodyContainer">
      <p> This is the place for all things Star Wars, where you can access all the information you could ever want on the people, places, and things of the Star Wars Universe. Simply select what information you are looking for, and look through the data yourself! Click on the name of the person, place, or thing for more information, or go to settings to organize the data in the way that makes most sense to you! Please keep in mind that the Star Wars universe is a big place with many unknowns, and some of the information you are looking for might not be here. If this is the case, you can filter out items which do not have the information you are looking for. Enjoy!</p>
   <button id="GetButton" onClick ={()=> props.handleSetParams('people','all')}>Characters</button>
   <button id="GetButton" onClick ={()=> props.handleSetParams('planets','all')}>Planets</button>
   <button id="GetButton" onClick ={()=> props.handleSetParams('films','page', 1)}>Films</button>
   </div>
    </>
  
  )
 }