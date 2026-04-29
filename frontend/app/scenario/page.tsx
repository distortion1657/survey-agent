'use client'
import { useState } from "react";
import { API } from "@/lib/api";
import { useRouter } from "next/navigation";
import Navbar from "../components/navbar";

export default function Scenario() {
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const [scenario, setScenario] = useState<string>('');
  const [rubric, setRubric] = useState<string>('');

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    const response = await API.post('/api/generate-ai-response', {
      rubric: rubric,
      scenario: scenario,
    })
    router.push('/survey_response')
  }
  // Handle file selection for both scenario and rubric. The function strucutre might seem confusing but most of it is just specifying the types.
  function handleSelect(
    setter: (value: string) => void
  ) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setter('') // Clear preoccupying value
      const file = e.target.files?.[0]
      const reader = new FileReader()
      reader.onload = (readerEvent) => {
        const text = readerEvent.target?.result
        setter(text as string)
      }
      reader.onerror = () => {
        setError('Error reading file.')
      }
      if (file) {
        reader.readAsText(file)
      } else {
        setError('No file selected. Please provide a file.')
      }
    }
  }

  async function handleFileSelectDrop() {
    const dropZone = document.getElementById('scenarioDropZone')!;
    const fileInput = document.getElementById('scenarioFile')! as HTMLInputElement;
    setScenario(''); // Clear any existing value that might be on the text file
    dropZone.addEventListener('drop', (e) => {
      e.preventDefault()
      const file = e.dataTransfer?.files[0]
      const reader = new FileReader()

      reader.onload = (e) => {
        const text = e.target?.result
        document.getElementById('scenario')!.textContent = text as string
        setScenario(text as string)
      }
      reader.onerror = () => {
        setError('Error reading file.')
      }

      if (file) {
        reader.readAsText(file)
      } else {
        setError('No file selected. Please provide a file.')
      }
    })


  }
  return (
    <div>
            <Navbar />

    <div className="flex flex-col p-10 w-full ">

      <header className="pb-10 w-full">
        <h1 className="font-semibold text-3xl pb-5">Generate New Assessment</h1>
        <p>Define your evaluation context by providing the scenario and corresponding rubric.</p>
        <p>Choose between direct input or source file upload for each component.</p>
      </header>
      {error && <p className="text-red-500">{error}</p>}
      <form className='flex flex-col ' onSubmit={handleSubmit}>
        <label htmlFor="scenario" className="text-lg font-semibold">Scenario</label>
        <p className='pb-7'>Provide the scenario that will be presented to the respondent.</p>
        <div className='flex flex-row gap-10 pb-20'>
          <textarea id="scenario"
            name="scenario"
            content={scenario}
            value={scenario}
            placeholder="Enter scenario "
            onChange={(e) => setScenario(e.target.value)}
            className="resize-none border-white bg-white rounded-md p-2 w-200 h-70"
            required />

          <label
            className="flex flex-col items-center justify-center border-dashed border-2 border-gray-400 rounded-md p-10 "
            id="scenarioDropZone">
            <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#4f39f6" className='pb-2'>
              <path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
            </svg>
            <p>Drop files here, or click to upload</p>
            <input type="file"
              id="scenarioFile"
              name="scenarioFile"
              onChange={handleSelect(setScenario)}
              className="hidden p-3 text-center" />
          </label>
        </div>
        
        <button type="submit"
          className='rounded-full hover:scale-105 transition-transform duration-200  border-indigo-600 bg-indigo-600 shadow-md shadow-indigo-600 text-white pl-4 pr-4 pt-3 pb-3 w-50'>Generate Assessment</button>
      </form>
    </div>
    </div>
  );
}
