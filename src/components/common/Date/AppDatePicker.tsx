'use client'
import Datepicker, {DateValueType} from "react-tailwindcss-datepicker";
import {useState} from "react";

export default function AppDatePicker() {
  const [value, setValue] = useState({
    startDate: null,
    endDate: null
  } as DateValueType);
  return (
    <Datepicker
      popupClassName={(defaultClassName) => `${defaultClassName} w-100`}
      asSingle={true}
      useRange={false}
      value={value}
      onChange={newValue => setValue(newValue)}
    />
  )
}