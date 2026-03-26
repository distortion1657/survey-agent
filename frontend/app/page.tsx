'use client'
import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { API } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function Home() {
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
    router.push('/response')
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
    <div className="p-10 pl-20 pr-20">
      <header className="pb-10">
        <h1>AI Respondent</h1>
        <p>Define your evaluation context by providing the scenario and corresponding rubric.</p>
        <p>Choose between direct input or source file upload for each component.</p>
      </header>
      {error && <p className="text-red-500">{error}</p>}
      <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
        <label htmlFor="scenario" className="text-lg font-semibold">Scenario</label>
        <p>Provide the scenario that will be presented to the respondent.</p>
        <div className='flex flex-row gap-10'>
          <textarea id="scenario"
            name="scenario"
            content={scenario}
            value={scenario}
            placeholder="Enter scenario "
            onChange={(e) => setScenario(e.target.value)}
            className="resize-none border-white bg-white rounded-md p-2 w-200 h-70" />

          <label
            className="border-dashed border-2 border-gray-400 rounded-md p-10 text-center"
            id="scenarioDropZone">
            <p>Drop files here, or click to upload</p>
            <input type="file"
              id="scenarioFile"
              name="scenarioFile"
              onChange={handleSelect(setScenario)}
              className="hidden p-3 text-center" />
          </label>
        </div>
        {/* Section for rubric */}
        <label htmlFor="rubric" className="text-lg font-semibold">Rubric</label>
        <p>Define the evaluation criteria and scoring guidelines for the scenario.</p>
        <div className='flex flex-row gap-10'>
          <textarea id="rubric"
            name="rubric"
            value={rubric}
            placeholder="Enter rubric"
            onChange={(e) => setRubric(e.target.value)}
            className=" resize-none border-white bg-white rounded-md p-2 w-200 h-70" />

          <label
            className="border-dashed border-2 border-gray-400 rounded-md p-10 text-center"
            id="rubricDropZone">
            <p>Drop files here, or click to upload</p>
            <input type="file"
              id="rubricFile"
              name="scenarioFile"
              onChange={handleSelect(setRubric)}
              className="hidden p-3 text-center" />
          </label>        </div>
        <button type="submit"
          className='rounded-full border-indigo-600 bg-indigo-600 text-white p-2 w-50'>Generate Assessment</button>
      </form>

    </div>
  );
}
