import { useController } from "react-hook-form";

import Textarea from "./Textarea";

 const ControlledTextarea = ({ name, control, defaultValue = '', ...props }) => {

  const {
    field: { value, onChange }
  } = useController({ name, control, defaultValue });
  
  return (
    <Textarea value={value} onChange={onChange} {...props} />
  )
}

export default ControlledTextarea