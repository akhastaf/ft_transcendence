import Header from "./Header";
import LowerHero from "./lowerHero";
import Hero from "./Hero";

const Welcome : React.FC <{

}> = ({}) => {
    return (<>
    <div className="h-full w-full">
        <Header/>
        <Hero/>
        <LowerHero/>

    </div>
    
    </>)
}


export default Welcome;