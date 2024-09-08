import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs"
import { type Patient } from "@/types/Patient"
import { PatientData } from "./PatientData"
import { usePersonStore } from "@/lib/personStore"
import { CardSet } from "./CardSet"
import { plaxData } from "@/lib/data/plaxData"
import plax from "@/lib/data/plax.json"
import psax from "@/lib/data/psax.json"
import a4c from "@/lib/data/a4c.json"
import { CardTemplate, SectionTemplate } from "./SectionTemplate"
import { Summary } from "./Summary"
import { Button } from "./ui/button"
import { useOptionsStore } from "@/lib/optionsStore"
import { GeneralMeasureToggle } from "./GeneralMeasureToggle"

export function TabsBar () {
  const height = usePersonStore((state) => state.height);
  const weight = usePersonStore((state) => state.weight);
  const measure = useOptionsStore((state) => state.measure);

  const gender = usePersonStore((state) => state.gender);
  const bsa = usePersonStore((state) => state.bsa);
  const bmi = usePersonStore((state) => state.bmi);
  const map = usePersonStore((state) => state.map);


  return (
    <Tabs defaultValue="Patient Data" className="h-full">
      <TabsList className="grid w-full h-full grid-cols-6">
        <TabsTrigger value="Patient Data" >Patient Data</TabsTrigger >
        <TabsTrigger value="PLAX">PLAX - PSAX - A4C</TabsTrigger>
        <TabsTrigger value="A5C">A5C - A2C - A3C</TabsTrigger>
        <TabsTrigger value="SC">SC - SSN</TabsTrigger>
        <TabsTrigger value="DOPPLER">DOPPLER - VALVULAS</TabsTrigger>
        <TabsTrigger value="Summary">SUMMARY</TabsTrigger>
      </TabsList >

      <TabsContent value="Patient Data">
        <PatientData />
      </TabsContent>

      <TabsContent value="PLAX">
        <SectionTemplate>
          <CardTemplate title='PLAX'>
            <h1 className='font-bold text-amber-500'>{gender === 'man' ? <h1>Pato Juanchi ({gender})</h1> : <h1>Pato Yanchi ({gender})</h1>}</h1>
            <CardSet data={plax} typeClass="PLAX" measure={measure} />
          </CardTemplate>

          <CardTemplate title='PSAX'>
            <CardSet data={psax} typeClass="PSAX" measure={measure} />
          </CardTemplate>

          <CardTemplate title='A4C'>
            <CardSet data={a4c} typeClass="A4C" measure={measure} />
          </CardTemplate>

        </SectionTemplate>
      </TabsContent>

      <TabsContent value="Summary">
        <Summary />
      </TabsContent>

    </Tabs >
  )
}
