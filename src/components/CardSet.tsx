import { usePlaxStore } from '@/lib/dataStore';
import type { PlaxState } from '@/lib/dataStore';
import { CardTemplate, SectionTemplate } from './SectionTemplate';
import type { Patient } from '@/types/Patient';
import { RangeData } from './RangeData';
import { useMemo, useState } from 'react';
import { Card } from './CardElement';
import { usePersonStore } from '@/lib/personStore';
import { MeasureToggle } from './MeasureToggle';
import { useOptionsStore } from '@/lib/optionsStore';
import { Button } from './ui/button';

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
interface DataType {
  bsa?: boolean;
  bsavalues?: BsavaluesType;
  [key: string]: any;
}
interface PlaxProps {
  data: { [key: string]: DataType };
  typeClass: string
  measure: string
}

export function CardSet ({ data, typeClass, measure }: PlaxProps) {
  const gender = usePersonStore((state) => state.gender);
  const bsa = usePersonStore((state) => state.bsa);


  const Cards = useMemo(() => {
    return (
      <div>
        {
          (Object.keys(data) as (keyof PlaxState)[]).map((elementKey) => (
            <Card
              key={elementKey}
              elementKey={elementKey}
              data={data[elementKey]}
              bsa={bsa}
              typeClass={typeClass}
              measure={data[elementKey].measure ? data[elementKey].measure : measure}
            />
          ))
        }
      </div>
    );
  }, [data, bsa, measure]);

  return (
    <>{Cards}</>
  )
}
