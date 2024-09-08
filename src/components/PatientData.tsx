import { HealthyResult } from '@/components/HealthyResult';
import { usePersonStore } from '@/lib/personStore';
import { useEffect, useState } from 'react';
import { Switch } from './ui/switch';

export function PatientData () {
  //const [height, setHeight] = useState<number | undefined>();
  //const [weight, setWeight] = useState<number | undefined>();
  //const [age, setAge] = useState<number | undefined>();
  //const [systole, setSystole] = useState<number | undefined>();
  //const [diastole, setDiastole] = useState<number | undefined>();
  //const [heartRate, setHeartRate] = useState<number | undefined>();

  const height = usePersonStore((state) => state.height)
  const weight = usePersonStore((state) => state.weight)
  const age = usePersonStore((state) => state.age)
  const gender = usePersonStore((state) => state.gender)

  const systole = usePersonStore((state) => state.systole)
  const diastole = usePersonStore((state) => state.diastole)
  const heartRate = usePersonStore((state) => state.heartRate)

  const updateHeight = usePersonStore((state) => state.updateHeight)
  const updateWeight = usePersonStore((state) => state.updateWeight)
  const updateAge = usePersonStore((state) => state.updateAge)
  const updateGender = usePersonStore((state) => state.updateGender)

  const updateSystole = usePersonStore((state) => state.updateSystole)
  const updateDiastole = usePersonStore((state) => state.updateDiastole)
  const updateHeartRate = usePersonStore((state) => state.updateHeartRate)

  const updateBsa = usePersonStore((state) => state.updateBsa)
  const updateBmi = usePersonStore((state) => state.updateBmi)
  const updateMap = usePersonStore((state) => state.updateMap)


  let bsa: number | undefined = undefined
  let bmi: number | undefined = undefined
  let map: number | undefined = undefined

  if (systole && diastole) {
    map = parseFloat(((systole + 2 * diastole) / 3).toFixed(2))
    updateMap(map)
  }

  if (weight && height) {
    bsa = parseFloat((0.007184 * (height ** 0.725) * (weight ** 0.425)).toFixed(2))
    bmi = parseFloat((weight / ((height / 100) ** 2)).toFixed(2))

    updateBsa(bsa)
    updateBmi(bmi)
  }

  function setGender () {
    updateGender('woman')
    if (gender === 'man') {
      updateGender('woman')
    } else if (gender === 'woman') {
      updateGender('man')
    }
  }
  const isGenderChecked = gender === 'man' ? false : true

  const presion_dif = systole && diastole ? systole - diastole : undefined
  return (
    <section className="flex justify-center p-5 items-center">
      <div className="max-w-3xl mx-auto p-6 shadow-md rounded-lg bg-slate-100 dark:bg-slate-900">
        <h1 className="text-2xl font-bold mb-6 text-center">Patient Data Calculator</h1>

        <div className="mb-4">
          <label htmlFor="height" className="block text-sm font-medium">
            Height (cm)
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => updateHeight(parseFloat(e.currentTarget.value))}
            id="height"
            className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="weight" className="block text-sm font-medium ">
            Weight (kg)
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => updateWeight(parseFloat(e.target.value))}
            id="weight"
            className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="age" className="block text-sm font-medium">
            Age (years)
          </label>
          <input
            type="number"
            value={age}
            onChange={(e) => updateAge(parseFloat(e.target.value))}
            id="age"
            className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="gender" className="block text-sm font-medium">
            Gender
          </label>
          <div className='flex items-center justify-center gap-4'>
            <label htmlFor="man">Man</label>
            <Switch onClick={setGender} checked={isGenderChecked} />
            <label htmlFor="man">Woman</label>
          </div>
        </div>

        <div className="mb-4 flex items-center space-x-2">
          <label htmlFor="systole" className="block text-sm font-medium">
            BP:
          </label>
          <input
            type="number"
            value={systole}
            onChange={(e) => updateSystole(parseFloat(e.target.value))}
            id="systole"
            className="w-1/2 p-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          <span className="text-gray-700">/</span>
          <input
            type="number"
            value={diastole}
            onChange={(e) => updateDiastole(parseFloat(e.target.value))}
            id="diastole"
            className="w-1/2 p-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="heartRate" className="block text-sm font-medium">
            Heart Rate (/min)
          </label>
          <input
            type="number"
            value={heartRate}
            onChange={(e) => updateHeartRate(parseFloat(e.target.value))}
            id="heartRate"
            className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div className="mt-6 p-4 border border-gray-200 rounded-md">
          <HealthyResult preRender={'BMI'} postRender={'kg/m²'} result={bmi} lowerValue={18} higherValue={30} />
          <HealthyResult preRender={'BSA'} postRender={'m²'} result={bsa} />
          <HealthyResult preRender={'MAP'} postRender={'mmHg'} result={map} />
          <HealthyResult preRender={'Presión diferencial'} postRender={'mmHg'} result={presion_dif} lowerValue={35} higherValue={50} />
        </div>
      </div>
    </section>
  );
};
