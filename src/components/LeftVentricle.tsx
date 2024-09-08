import React, { useState, useEffect } from 'react';
import { type Patient } from '@/types/Patient';
import type { VentricularDimensions } from '@/types/VentricularDimensions';

const calculateRWT = (PWd: number, LVIDd: number): number => {
  return (2 * PWd) / LVIDd;
};

const calculateLVMass = (IVSd: number, LVIDd: number, PWd: number): number => {
  return 0.8 * 1.04 * ((IVSd + LVIDd + PWd) ** 3 - LVIDd ** 3) + 0.6;
};

export const LeftVentricle: React.FC<{ patientData: Patient }> = ({ patientData }) => {
  const [ventricularData, setVentricularData] = useState<VentricularDimensions>({
    LVIDs: 0,
    LVIDs_m2: 0,
    LVIDd: 0,
    LVIDd_m2: 0,
    IVSd: 0,
    PWd: 0,
    RWT: 0,
    LV_mass: 0,
    LV_mass_m2: 0,
  });


  const handleInputChange = (field: keyof VentricularDimensions, value: number) => {
    setVentricularData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const { bsa } = patientData

  useEffect(() => {
    // Calcular RWT y LV Mass cada vez que se actualicen los valores relevantes
    const { IVSd, LVIDd, PWd } = ventricularData;

    const RWT = calculateRWT(PWd!, LVIDd!);
    const LV_mass = calculateLVMass(IVSd!, LVIDd!, PWd!);
    const LV_mass_m2 = LV_mass / patientData.bsa!; // Ajuste por BSA

    //SOLO HACE FALTA BSA
    setVentricularData((prevData) => ({
      ...prevData,
      RWT,
      LV_mass,
      LV_mass_m2,
    }));
  }, [ventricularData.IVSd, ventricularData.LVIDd, ventricularData.PWd, patientData.bsa]);

  return (
    <section className='grid grid-cols-3'>
      <div className="flex justify-center items-center min-h-screen ">
        <div className="max-w-3xl mx-auto p-6 shadow-md rounded-lg bg-slate-100 dark:bg-slate-900">
          <h1 className="text-2xl font-bold mb-6 text-center">PLAX</h1>
          <div className="mb-4">
            <label htmlFor="LVIDs" className="block text-sm font-medium">
              LVIDs (cm)
            </label>
            <input
              type="number"
              value={ventricularData.LVIDs}
              onChange={(e) => handleInputChange('LVIDs', parseFloat(e.target.value))}
              id="LVIDs"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <label className="block text-sm font-medium">LVIDs (cm/m²): {(ventricularData.LVIDs! / bsa!).toFixed(2)}</label>
          </div>

          <div className="mb-4">
            <label htmlFor="LVIDd" className="block text-sm font-medium">
              LVIDd (cm)
            </label>
            <input
              type="number"
              value={ventricularData.LVIDd}
              onChange={(e) => handleInputChange('LVIDd', parseFloat(e.target.value))}
              id="LVIDd"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <label className="block text-sm font-medium">LVIDd (cm/m²): {ventricularData.LVIDd_m2?.toFixed(2)}</label>
          </div>

          <div className="mb-4">
            <label htmlFor="IVSd" className="block text-sm font-medium">
              IVSd (cm)
            </label>
            <input
              type="number"
              value={ventricularData.IVSd}
              onChange={(e) => handleInputChange('IVSd', parseFloat(e.target.value))}
              id="IVSd"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="PWd" className="block text-sm font-medium">
              PWd (cm)
            </label>
            <input
              type="number"
              value={ventricularData.PWd}
              onChange={(e) => handleInputChange('PWd', parseFloat(e.target.value))}
              id="PWd"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="mt-6 p-4 border border-gray-200 rounded-md">
            <p className="text-lg font-medium">
              <strong>RWT:</strong> {ventricularData.RWT ? ventricularData.RWT?.toFixed(2) : ''}
            </p>
            <p className="text-lg font-medium">
              <strong>LV Mass:</strong> {ventricularData.LV_mass ? ventricularData.LV_mass?.toFixed(2) : ''} g
            </p>
            <p className="text-lg font-medium">
              <strong>LV Mass (g/m²):</strong> {ventricularData.LV_mass_m2 ? ventricularData.LV_mass_m2?.toFixed(2) : ''} g/m²
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};


