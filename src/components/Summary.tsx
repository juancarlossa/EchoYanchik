import { usePlaxStore } from '@/lib/dataStore';

export const Summary = () => {
  const plaxState = usePlaxStore((state) => ({
    LVIDd: state.LVIDd,
    LVIDs: state.LVIDs,
    IVSd: state.IVSd,
    PWd: state.PWd,
    RVOTplax: state.RVOTplax,
    LAAP: state.LAAP,
    AoA: state.AoA,
    AoSV: state.AoSV,
    AoPxA: state.AoPxA,
    RVOTpsax: state.RVOTpsax,
    PA: state.PA,
    LVEDV: state.LVEDV,
    LVESV: state.LVESV,
    LVEF: state.LVEF,
  }));

  return (
    <div>
      <h1>Plax State Values</h1>
      <ul>
        {Object.entries(plaxState).map(([key, value]) => (
          <li key={key} className='grid grid-cols-4 max-w-[500px]'>
            <strong>{key}:</strong>
            {Number.isNaN(value.value) || value.value == undefined ?
              <p className='text-red-600'>No data</p> :

              <p>{value.value}</p>}
            <p>{value.unit}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

