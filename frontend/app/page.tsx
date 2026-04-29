"use client"
import { useRouter } from "next/navigation";
import Navbar from "./components/navbar";
export default function Home(){
  
  const router = useRouter()
  function redirectToAIScenario(){
    router.push('/scenario');
  }
  function redirectToAIGrading(){
    router.push('/grading');
  }
  return(
    
    <div className = ''>
      <Navbar />
      {/* <div className = 'flex flex-col py-10 px-5 gap-9 bg-white'> 
        <h1 className = 'bg-blue-400 px-3 py-2 w-60 rounded-lg'>Bridging AI And Psychology  </h1>
      <p> A sophisticated academic environment designed for faculty 
        to deploy complex psychological scenarios and 
        receive instant, AI-driven qualitative feedback.  </p>
      </div> */}
      <div className = 'p-5 flex flex-row gap-5'>
        <div className = 'p-5 flex flex-col  sm:gap-y-10 md:gap-y-10 bg-white border-gray-400 border rounded-sm sm:h-80 md:h-120 w-150'> 
          <span className="material-symbols-outlined text-black text-5xl!">psychology</span>
          <h2> AI Scenario Response </h2>
          <p className = 'text-secondary'>
          Evaluate the accuracy of AI responses. Test how large language model respond to set scenarios.
          </p>
          <button 
          className='bg-primary text-white px-5 py-3 font-bold transition-all duration-200 hover:scale-[1.04] active:scale-[0.98]'
          onClick={redirectToAIScenario}> Launch Analysis Environment </button>
          </div>
        <div className = 'p-5 flex flex-col  sm:gap-y-10 md:gap-y-10  bg-white border-gray-400 border rounded-sm sm:h-80 md:h-120 w-150'> 
          <span className="material-symbols-outlined text-5xl! ">
          quiz
          </span>
          <h2>AI Grading </h2>
          
          <p className = 'text-secondary'>
            Assess the quality of student responses by using a large language model. Provide the scenario and rubric for accurate results. 
          </p>
          <button
          className='bg-primary text-white px-5 py-3 font-bold transition-all duration-200 hover:scale-[1.04] active:scale-[0.98]'
          onClick={redirectToAIGrading}
        >
          Open Grading Interface
        </button>
          </div>
      </div>
    </div>
  )
}