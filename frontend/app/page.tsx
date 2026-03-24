import Image from "next/image";
import axios from "axios";
export default function Home() {

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
  }
  async function handleDrop() {

  }
  return (
    <div className="p-10 pl-50 pr-50">
      <header className="pb-10">
        <h1>AI Respondent</h1>
        <p>Define your evaluation context by providing the scenario and corresponding rubric.</p>
        <p>Choose between direct input or source file upload for each component.</p>
      </header>
      <form className='flex flex-col gap-5' action="/submit" method="post">
        <label htmlFor="scenario">Scenario:</label>
        <div className='flex flex-row justify-between'>
          <textarea id="scenario" name="scenario" placeholder="Enter scenario" className="resize-none border-white bg-white rounded-md p-2 w-2/3 h-70" />
          <label className='border-dashed border-2 p-3 text-center'> Drop files here, or click to upload
            <input type="file" id="scenarioFile" name="scenarioFile" placeholder="Upload file" className="hidden p-3 text-center" />
          </label>
        </div>

        <label htmlFor="rubric">Rubric:</label>
        <div className='flex flex-row justify-between'>
          <textarea id="rubric" name="rubric" placeholder="Enter rubric" className=" resize-none border-white bg-white rounded-md p-2" />
          <input type="file" id="rubricFile" name="rubricFile" className="border-dashed border-2 p-3 text-center" />
        </div>
        <button type="submit" className='rounded-full border-indigo-600 bg-indigo-600 text-white p-2 w-50'>Generate Assessment</button>
      </form>

    </div>
  );
}
