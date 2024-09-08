import { usePlaxStore, type PlaxState } from '@/lib/dataStore';
import { RangeData } from './RangeData';
import { useCallback, useEffect, useState } from 'react';
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MeasureToggle } from './MeasureToggle';
import { useOptionsStore } from '@/lib/optionsStore';

interface CardProps {
  elementKey: keyof PlaxState;
  data: DataType;
  bsa: number | undefined;
  typeClass: string
  measure: string
}
interface BsavaluesType {
  male: {
    normalRange: {
      lowerValue: number;
      higherValue: number;
    };
  };
  female: {
    normalRange: {
      lowerValue: number;
      higherValue: number;
    };
  };
}
export interface DataType {
  measure?: string
  isCalculated?: boolean
  bsa?: boolean;
  bsavalues?: BsavaluesType;
  [key: string]: any;
}

export const Card: React.FC<CardProps> = ({ measure, elementKey, data, bsa, typeClass }) => {
  const { updateParam, LVEDV, LVESV } = usePlaxStore(state => ({
    updateParam: state.updateParam,
    LVEDV: state.LVEDV,
    LVESV: state.LVESV,
    LVEF: state.LVEF
  }));
  const [localMeasure, setLocalMeasure] = useState(measure);
  let currentValue = usePlaxStore(state => state[elementKey].value);

  useEffect(() => {
    if (localMeasure !== measure) {
      updateRanges(data, measure);
    }
  }, [measure]);


  const handleChange = (param: keyof PlaxState, value: number, unit?: string) => {

    let medida = unit ? unit : localMeasure
    updateParam(param, { unit: medida, value: value });
    console.log(param, { unit: medida, value: value });

    const updatedLVEDV = param === 'LVEDV' ? value : LVEDV.value;
    const updatedLVESV = param === 'LVESV' ? value : LVESV.value;

    if (updatedLVEDV && updatedLVESV) {
      const newLVEF = calculateValue(true, 'LVEF', updatedLVEDV, updatedLVESV);
      updateParam('LVEF', { unit: medida, value: newLVEF });
    }
  }

  const updateRanges = useCallback((data: DataType, newMeasure: string) => {
    if (localMeasure !== newMeasure) {
      const factor = (newMeasure === 'mm') || (newMeasure === 'ml') ? 10 : 1 / 10;

      setLocalMeasure(newMeasure)
      handleChange(elementKey, currentValue! * factor, newMeasure);

      if (data) {
        data.male.normalRange.lowerValue *= factor;
        data.male.normalRange.higherValue *= factor;
        data.female.normalRange.lowerValue *= factor;
        data.female.normalRange.higherValue *= factor;
        if (data.bsavalues) {
          data.bsavalues.male.normalRange.lowerValue *= factor;
          data.bsavalues.male.normalRange.higherValue *= factor;
          data.bsavalues.female.normalRange.lowerValue *= factor;
          data.bsavalues.female.normalRange.higherValue *= factor;
        }
      }

    }
  }, [localMeasure, handleChange, elementKey]);

  const calculateValue = useCallback((isCalculated: boolean | undefined, valueToCalculate: string, LVEDV: number, LVESV: number) => {
    if (isCalculated) {
      if ((valueToCalculate === "LVEF") && (LVEDV && LVESV)) {
        return ((LVEDV - LVESV) / LVEDV) * 100;
      }
    } else return currentValue
  }, [LVEDV, LVESV, currentValue]);

  return (
    <div key={elementKey} className="element">
      <label htmlFor={elementKey} className="block text-sm font-medium">
        {elementKey} ({localMeasure})
      </label>
      <input
        type="number"
        value={currentValue}
        onChange={(e) => handleChange(elementKey, parseFloat(e.target.value))}
        id={elementKey}
        className="mt-1 block p-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
      />

      <MeasureToggle data={data} dataMeasure={data.measure!} updateRanges={updateRanges}>
        <RangeData
          medida={localMeasure}
          data={calculateValue(data.isCalculated, elementKey, LVEDV.value!, LVESV.value!)}
          lowerValueMan={data.male?.normalRange?.lowerValue}
          higherValueMan={data.male?.normalRange?.higherValue}
          lowerValueWoman={data.female?.normalRange?.lowerValue}
          higherValueWoman={data.female?.normalRange?.higherValue}
        />
      </MeasureToggle>

      {data.bsa && 'bsavalues' in data && (
        <RangeData
          medida={`${localMeasure}/m²`}
          data={parseFloat(currentValue ? (currentValue / bsa!).toFixed(2) : '')}
          lowerValueMan={data.bsavalues!.male.normalRange.lowerValue}
          higherValueMan={data.bsavalues!.male.normalRange.higherValue}
          lowerValueWoman={data.bsavalues!.female.normalRange.lowerValue}
          higherValueWoman={data.bsavalues!.female.normalRange.higherValue}
        />
      )}

    </div>
  );
};
