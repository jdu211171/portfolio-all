import { Select } from "antd"
import cls from "./SearchSkill.module.scss"

export default function SertificanSkill({ arr, onChange, placeholder, ...other }) {
    return (
    
          <Select
                className={cls.SearchSkill}
           
                placeholder={placeholder}
                style={{ width: "100%", }}
                onChange={onChange}
                options={arr?.map(sp => ({ value: sp, label: sp }))}
            />
   
    )
}

