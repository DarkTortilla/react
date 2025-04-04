
type PatientDetailItem = {
    label:string;
    data:string;
}

export default function PatientDetailItem({label, data}:PatientDetailItem) {
    return (
        <p className='font-bold mb-3 text-gray-700 uppercase text-start'>
            {label}: {''}
            <span className='font-normal normal-case'>{data}</span>
        </p>
    )
}
