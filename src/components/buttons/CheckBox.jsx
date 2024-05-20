"use client";

export default function CheckBox({checked,index}) {
    function handleChange(index){

    }
  return (
    <input
      type="checkbox"
      className="mr-4  custom-checkbox"
      checked={checked}
      onChange={() => handleChange(index)}
    />
  );
}
